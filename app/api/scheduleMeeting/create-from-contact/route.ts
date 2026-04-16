import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

import { createExternalBookingTokenRecord } from "@/lib/externalBookingToken";
import { getPb } from "@/lib/pocketbase";
import { captureServerError } from "@/lib/posthog/server";

const bodySchema = z.object({
  name: z.string().trim().min(1, "Nombre requerido"),
  email: z.string().trim().toLowerCase().email("Email inválido"),
  company: z.string().trim().min(1, "Empresa requerida"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = bodySchema.parse(body);

    const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
    const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Faltan credenciales admin de PocketBase" },
        { status: 500 },
      );
    }

    const pb = getPb();
    await pb
      .collection("_superusers")
      .authWithPassword(adminEmail, adminPassword);

    const { rawToken, expiresAt } = await createExternalBookingTokenRecord({
      pb,
      name: validated.name,
      email: validated.email,
      company: validated.company,
    });

    return NextResponse.json(
      {
        success: true,
        bookingToken: rawToken,
        bookingUrl: `/agendar-sesion/externo?token=${encodeURIComponent(rawToken)}`,
        expiresAt,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    await captureServerError({
      route: request.nextUrl.pathname,
      error,
      properties: {
        flow: "schedule_meeting_create_from_contact",
      },
    });

    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
