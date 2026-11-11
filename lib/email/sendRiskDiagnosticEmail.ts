import { buildRiskCalculatorEmailParamsFromRecord } from "@/lib/email/riskCalculatorEmailData";
import { sendRiskCalculatorResultsEmail } from "@/lib/email/zeptomail";
import { captureEmailDelivery } from "@/lib/posthog/emailDelivery";
import { createRiskBookingTokenRecord } from "@/lib/riskCalculatorBookingToken";
import {
  isRiskCalculatorPendingOrigin,
  RISK_CALCULATOR_ORIGIN_SENT_BOOKING,
  RISK_CALCULATOR_ORIGIN_SENT_DELAYED,
} from "@/lib/riskCalculatorEmail";
import type PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";

export function canSendRiskDiagnosticEmail(record: RecordModel) {
  return (
    isRiskCalculatorPendingOrigin(record.origen) &&
    ["", "pending", "failed"].includes(record.email_estado ?? "")
  );
}

export async function sendRiskDiagnosticEmail(
  pb: PocketBase,
  record: RecordModel,
  variant: "form_copy" | "followup_no_booking",
  appBaseUrl?: string
) {
  if (!canSendRiskDiagnosticEmail(record)) return "skipped";

  await pb.collection("diagnosticos_riesgo").update(record.id, {
    email_estado: "sending",
    "email_intentos+": 1,
    email_ultimo_intento: new Date().toISOString(),
    email_ultimo_error: "",
  });

  const deliveryEvent = {
    collection: "diagnosticos_riesgo" as const,
    submissionId: record.id,
    emailType:
      variant === "form_copy"
        ? ("risk_form_copy" as const)
        : ("risk_followup" as const),
    attempt: Number(record.email_intentos || 0) + 1,
  };
  let deliveryStarted = false;
  try {
    const params = buildRiskCalculatorEmailParamsFromRecord(record);
    if (!params.toEmail) throw new Error("Diagnóstico sin correo corporativo");
    let agendaLink: string | undefined;
    if (variant === "followup_no_booking") {
      if (!appBaseUrl) throw new Error("Falta URL de agendamiento");
      const { rawToken } = await createRiskBookingTokenRecord({
        pb,
        submissionId: record.id,
        email: params.toEmail,
      });
      agendaLink = `${appBaseUrl}/agendar-sesion?token=${encodeURIComponent(rawToken)}`;
    }
    deliveryStarted = true;
    await sendRiskCalculatorResultsEmail({
      ...params,
      emailVariant: variant,
      agendaLink,
    });
  } catch (error) {
    // Keep uncertain deliveries out of automatic retries to avoid duplicate emails.
    const message = error instanceof Error ? error.message : "";
    const status = message.match(/\((\d{3})\)/)?.[1];
    const uncertain = deliveryStarted && !status;
    const summary = status
      ? `ZeptoMail HTTP ${status}${message.includes("Credit exhausted") ? ": créditos agotados" : ""}`
      : uncertain
        ? "Envío incierto: revisar ZeptoMail antes de reintentar"
        : "No se pudo preparar el correo del diagnóstico";
    await captureEmailDelivery({
      ...deliveryEvent,
      status: uncertain ? "uncertain" : "failed",
      providerStatus: status ? Number(status) : undefined,
      errorCode: message.includes("Credit exhausted")
        ? "credit_exhausted"
        : uncertain
          ? "delivery_uncertain"
          : status
            ? "provider_rejected"
            : "preparation_failed",
    });
    await pb.collection("diagnosticos_riesgo").update(record.id, {
      email_estado: uncertain ? "sending" : "failed",
      email_ultimo_error: summary,
    });
    throw new Error(summary);
  }

  await captureEmailDelivery({ ...deliveryEvent, status: "accepted" });

  // Persist both markers together; a failed update leaves 'sending', never retryable.
  await pb.collection("diagnosticos_riesgo").update(record.id, {
    origen:
      variant === "form_copy"
        ? RISK_CALCULATOR_ORIGIN_SENT_BOOKING
        : RISK_CALCULATOR_ORIGIN_SENT_DELAYED,
    email_estado: "sent",
    email_enviado_en: new Date().toISOString(),
    email_ultimo_error: "",
  });
  return "sent";
}
