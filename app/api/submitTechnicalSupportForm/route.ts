import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { notifyTeamFormSubmission } from "@/lib/email/teamFormNotification";
import { getPb } from "@/lib/pocketbase";
import { technicalSupportFormSchema } from "@/lib/schemas/technicalSupportForm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = technicalSupportFormSchema.parse(body);
    const pb = getPb();
    const record = await pb.collection("soportes_tecnicos").create({
      nombre: validatedData.name,
      empresa: validatedData.company,
      telefono: validatedData.phone,
      email: validatedData.email,
      descripcion: validatedData.problem,
    });

    try {
      await notifyTeamFormSubmission({
        formType: "soporte_tecnico",
        source: "api/submitTechnicalSupportForm",
        fields: [
          { label: "Nombre", value: validatedData.name },
          { label: "Empresa", value: validatedData.company },
          { label: "Teléfono", value: validatedData.phone },
          { label: "Email", value: validatedData.email },
          { label: "Descripción", value: validatedData.problem },
          { label: "Aceptó términos", value: validatedData.terms },
        ],
      });
    } catch (notificationError) {
      console.error(
        "Error enviando notificación interna (soporte técnico):",
        notificationError,
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Formulario enviado exitosamente",
        data: record,
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

    console.error("Error en submitTechnicalSupportForm:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error interno del servidor",
      },
      { status: 500 },
    );
  }
}
