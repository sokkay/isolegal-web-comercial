import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { notifyTeamFormSubmission } from "@/lib/email/teamFormNotification";
import { captureServerError } from "@/lib/posthog/server";
import { getPb } from "@/lib/pocketbase";
import { opinionFormSchema } from "@/lib/schemas/opinionForm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = opinionFormSchema.parse(body);
    const pb = getPb();
    const record = await pb.collection("opiniones").create({
      calificacion: Number(validatedData.satisfaction),
      descripcion: validatedData.details,
    });

    try {
      await notifyTeamFormSubmission({
        formType: "opinion",
        source: "api/submitOpinionForm",
        fields: [
          { label: "Calificación", value: validatedData.satisfaction },
          { label: "Comentario", value: validatedData.details },
        ],
      });
    } catch (notificationError) {
      console.error("Error enviando notificación interna (opinión):", notificationError);
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

    console.error("Error en submitOpinionForm:", error);
    await captureServerError({
      route: request.nextUrl.pathname,
      error,
      properties: {
        form_name: "opinion",
      },
    });
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
