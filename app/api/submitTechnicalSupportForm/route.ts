import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { notifyTeamFormSubmission } from "@/lib/email/teamFormNotification";
import { sendTechnicalSupportCopyEmail } from "@/lib/email/zeptomail";
import { getPb } from "@/lib/pocketbase";
import { captureServerError } from "@/lib/posthog/server";
import {
  TECHNICAL_SUPPORT_TYPE_LABELS,
  technicalSupportFormSchema,
} from "@/lib/schemas/technicalSupportForm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = technicalSupportFormSchema.parse(body);
    const pb = getPb();
    const submittedAt = new Date();
    const supportTypeLabel =
      TECHNICAL_SUPPORT_TYPE_LABELS[validatedData.supportType];
    const record = await pb.collection("soportes_tecnicos").create({
      nombre: validatedData.name,
      empresa: validatedData.company,
      telefono: validatedData.phone,
      email: validatedData.email,
      tipo_soporte: validatedData.supportType,
      descripcion: validatedData.problem,
    });

    try {
      await notifyTeamFormSubmission({
        formType: "soporte_tecnico",
        submittedAt,
        source: "api/submitTechnicalSupportForm",
        fields: [
          { label: "ID seguimiento", value: record.id },
          { label: "Nombre", value: validatedData.name },
          { label: "Empresa", value: validatedData.company },
          { label: "Teléfono", value: validatedData.phone },
          { label: "Email", value: validatedData.email },
          { label: "Tipo de solicitud", value: supportTypeLabel },
          { label: "Descripción", value: validatedData.problem },
          { label: "Aceptó términos", value: validatedData.terms },
        ],
      });
    } catch (notificationError) {
      console.error(
        "Error enviando notificación interna (soporte técnico):",
        notificationError
      );
    }

    try {
      await sendTechnicalSupportCopyEmail({
        toEmail: validatedData.email,
        toName: validatedData.name,
        trackingId: record.id,
        supportTypeLabel,
        submittedAt,
        company: validatedData.company,
        phone: validatedData.phone,
        problem: validatedData.problem,
      });
    } catch (copyEmailError) {
      console.error(
        "Error enviando copia al usuario (soporte técnico):",
        copyEmailError
      );
      await captureServerError({
        route: request.nextUrl.pathname,
        error: copyEmailError,
        properties: {
          form_name: "technical_support",
          stage: "send_user_copy_email",
          record_id: record.id,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Formulario enviado exitosamente",
        data: record,
      },
      { status: 200 }
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
        { status: 400 }
      );
    }

    console.error("Error en submitTechnicalSupportForm:", error);
    await captureServerError({
      route: request.nextUrl.pathname,
      error,
      properties: {
        form_name: "technical_support",
      },
    });
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
