import posthog from "posthog-js";

export function captureClientEvent(
  event: string,
  properties?: Record<string, string | number | boolean | null | undefined>,
) {
  if (typeof window === "undefined") return;

  posthog.capture(event, properties);
}
