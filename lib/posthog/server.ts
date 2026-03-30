import { randomUUID } from "crypto";
import { PostHog } from "posthog-node";

import { POSTHOG_EVENTS } from "@/lib/posthog/events";

type ServerEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

function getPostHogConfig() {
  const apiKey =
    process.env.POSTHOG_PROJECT_TOKEN ??
    process.env.NEXT_PUBLIC_POSTHOG_TOKEN ??
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host =
    process.env.POSTHOG_HOST ??
    process.env.NEXT_PUBLIC_POSTHOG_HOST ??
    "https://us.i.posthog.com";

  if (!apiKey || !host) {
    return null;
  }

  return {
    apiKey,
    host: host.replace(/\/$/, ""),
  };
}

export async function captureServerEvent(params: {
  event: string;
  distinctId?: string;
  properties?: ServerEventProperties;
}) {
  const config = getPostHogConfig();
  if (!config) return;

  const distinctId = params.distinctId ?? `server:${randomUUID()}`;
  const client = new PostHog(config.apiKey, {
    host: config.host,
    flushAt: 1,
    flushInterval: 0,
  });

  try {
    client.capture({
      distinctId,
      event: params.event,
      properties: {
        ...params.properties,
        $process_person_profile: false,
      },
    });
  } catch (error) {
    console.error("Error enviando evento a PostHog:", error);
  } finally {
    await client.shutdown();
  }
}

export async function captureServerError(params: {
  route: string;
  error: unknown;
  distinctId?: string;
  properties?: ServerEventProperties;
}) {
  const errorMessage =
    params.error instanceof Error
      ? params.error.message
      : String(params.error ?? "Unknown error");
  const errorName =
    params.error instanceof Error ? params.error.name : "UnknownError";

  await captureServerEvent({
    event: POSTHOG_EVENTS.apiError,
    distinctId: params.distinctId,
    properties: {
      route: params.route,
      error_message: errorMessage,
      error_name: errorName,
      ...params.properties,
    },
  });
}
