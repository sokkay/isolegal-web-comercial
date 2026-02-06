import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { getPb } from "@/lib/pocketbase";
import { opinionFormSchema } from "@/lib/schemas/opinionForm";

const HUBSPOT_PORTAL_ID = "46469741";
const HUBSPOT_FORM_GUID = "1e505970-3b11-4b09-a6cb-a1feac866690";
const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = opinionFormSchema.parse(body);

    const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("HUBSPOT_ACCESS_TOKEN no está configurado");
      return NextResponse.json(
        { error: "Configuración del servidor incompleta" },
        { status: 500 },
      );
    }

    const hubspotPayload = {
      fields: [
        {
          objectTypeId: "0-1",
          name: "calificacion",
          value: Number(validatedData.satisfaction),
        },
        {
          objectTypeId: "0-1",
          name: "comentario",
          value: validatedData.details,
        },
      ],
    };

    const hubspotResponse = await fetch(HUBSPOT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(hubspotPayload),
    });

    if (!hubspotResponse.ok) {
      const errorData = await hubspotResponse.text();
      console.error("Error de HubSpot:", errorData);
      return NextResponse.json(
        { error: "Error al enviar el formulario a HubSpot" },
        { status: 500 },
      );
    }

    const hubspotResult = await hubspotResponse.json();

    try {
      const pb = getPb();
      await pb.collection("opiniones").create({
        calificacion: Number(validatedData.satisfaction),
        descripcion: validatedData.details,
      });
    } catch (pbError) {
      console.error("PocketBase opiniones:", pbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Formulario enviado exitosamente",
        data: hubspotResult,
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
