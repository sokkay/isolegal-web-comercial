import { queryCalendarBusyIntervals } from "@/lib/google/calendar";
import { captureServerError } from "@/lib/posthog/server";
import { getPb } from "@/lib/pocketbase";
import {
  buildRateLimitResponseInit,
  consumeScheduleMeetingRateLimit,
} from "@/lib/rateLimit";
import {
  scheduleMeetingAvailabilityRequestSchema,
  weeklyScheduleSchema,
} from "@/lib/schemas/scheduleMeeting";
import {
  buildCandidateSlots,
  getAvailableSlotsFromCandidates,
  mergeIntervals,
} from "@/utils/backend/scheduleMeetingTime";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedBody = scheduleMeetingAvailabilityRequestSchema.parse(body);
    const rateLimitResult = await consumeScheduleMeetingRateLimit({
      headers: request.headers,
      email: validatedBody.email,
    });
    if (!rateLimitResult.success) {
      return NextResponse.json(
        rateLimitResult.body,
        buildRateLimitResponseInit(rateLimitResult),
      );
    }

    const rangeStart = new Date(validatedBody.startDateTime);
    const rangeEnd = new Date(validatedBody.endDateTime);
    const pb = getPb();
    const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
    const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      await captureServerError({
        route: request.nextUrl.pathname,
        error: new Error(
          "Faltan credenciales admin de PocketBase en variables de entorno"
        ),
        properties: {
          flow: "schedule_meeting_availability",
          stage: "missing_admin_credentials",
        },
      });
      return NextResponse.json(
        {
          error:
            "Faltan credenciales admin de PocketBase en variables de entorno",
        },
        { status: 500 }
      );
    }

    await pb
      .collection("_superusers")
      .authWithPassword(adminEmail, adminPassword);

    const weeklyScheduleRaw = await pb
      .collection("agenda_semanal_de_reuniones")
      .getFullList();
    const weeklyScheduleResult = weeklyScheduleSchema.safeParse(weeklyScheduleRaw);
    if (!weeklyScheduleResult.success) {
      await captureServerError({
        route: request.nextUrl.pathname,
        error: new Error("Configuración inválida en agenda_semanal_de_reuniones"),
        properties: {
          flow: "schedule_meeting_availability",
          stage: "invalid_weekly_schedule",
        },
      });
      return NextResponse.json(
        {
          error: "Configuración inválida en agenda_semanal_de_reuniones",
          details: weeklyScheduleResult.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 500 },
      );
    }
    const weeklySchedule = weeklyScheduleResult.data;
    const defaultSlotMinutes = z.coerce
      .number()
      .int()
      .min(15)
      .max(120)
      .parse(process.env.DEFAULT_SLOT_MINUTES ?? 30);
    const busyResult = await queryCalendarBusyIntervals({
      timeMinIso: rangeStart.toISOString(),
      timeMaxIso: rangeEnd.toISOString(),
      timeZone: validatedBody.timeZone,
    });

    if (busyResult.errors.length > 0) {
      await captureServerError({
        route: request.nextUrl.pathname,
        error: new Error("No se pudo consultar el calendario de contacto@isolegal.cl"),
        properties: {
          flow: "schedule_meeting_availability",
          stage: "calendar_busy_query",
          error_count: busyResult.errors.length,
        },
      });
      return NextResponse.json(
        {
          error: "No se pudo consultar el calendario de contacto@isolegal.cl",
          details: busyResult.errors,
        },
        { status: 502 },
      );
    }
    const mergedBusyIntervals = mergeIntervals(busyResult.busyIntervals);
    const candidateSlots = buildCandidateSlots({
      rangeStart,
      rangeEnd,
      rules: weeklySchedule,
      fallbackSlotMinutes: defaultSlotMinutes,
      timeZone: validatedBody.timeZone,
    });
    const availableSlots = getAvailableSlotsFromCandidates(
      candidateSlots,
      mergedBusyIntervals
    );

    return NextResponse.json(
      {
        requestEmail: validatedBody.email,
        timeZone: validatedBody.timeZone,
        defaultSlotMinutes,
        range: {
          startDateTime: rangeStart.toISOString(),
          endDateTime: rangeEnd.toISOString(),
        },
        availableSlots,
      },
      { status: 200 }
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
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    await captureServerError({
      route: request.nextUrl.pathname,
      error,
      properties: {
        flow: "schedule_meeting_availability",
      },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
