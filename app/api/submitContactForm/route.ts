import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { sendContactNotification } from "@/lib/email/contactNotification";
import { getPb } from "@/lib/pocketbase";
import { captureServerError } from "@/lib/posthog/server";
import { contactFormSchema } from "@/lib/schemas/contactForm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);
    const pb = getPb();
    const record = await pb.collection("contactos").create({
      nombre: validatedData.firstname,
      empresa: validatedData.company,
      email: validatedData.email,
      telefono: validatedData.mobilephone,
      cargo: validatedData.cargo,
      tamano_empresa: validatedData.companySize,
      rubro: validatedData.rubro,
      mensaje: validatedData.message,
      email_estado: "pending",
    });

    try {
      await pb
        .collection("_superusers")
        .authWithPassword(
          process.env.POCKET_BASE_ADMIN_EMAIL ?? "",
          process.env.POCKET_BASE_ADMIN_PASSWORD ?? ""
        );
      await sendContactNotification(pb, record);
    } catch (notificationError) {
      console.error(
        "Error enviando notificación interna (contacto):",
        notificationError
      );
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

    console.error("Error en submitContactForm:", error);
    await captureServerError({
      route: request.nextUrl.pathname,
      error,
      properties: {
        form_name: "contact",
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
