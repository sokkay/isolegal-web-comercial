import { getPb } from "@/lib/pocketbase";
import { captureServerError } from "@/lib/posthog/server";
import {
  scheduleMeetingActiveDaysResponseSchema,
  weeklyScheduleSchema,
} from "@/lib/schemas/scheduleMeeting";
import {
  dayNameToIsoWeekday,
  getLocalDateKey,
  getZonedDateParts,
  normalizeDay,
} from "@/utils/backend/scheduleMeetingTime";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

const activeDaysQuerySchema = z.object({
  timeZone: z.string().trim().min(1).default("America/Santiago"),
});

export async function GET(request: NextRequest) {
  try {
    const queryResult = activeDaysQuerySchema.parse({
      timeZone: request.nextUrl.searchParams.get("timeZone") ?? undefined,
    });
    const { timeZone } = queryResult;
    const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
    const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      await captureServerError({
        route: request.nextUrl.pathname,
        error: new Error(
          "Faltan credenciales admin de PocketBase en variables de entorno"
        ),
        properties: {
          flow: "schedule_meeting_active_days",
          stage: "missing_admin_credentials",
        },
      });
      return NextResponse.json(
        {
          error:
            "Faltan credenciales admin de PocketBase en variables de entorno",
        },
        { status: 500 },
      );
    }

    const pb = getPb();
    await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

    const weeklyScheduleRaw = await pb
      .collection("agenda_semanal_de_reuniones")
      .getFullList();
    const weeklyScheduleResult = weeklyScheduleSchema.safeParse(weeklyScheduleRaw);
    if (!weeklyScheduleResult.success) {
      await captureServerError({
        route: request.nextUrl.pathname,
        error: new Error("Configuración inválida en agenda_semanal_de_reuniones"),
        properties: {
          flow: "schedule_meeting_active_days",
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
    const activeWeekdays = new Set(
      weeklySchedule
        .filter((rule) => rule.activado)
        .map((rule) => dayNameToIsoWeekday[normalizeDay(rule.dia)])
        .filter((weekday): weekday is number => Number.isInteger(weekday)),
    );
    const todayInZone = getZonedDateParts(new Date(), timeZone);

    const days = Array.from({ length: 14 }, (_, offset) => {
      const dayAnchor = new Date(
        Date.UTC(
          todayInZone.year,
          todayInZone.month - 1,
          todayInZone.day + offset,
          12,
          0,
          0,
        ),
      );
      const weekday = dayNameToIsoWeekday[
        normalizeDay(getZonedDateParts(dayAnchor, timeZone).weekday)
      ];

      return {
        date: getLocalDateKey(dayAnchor, timeZone),
        enabled: Boolean(weekday && activeWeekdays.has(weekday)),
      };
    });

    const payload = scheduleMeetingActiveDaysResponseSchema.parse({
      timeZone,
      range: {
        startDate: days[0]?.date,
        endDate: days[days.length - 1]?.date,
      },
      days,
    });

    return NextResponse.json(payload, { status: 200 });
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

    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    await captureServerError({
      route: request.nextUrl.pathname,
      error,
      properties: {
        flow: "schedule_meeting_active_days",
      },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
