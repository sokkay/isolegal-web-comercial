import { dispatchPendingRiskEmails } from "@/lib/email/dispatchPendingRiskEmails";
import { getPb } from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";

function isAuthorized(request: NextRequest) {
  const dispatchToken = process.env.RISK_CALCULATOR_DISPATCH_TOKEN;
  if (!dispatchToken) return false;
  const authHeader = request.headers.get("authorization");
  const cronTokenHeader = request.headers.get("x-cron-token");
  return (
    authHeader === `Bearer ${dispatchToken}` ||
    cronTokenHeader === dispatchToken
  );
}

function resolveAppBaseUrl(request: NextRequest) {
  const configuredUrl =
    process.env.APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    request.nextUrl.origin;
  return configuredUrl.endsWith("/")
    ? configuredUrl.slice(0, -1)
    : configuredUrl;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RISK_CALCULATOR_DISPATCH_TOKEN) {
      return NextResponse.json(
        {
          error: "Falta RISK_CALCULATOR_DISPATCH_TOKEN en variables de entorno",
        },
        { status: 500 }
      );
    }

    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
    const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Faltan credenciales admin de PocketBase" },
        { status: 500 }
      );
    }

    const pb = getPb();
    await pb
      .collection("_superusers")
      .authWithPassword(adminEmail, adminPassword);
    const appBaseUrl = resolveAppBaseUrl(request);

    const stats = await dispatchPendingRiskEmails(pb, appBaseUrl);

    return NextResponse.json(
      {
        success: true,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
