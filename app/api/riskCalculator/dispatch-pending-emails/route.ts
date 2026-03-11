import { buildRiskCalculatorEmailParamsFromRecord } from "@/lib/email/riskCalculatorEmailData";
import { sendRiskCalculatorResultsEmail } from "@/lib/email/zeptomail";
import { getPb } from "@/lib/pocketbase";
import { createRiskBookingTokenRecord } from "@/lib/riskCalculatorBookingToken";
import {
  RISK_CALCULATOR_ORIGIN_LEGACY,
  RISK_CALCULATOR_ORIGIN_PENDING,
  RISK_CALCULATOR_ORIGIN_SENT_DELAYED,
} from "@/lib/riskCalculatorEmail";
import { NextRequest, NextResponse } from "next/server";

function isAuthorized(request: NextRequest) {
  const dispatchToken = process.env.RISK_CALCULATOR_DISPATCH_TOKEN;
  if (!dispatchToken) return false;
  const authHeader = request.headers.get("authorization");
  const cronTokenHeader = request.headers.get("x-cron-token");
  return (
    authHeader === `Bearer ${dispatchToken}` || cronTokenHeader === dispatchToken
  );
}

function resolveAppBaseUrl(request: NextRequest) {
  const configuredUrl =
    process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;
  return configuredUrl.endsWith("/") ? configuredUrl.slice(0, -1) : configuredUrl;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RISK_CALCULATOR_DISPATCH_TOKEN) {
      return NextResponse.json(
        { error: "Falta RISK_CALCULATOR_DISPATCH_TOKEN en variables de entorno" },
        { status: 500 },
      );
    }

    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
    const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Faltan credenciales admin de PocketBase" },
        { status: 500 },
      );
    }

    const pb = getPb();
    await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);
    const appBaseUrl = resolveAppBaseUrl(request);

    const now = new Date();
    const pendingRecords = await pb.collection("diagnosticos_riesgo").getFullList({
      filter: `(origen = "${RISK_CALCULATOR_ORIGIN_PENDING}" || origen = "${RISK_CALCULATOR_ORIGIN_LEGACY}") && created <= "${now.toISOString()}"`,
    });

    let evaluated = 0;
    let sent = 0;
    let skipped = 0;
    let failed = 0;

    for (const record of pendingRecords) {
      evaluated += 1;

      const recordData = record as unknown as Record<string, unknown>;

      const bookingExists = await pb.collection("reservas_reuniones").getList(1, 1, {
        filter: `submission_id = "${record.id}" && estado = "confirmada"`,
      });
      if (bookingExists.totalItems > 0) {
        skipped += 1;
        continue;
      }

      try {
        const emailParams = buildRiskCalculatorEmailParamsFromRecord(recordData);
        if (!emailParams.toEmail) {
          throw new Error("Diagnóstico sin correo corporativo");
        }

        const { rawToken } = await createRiskBookingTokenRecord({
          pb,
          submissionId: record.id,
          email: emailParams.toEmail,
        });
        const agendaLink = `${appBaseUrl}/agendar-sesion?token=${encodeURIComponent(rawToken)}`;

        await sendRiskCalculatorResultsEmail({
          ...emailParams,
          emailVariant: "followup_no_booking",
          agendaLink,
        });
        await pb.collection("diagnosticos_riesgo").update(record.id, {
          origen: RISK_CALCULATOR_ORIGIN_SENT_DELAYED,
        });
        sent += 1;
      } catch (error) {
        failed += 1;
        console.error(
          `Error enviando correo diferido para diagnóstico ${record.id}:`,
          error,
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        stats: { evaluated, sent, skipped, failed },
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
