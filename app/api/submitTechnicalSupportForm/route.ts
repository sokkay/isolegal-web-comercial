import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { getPb } from "@/lib/pocketbase";
import { technicalSupportFormSchema } from "@/lib/schemas/technicalSupportForm";

const HUBSPOT_PORTAL_ID = "46469741";
const HUBSPOT_FORM_GUID = "18af907c-575b-40f2-b97d-57b928780e53";
const HUBSPOT_SUBSCRIPTION_TYPE_ID = 366943399;
const HUBSPOT_API_URL = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = technicalSupportFormSchema.parse(body);

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
          value: validatedData.name,
        },
        {
          objectTypeId: "0-1",
          name: "email",
          value: validatedData.email,
        },
        {
          objectTypeId: "0-1",
          name: "mobilephone",
          value: validatedData.phone,
        },
        {
          objectTypeId: "0-1",
          name: "company",
          value: validatedData.company,
        },
        {
          objectTypeId: "0-1",
          name: "message",
          value: validatedData.problem,
        },
      ],
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "Acepto recibir comunicaciones de Isolegal.",
          communications: [
            {
              value: validatedData.terms,
              subscriptionTypeId: HUBSPOT_SUBSCRIPTION_TYPE_ID,
              text: "Acepto recibir comunicaciones de Isolegal.",
            },
          ],
        },
      },
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
      await pb.collection("soportes_tecnicos").create({
        nombre: validatedData.name,
        empresa: validatedData.company,
        telefono: validatedData.phone,
        email: validatedData.email,
        descripcion: validatedData.problem,
      });
    } catch (pbError) {
      console.error("PocketBase soportes_tecnicos:", pbError);
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
