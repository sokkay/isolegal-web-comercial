import posthog from "posthog-js";

type ClientEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

export function captureClientEvent(
  event: string,
  properties?: ClientEventProperties,
) {
  if (typeof window === "undefined") return;

  posthog.capture(event, properties);
}

export function captureClientException(
  error: unknown,
  properties?: ClientEventProperties,
) {
  if (typeof window === "undefined") return;

  if (error instanceof Error && typeof posthog.captureException === "function") {
    posthog.captureException(error, properties);
    return;
  }

  posthog.capture("client_exception", {
    ...properties,
    error_message:
      error instanceof Error ? error.message : String(error ?? "Unknown error"),
    error_name: error instanceof Error ? error.name : "UnknownError",
  });
}
