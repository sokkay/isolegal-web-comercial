import {
  findExternalBookingTokenRecordByRawToken,
  isExternalBookingTokenExpired,
  isExternalBookingTokenUsed,
} from "@/lib/externalBookingToken";
import { getPb } from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  token: z.string().trim().min(1, "Token requerido"),
});

export async function GET(request: NextRequest) {
  try {
    const parsedQuery = querySchema.parse({
      token: request.nextUrl.searchParams.get("token"),
    });
    const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
    const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Faltan credenciales admin de PocketBase" },
        { status: 500 },
      );
    }

    const pb = getPb();
    await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

    const tokenRecord = await findExternalBookingTokenRecordByRawToken({
      pb,
      rawToken: parsedQuery.token,
    });
    if (!tokenRecord) {
      return NextResponse.json({ error: "Link inválido" }, { status: 404 });
    }
    if (isExternalBookingTokenUsed(tokenRecord.used_at)) {
      return NextResponse.json({ error: "Link ya utilizado" }, { status: 410 });
    }
    if (isExternalBookingTokenExpired(tokenRecord.expires_at)) {
      return NextResponse.json({ error: "Link expirado" }, { status: 410 });
    }

    const clientName = String(tokenRecord.name ?? "").trim();
    const clientEmail = String(tokenRecord.email ?? "").trim().toLowerCase();
    const clientCompany = String(tokenRecord.company ?? "").trim();
    if (!clientName || !clientEmail || !clientCompany) {
      return NextResponse.json({ error: "Link inválido" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        bookingContext: {
          bookingToken: parsedQuery.token,
          clientName,
          clientEmail,
          clientCompany,
          expiresAt: tokenRecord.expires_at,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
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

    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
