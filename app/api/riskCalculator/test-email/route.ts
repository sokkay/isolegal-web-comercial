import { buildRiskCalculatorEmailParamsFromRecord } from "@/lib/email/riskCalculatorEmailData";
import { sendRiskCalculatorResultsEmail } from "@/lib/email/zeptomail";
import { getPb } from "@/lib/pocketbase";
import { riskCalculatorTestEmailSchema } from "@/lib/schemas/riskCalculatorTestEmail";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

function getSubjectByVariant(variant: "form_copy" | "followup_no_booking") {
  return variant === "followup_no_booking"
    ? "Ya tienes el diagnóstico. ¿Qué vas a hacer con eso? | Isolegal 🌱"
    : "Copia de tu formulario completado | Isolegal 🌱";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = riskCalculatorTestEmailSchema.parse(body);
    const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
    const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Faltan credenciales admin de PocketBase en variables de entorno" },
        { status: 500 },
      );
    }

    const pb = getPb();
    await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

    const diagnosisRecord = await pb
      .collection("diagnosticos_riesgo")
      .getOne(validatedData.formId);

    const emailParams = buildRiskCalculatorEmailParamsFromRecord(
      diagnosisRecord as unknown as Record<string, unknown>,
    );
    await sendRiskCalculatorResultsEmail({
      ...emailParams,
      toEmail: validatedData.toEmail,
      emailVariant: validatedData.emailVariant,
    });
    const sourceFormEmail = emailParams.toEmail;

    return NextResponse.json(
      {
        success: true,
        message: `Correo de prueba enviado exitosamente a ${validatedData.toEmail}`,
        data: {
          formId: validatedData.formId,
          sentToEmail: validatedData.toEmail,
          sourceFormEmail,
          emailVariant: validatedData.emailVariant,
          subject: getSubjectByVariant(validatedData.emailVariant),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      },
      { status: 500 },
    );
  }
}
