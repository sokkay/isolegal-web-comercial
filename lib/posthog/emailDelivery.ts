import { POSTHOG_EVENTS } from "@/lib/posthog/events";
import { captureServerEvent } from "@/lib/posthog/server";

export async function captureEmailDelivery(params: {
  collection: "contactos" | "diagnosticos_riesgo";
  submissionId: string;
  emailType: "contact_notification" | "risk_form_copy" | "risk_followup";
  status: "accepted" | "failed" | "uncertain";
  attempt: number;
  providerStatus?: number;
  errorCode?: string;
}) {
  try {
    await captureServerEvent({
      event: POSTHOG_EVENTS.emailSendResult,
      distinctId: `submission:${params.collection}:${params.submissionId}`,
      properties: {
        submission_id: params.submissionId,
        collection: params.collection,
        form_name:
          params.collection === "contactos" ? "contact" : "risk_calculator",
        email_type: params.emailType,
        email_status: params.status,
        email_attempt: params.attempt,
        email_provider: "zeptomail",
        provider_status: params.providerStatus,
        error_code: params.errorCode,
      },
    });
  } catch {
    // Analytics must never change delivery state or trigger an email retry.
    console.error("No se pudo registrar email_send_result en PostHog");
  }
}
