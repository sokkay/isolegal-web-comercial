import {
  canSendRiskDiagnosticEmail,
  sendRiskDiagnosticEmail,
} from "@/lib/email/sendRiskDiagnosticEmail";
import {
  RISK_CALCULATOR_ORIGIN_LEGACY,
  RISK_CALCULATOR_ORIGIN_PENDING,
} from "@/lib/riskCalculatorEmail";
import type PocketBase from "pocketbase";

export async function dispatchPendingRiskEmails(
  pb: PocketBase,
  appBaseUrl: string
) {
  const now = new Date();
  const pendingRecords = await pb
    .collection("diagnosticos_riesgo")
    .getFullList({
      filter: `(origen = "${RISK_CALCULATOR_ORIGIN_PENDING}" || origen = "${RISK_CALCULATOR_ORIGIN_LEGACY}") && created <= "${now.toISOString()}"`,
    });

  let evaluated = 0;
  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const record of pendingRecords) {
    evaluated += 1;

    if (!canSendRiskDiagnosticEmail(record)) {
      skipped += 1;
      continue;
    }

    const bookingExists = await pb
      .collection("reservas_reuniones")
      .getList(1, 1, {
        filter: `submission_id = "${record.id}" && estado = "confirmada"`,
      });
    if (bookingExists.totalItems > 0 && record.email_estado !== "failed") {
      skipped += 1;
      continue;
    }

    try {
      await sendRiskDiagnosticEmail(
        pb,
        record,
        bookingExists.totalItems > 0 ? "form_copy" : "followup_no_booking",
        appBaseUrl
      );
      sent += 1;
    } catch (error) {
      failed += 1;
      console.error(
        `Error enviando correo diferido para diagnóstico ${record.id}:`,
        error
      );
    }
  }

  return { evaluated, sent, skipped, failed };
}
