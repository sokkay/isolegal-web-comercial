import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { getPb } from "@/lib/pocketbase";
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
      mensaje: validatedData.message,
    });

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

    console.error("Error en submitContactForm:", error);
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
