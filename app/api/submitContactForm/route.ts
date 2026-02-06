import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { getPb } from "@/lib/pocketbase";
import { contactFormSchema } from "@/lib/schemas/contactForm";

const HUBSPOT_PORTAL_ID = "46469741";
const HUBSPOT_FORM_GUID = "d7664761-3577-4d01-a968-394f96546bab";
const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

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
          name: "firstname",
          value: validatedData.firstname,
        },
        {
          objectTypeId: "0-1",
          name: "email",
          value: validatedData.email,
        },
        {
          objectTypeId: "0-1",
          name: "mobilephone",
          value: validatedData.mobilephone,
        },
        {
          objectTypeId: "0-1",
          name: "company",
          value: validatedData.company,
        },
        {
          objectTypeId: "0-1",
          name: "message",
          value: validatedData.message,
        },
      ],
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "Acepto recibir comunicaciones de Isolegal.",
          communications: [
            {
              value: validatedData.consent,
              subscriptionTypeId: 366943399,
              text: "Acepto recibir comunicaciones de Isolegal.",
            },
          ],
        },
      },
    };

    // Enviar a HubSpot
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
      await pb.collection("contactos").create({
        nombre: validatedData.firstname,
        empresa: validatedData.company,
        email: validatedData.email,
        telefono: validatedData.mobilephone,
        mensaje: validatedData.message,
      });
    } catch (pbError) {
      console.error("PocketBase contactos:", pbError);
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
