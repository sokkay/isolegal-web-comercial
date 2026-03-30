import {
  sendMeetingConfirmationEmail,
  sendRiskCalculatorResultsEmail,
} from "@/lib/email/zeptomail";
import { buildRiskCalculatorEmailParamsFromRecord } from "@/lib/email/riskCalculatorEmailData";
import {
  consumeExternalBookingToken,
  findExternalBookingTokenRecordByRawToken,
  isExternalBookingTokenExpired,
  isExternalBookingTokenUsed,
} from "@/lib/externalBookingToken";
import {
  createMeetingEvent,
  deleteMeetingEvent,
  queryCalendarBusyIntervals,
} from "@/lib/google/calendar";
import { getPb } from "@/lib/pocketbase";
import { captureServerError } from "@/lib/posthog/server";
import {
  consumeRiskBookingToken,
  findRiskBookingTokenRecordByRawToken,
  isRiskBookingTokenExpired,
  isRiskBookingTokenUsed,
} from "@/lib/riskCalculatorBookingToken";
import {
  isRiskCalculatorPendingOrigin,
  RISK_CALCULATOR_ORIGIN_SENT_BOOKING,
} from "@/lib/riskCalculatorEmail";
import {
  buildRateLimitResponseInit,
  consumeScheduleMeetingBookRateLimit,
} from "@/lib/rateLimit";
import {
  scheduleMeetingBookRequestSchema,
  scheduleMeetingBookResponseSchema,
  weeklyScheduleSchema,
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

function escapeFilterValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

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
      await captureServerError({
        route: request.nextUrl.pathname,
        error: new Error(
          "Faltan credenciales admin de PocketBase en variables de entorno"
        ),
        properties: {
          flow: "schedule_meeting_booking",
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

    await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);

    const isExternalBooking = validatedBody.bookingSource === "external_admin";
    if (isExternalBooking && !validatedBody.bookingToken) {
      return NextResponse.json(
        { error: "El flujo externo requiere bookingToken" },
        { status: 400 },
      );
    }

    let resolvedSubmissionId = validatedBody.submissionId;
    let resolvedName = validatedBody.name;
    let resolvedEmail = validatedBody.email;
    let resolvedCompany = validatedBody.company;
    let tokenRecordIdToConsume: string | null = null;
    let tokenRecordSource: "risk" | "external" | null = null;

    if (validatedBody.bookingToken) {
      if (isExternalBooking) {
        const externalTokenRecord = await findExternalBookingTokenRecordByRawToken({
          pb,
          rawToken: validatedBody.bookingToken,
        });
        if (!externalTokenRecord) {
          return NextResponse.json({ error: "Link de agendamiento inválido" }, { status: 404 });
        }
        if (isExternalBookingTokenUsed(externalTokenRecord.used_at)) {
          return NextResponse.json(
            { error: "Link de agendamiento ya utilizado" },
            { status: 410 },
          );
        }
        if (isExternalBookingTokenExpired(externalTokenRecord.expires_at)) {
          return NextResponse.json(
            { error: "Link de agendamiento expirado" },
            { status: 410 },
          );
        }

        resolvedSubmissionId = undefined;
        resolvedName = String(externalTokenRecord.name ?? "").trim();
        resolvedEmail = String(externalTokenRecord.email ?? "")
          .trim()
          .toLowerCase();
        resolvedCompany = String(externalTokenRecord.company ?? "").trim();
        tokenRecordIdToConsume = externalTokenRecord.id;
        tokenRecordSource = "external";

        if (!resolvedName || !resolvedEmail || !resolvedCompany) {
          return NextResponse.json(
            { error: "El link no tiene datos completos para agendar" },
            { status: 409 },
          );
        }
      } else {
        const tokenRecord = await findRiskBookingTokenRecordByRawToken({
          pb,
          rawToken: validatedBody.bookingToken,
        });
        if (!tokenRecord) {
          return NextResponse.json(
            { error: "Link de agendamiento inválido" },
            { status: 404 },
          );
        }
        if (isRiskBookingTokenUsed(tokenRecord.used_at)) {
          return NextResponse.json(
            { error: "Link de agendamiento ya utilizado" },
            { status: 410 },
          );
        }
        if (isRiskBookingTokenExpired(tokenRecord.expires_at)) {
          return NextResponse.json(
            { error: "Link de agendamiento expirado" },
            { status: 410 },
          );
        }

        const submissionIdFromToken = String(tokenRecord.submission_id ?? "");
        const tokenEmail = String(tokenRecord.email ?? "")
          .trim()
          .toLowerCase();
        if (!submissionIdFromToken || !tokenEmail) {
          return NextResponse.json(
            { error: "Link de agendamiento inválido" },
            { status: 404 },
          );
        }

        const diagnosisRecord = await pb
          .collection("diagnosticos_riesgo")
          .getOne(submissionIdFromToken);
        const diagnosisData = diagnosisRecord as unknown as Record<string, unknown>;
        const diagnosisEmail = String(diagnosisData.correo_corporativo ?? "")
          .trim()
          .toLowerCase();
        if (!diagnosisEmail || diagnosisEmail !== tokenEmail) {
          return NextResponse.json(
            { error: "Link de agendamiento inválido" },
            { status: 404 },
          );
        }

        resolvedSubmissionId = submissionIdFromToken;
        resolvedName = String(diagnosisData.nombre_completo ?? "").trim();
        resolvedEmail = diagnosisEmail;
        resolvedCompany = String(diagnosisData.empresa ?? "").trim();
        tokenRecordIdToConsume = tokenRecord.id;
        tokenRecordSource = "risk";

        if (!resolvedName || !resolvedCompany) {
          return NextResponse.json(
            { error: "El diagnóstico no tiene datos completos para agendar" },
            { status: 409 },
          );
        }
      }
    }

    const rateLimitResult = await consumeScheduleMeetingBookRateLimit({
      headers: request.headers,
      email: resolvedEmail,
    });
    if (!rateLimitResult.success) {
      return NextResponse.json(
        rateLimitResult.body,
        buildRateLimitResponseInit(rateLimitResult),
      );
    }

    if (resolvedSubmissionId) {
      const existingBooking = await pb.collection("reservas_reuniones").getList(1, 1, {
        filter: `submission_id = "${escapeFilterValue(resolvedSubmissionId)}" && estado = "confirmada"`,
      });
      if (existingBooking.totalItems > 0) {
        return NextResponse.json(
          { error: "Este diagnóstico ya tiene una sesión confirmada" },
          { status: 409 },
        );
      }
    }

    const weeklyScheduleRaw = await pb
      .collection("agenda_semanal_de_reuniones")
      .getFullList();
    const weeklyScheduleResult = weeklyScheduleSchema.safeParse(weeklyScheduleRaw);
    if (!weeklyScheduleResult.success) {
      await captureServerError({
        route: request.nextUrl.pathname,
        error: new Error("Configuración inválida en agenda_semanal_de_reuniones"),
        properties: {
          flow: "schedule_meeting_booking",
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
      await captureServerError({
        route: request.nextUrl.pathname,
        error: new Error("No se pudo consultar disponibilidad del calendario"),
        properties: {
          flow: "schedule_meeting_booking",
          stage: "calendar_busy_query",
          error_count: busyResult.errors.length,
        },
      });
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
      isExternalBooking
        ? "Reserva creada desde agendamiento externo Isolegal."
        : "Reserva creada desde calculadora de riesgo Isolegal.",
      `Nombre: ${resolvedName}`,
      `Correo: ${resolvedEmail}`,
      `Empresa: ${resolvedCompany}`,
      resolvedSubmissionId
        ? `ID Diagnóstico: ${resolvedSubmissionId}`
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
        attendeeEmail: resolvedEmail,
        attendeeName: resolvedName,
        startDateTimeIso: validatedBody.startDateTime,
        endDateTimeIso: validatedBody.endDateTime,
        timeZone: validatedBody.timeZone,
        summary: "Sesión Estratégica Isolegal",
        description: eventDescription,
      });

      if (!isExternalBooking) {
        await pb.collection("reservas_reuniones").create({
          submission_id: resolvedSubmissionId ?? "",
          nombre_cliente: resolvedName,
          email_cliente: resolvedEmail,
          empresa_cliente: resolvedCompany,
          start_datetime: validatedBody.startDateTime,
          end_datetime: validatedBody.endDateTime,
          timezone: validatedBody.timeZone,
          google_event_id: createdEvent.eventId,
          google_event_link: createdEvent.eventLink ?? "",
          google_meet_link: createdEvent.meetLink ?? "",
          estado: "confirmada",
          origen: "web_risk_calculator",
        });
      }
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
          await captureServerError({
            route: request.nextUrl.pathname,
            error: rollbackError,
            properties: {
              flow: "schedule_meeting_booking",
              stage: "google_calendar_rollback",
            },
          });
        }
      }
      throw error;
    }

    if (tokenRecordIdToConsume && tokenRecordSource) {
      try {
        if (tokenRecordSource === "risk") {
          await consumeRiskBookingToken({ pb, tokenRecordId: tokenRecordIdToConsume });
        } else {
          await consumeExternalBookingToken({
            pb,
            tokenRecordId: tokenRecordIdToConsume,
          });
        }
      } catch (tokenConsumeError) {
        console.error("Error consumiendo token de agendamiento:", tokenConsumeError);
        await captureServerError({
          route: request.nextUrl.pathname,
          error: tokenConsumeError,
          properties: {
            flow: "schedule_meeting_booking",
            stage: "consume_booking_token",
          },
        });
      }
    }

    let emailSent = true;
    try {
      if (resolvedSubmissionId) {
        try {
          const diagnosisRecord = await pb
            .collection("diagnosticos_riesgo")
            .getOne(resolvedSubmissionId);
          const origin = (diagnosisRecord as Record<string, unknown>).origen;

          if (isRiskCalculatorPendingOrigin(String(origin ?? ""))) {
            const riskEmailParams = buildRiskCalculatorEmailParamsFromRecord(
              diagnosisRecord as Record<string, unknown>,
            );
            await sendRiskCalculatorResultsEmail({
              ...riskEmailParams,
              emailVariant: "form_copy",
            });

            await pb.collection("diagnosticos_riesgo").update(resolvedSubmissionId, {
              origen: RISK_CALCULATOR_ORIGIN_SENT_BOOKING,
            });
          }
        } catch (riskEmailError) {
          console.error(
            "Error enviando correo de resultados de riesgo (booking):",
            riskEmailError,
          );
          await captureServerError({
            route: request.nextUrl.pathname,
            error: riskEmailError,
            properties: {
              flow: "schedule_meeting_booking",
              stage: "send_risk_results_email",
            },
          });
        }
      }
      // TODO: Podria estar generando correos duplicados
      await sendMeetingConfirmationEmail({
        toEmail: resolvedEmail,
        toName: resolvedName,
        startDateTimeIso: validatedBody.startDateTime,
        endDateTimeIso: validatedBody.endDateTime,
        timeZone: validatedBody.timeZone,
        eventLink: createdEvent.eventLink,
        meetLink: createdEvent.meetLink,
      });
    } catch (emailError) {
      emailSent = false;
      console.error("Error enviando correo de confirmación:", emailError);
      await captureServerError({
        route: request.nextUrl.pathname,
        error: emailError,
        properties: {
          flow: "schedule_meeting_booking",
          stage: "send_booking_confirmation_email",
        },
      });
    }

    const payload = scheduleMeetingBookResponseSchema.parse({
      success: true,
      message: emailSent
        ? "Reserva confirmada y correo de confirmación enviado."
        : "Reserva confirmada, pero no pudimos enviar el correo de confirmación.",
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
    await captureServerError({
      route: request.nextUrl.pathname,
      error,
      properties: {
        flow: "schedule_meeting_booking",
      },
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
