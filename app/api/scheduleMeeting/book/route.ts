import { sendMeetingConfirmationEmail } from "@/lib/email/zeptomail";
import {
  createMeetingEvent,
  deleteMeetingEvent,
  queryCalendarBusyIntervals,
} from "@/lib/google/calendar";
import { getPb } from "@/lib/pocketbase";
import {
  buildRateLimitResponseInit,
  consumeScheduleMeetingBookRateLimit,
} from "@/lib/rateLimit";
import {
  scheduleMeetingBookRequestSchema,
  scheduleMeetingBookResponseSchema,
  weeklyScheduleRecordSchema,
} from "@/lib/schemas/scheduleMeeting";
import {
  buildCandidateSlots,
  getLocalDayRangeUtc,
  getZonedDateParts,
  mergeIntervals,
  normalizeDay,
  zonedDateTimeToUtc,
} from "@/utils/backend/scheduleMeetingTime";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

const MAX_BOOKING_WINDOW_DAYS = 14;

function slotOverlapsBusy(
  slot: { start: Date; end: Date },
  busy: { start: Date; end: Date },
) {
  return slot.start < busy.end && slot.end > busy.start;
}

function isWithinBookingWindow(params: { startDate: Date; timeZone: string }) {
  const { startDate, timeZone } = params;
  const zonedNow = getZonedDateParts(new Date(), timeZone);
  const windowStart = zonedDateTimeToUtc({
    year: zonedNow.year,
    month: zonedNow.month,
    day: zonedNow.day,
    hour: 0,
    minute: 0,
    timeZone,
  });
  const windowEnd = zonedDateTimeToUtc({
    year: zonedNow.year,
    month: zonedNow.month,
    day: zonedNow.day + MAX_BOOKING_WINDOW_DAYS,
    hour: 0,
    minute: 0,
    timeZone,
  });

  return startDate >= windowStart && startDate < windowEnd;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedBody = scheduleMeetingBookRequestSchema.parse(body);
    const rateLimitResult = await consumeScheduleMeetingBookRateLimit({
      headers: request.headers,
      email: validatedBody.email,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        rateLimitResult.body,
        buildRateLimitResponseInit(rateLimitResult),
      );
    }

    const startDate = new Date(validatedBody.startDateTime);
    const endDate = new Date(validatedBody.endDateTime);
    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime()) ||
      endDate <= startDate
    ) {
      return NextResponse.json(
        { error: "Rango de fechas inválido para reserva" },
        { status: 400 },
      );
    }

    if (
      !isWithinBookingWindow({
        startDate,
        timeZone: validatedBody.timeZone,
      })
    ) {
      return NextResponse.json(
        {
          error:
            "La reserva debe estar dentro de los próximos 14 días desde hoy",
        },
        { status: 400 },
      );
    }

    const pb = getPb();
    const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
    const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        {
          error:
            "Faltan credenciales admin de PocketBase en variables de entorno",
        },
        { status: 500 },
      );
    }

    await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

    const weeklyScheduleRaw = await pb
      .collection("agenda_semanal_de_reuniones")
      .getFullList();
    const weeklySchedule = weeklyScheduleRecordSchema
      .array()
      .parse(weeklyScheduleRaw);
    const dayRange = getLocalDayRangeUtc({
      date: startDate,
      timeZone: validatedBody.timeZone,
    });
    const activeRules = weeklySchedule.filter((rule) => rule.activado);
    const selectedWeekday = normalizeDay(dayRange.weekday);
    const hasActiveDay = activeRules.some(
      (rule) => normalizeDay(rule.dia) === selectedWeekday,
    );

    if (!hasActiveDay) {
      return NextResponse.json(
        { error: "El día seleccionado no está habilitado para reuniones" },
        { status: 409 },
      );
    }

    const defaultSlotMinutes = z.coerce
      .number()
      .int()
      .min(15)
      .max(120)
      .parse(process.env.DEFAULT_SLOT_MINUTES ?? 30);
    const candidateSlots = buildCandidateSlots({
      rangeStart: dayRange.dayStart,
      rangeEnd: dayRange.nextDayStart,
      rules: weeklySchedule,
      fallbackSlotMinutes: defaultSlotMinutes,
      timeZone: validatedBody.timeZone,
    });
    const hasMatchingSlot = candidateSlots.some(
      (slot) =>
        slot.start.getTime() === startDate.getTime() &&
        slot.end.getTime() === endDate.getTime(),
    );

    if (!hasMatchingSlot) {
      return NextResponse.json(
        {
          error:
            "La hora seleccionada no pertenece a un bloque válido de la agenda",
        },
        { status: 409 },
      );
    }

    const busyResult = await queryCalendarBusyIntervals({
      timeMinIso: dayRange.dayStart.toISOString(),
      timeMaxIso: dayRange.nextDayStart.toISOString(),
      timeZone: validatedBody.timeZone,
    });
    if (busyResult.errors.length > 0) {
      return NextResponse.json(
        {
          error: "No se pudo consultar disponibilidad del calendario",
          details: busyResult.errors,
        },
        { status: 502 },
      );
    }

    const mergedBusyIntervals = mergeIntervals(busyResult.busyIntervals);
    const slotIsBusy = mergedBusyIntervals.some((busy) =>
      slotOverlapsBusy({ start: startDate, end: endDate }, busy),
    );

    if (slotIsBusy) {
      return NextResponse.json(
        {
          error:
            "La hora seleccionada ya no está disponible. Actualiza los horarios.",
        },
        { status: 409 },
      );
    }

    const eventDescription = [
      "Reserva creada desde calculadora de riesgo ISO Legal.",
      `Nombre: ${validatedBody.name}`,
      `Correo: ${validatedBody.email}`,
      `Empresa: ${validatedBody.company}`,
      validatedBody.submissionId
        ? `ID Diagnóstico: ${validatedBody.submissionId}`
        : undefined,
    ]
      .filter(Boolean)
      .join("\n");

    let createdEvent:
      | {
          eventId: string;
          eventLink?: string;
          meetLink?: string;
          calendarId: string;
        }
      | null = null;

    try {
      createdEvent = await createMeetingEvent({
        attendeeEmail: validatedBody.email,
        attendeeName: validatedBody.name,
        startDateTimeIso: validatedBody.startDateTime,
        endDateTimeIso: validatedBody.endDateTime,
        timeZone: validatedBody.timeZone,
        summary: "Sesión Estratégica ISO Legal",
        description: eventDescription,
      });

      await pb.collection("reservas_reuniones").create({
        submission_id: validatedBody.submissionId ?? "",
        nombre_cliente: validatedBody.name,
        email_cliente: validatedBody.email,
        empresa_cliente: validatedBody.company,
        start_datetime: validatedBody.startDateTime,
        end_datetime: validatedBody.endDateTime,
        timezone: validatedBody.timeZone,
        google_event_id: createdEvent.eventId,
        google_event_link: createdEvent.eventLink ?? "",
        google_meet_link: createdEvent.meetLink ?? "",
        estado: "confirmada",
        origen: "web_risk_calculator",
      });
    } catch (error) {
      if (createdEvent) {
        try {
          await deleteMeetingEvent({
            eventId: createdEvent.eventId,
            calendarId: createdEvent.calendarId,
          });
        } catch (rollbackError) {
          console.error(
            "Error al hacer rollback del evento en Google Calendar:",
            rollbackError,
          );
        }
      }
      throw error;
    }

    let emailSent = true;
    try {
      await sendMeetingConfirmationEmail({
        toEmail: validatedBody.email,
        toName: validatedBody.name,
        startDateTimeIso: validatedBody.startDateTime,
        endDateTimeIso: validatedBody.endDateTime,
        timeZone: validatedBody.timeZone,
        eventLink: createdEvent.eventLink,
        meetLink: createdEvent.meetLink,
      });
    } catch (emailError) {
      emailSent = false;
      console.error("Error enviando correo de confirmación:", emailError);
    }

    const payload = scheduleMeetingBookResponseSchema.parse({
      success: true,
      message: emailSent
        ? "Reserva confirmada y correo enviado"
        : "Reserva confirmada, pero no se pudo enviar el correo de confirmación",
      emailSent,
      booking: {
        eventId: createdEvent.eventId,
        eventLink: createdEvent.eventLink,
        meetLink: createdEvent.meetLink,
        startDateTime: validatedBody.startDateTime,
        endDateTime: validatedBody.endDateTime,
        timeZone: validatedBody.timeZone,
      },
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
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
