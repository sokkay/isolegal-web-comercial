import type { BusyInterval } from "@/utils/backend/scheduleMeetingTime";
import { google } from "googleapis";
import { z } from "zod";

const CONTACT_EMAIL = "contacto@isolegal.cl";
const CALENDAR_READ_SCOPE = "https://www.googleapis.com/auth/calendar.readonly";
const CALENDAR_WRITE_SCOPE = "https://www.googleapis.com/auth/calendar.events";

const freeBusyResponseSchema = z.object({
  calendars: z.record(
    z.string(),
    z.object({
      busy: z
        .array(
          z.object({
            start: z.iso.datetime({ offset: true }),
            end: z.iso.datetime({ offset: true }),
          }),
        )
        .default([]),
      errors: z
        .array(
          z.object({
            domain: z.string().optional(),
            reason: z.string().optional(),
            message: z.string().optional(),
          }),
        )
        .optional(),
    }),
  ),
});

function getServiceAccountAuth(scopes: string[]) {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountPrivateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const impersonatedUserEmail = process.env.GOOGLE_IMPERSONATED_USER_EMAIL || "contacto@isolegal.cl";

  if (!serviceAccountEmail || !serviceAccountPrivateKey) {
    throw new Error("Faltan credenciales de service account en variables de entorno");
  }

  return new google.auth.JWT({
    email: serviceAccountEmail,
    key: serviceAccountPrivateKey.replace(/\\n/g, "\n"),
    scopes,
    subject: impersonatedUserEmail
  });
}

function getCalendarClient(scopes: string[]) {
  const auth = getServiceAccountAuth(scopes);
  return google.calendar({ version: "v3", auth });
}

export function getTargetCalendarId() {
  return process.env.GOOGLE_CALENDAR_ID?.trim() || CONTACT_EMAIL;
}

export async function queryCalendarBusyIntervals(params: {
  timeMinIso: string;
  timeMaxIso: string;
  timeZone: string;
  calendarId?: string;
}) {
  const calendarId = params.calendarId ?? getTargetCalendarId();
  const calendar = getCalendarClient([CALENDAR_READ_SCOPE]);
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: params.timeMinIso,
      timeMax: params.timeMaxIso,
      timeZone: params.timeZone,
      items: [{ id: calendarId }],
    },
  });

  const parsed = freeBusyResponseSchema.parse(response.data);
  const targetCalendar = parsed.calendars[calendarId];
  if (!targetCalendar) {
    throw new Error("No se pudo obtener disponibilidad del calendario objetivo");
  }

  const busyIntervals: BusyInterval[] = targetCalendar.busy
    .map((interval) => ({
      start: new Date(interval.start),
      end: new Date(interval.end),
    }))
    .filter(
      (interval) =>
        !Number.isNaN(interval.start.getTime()) &&
        !Number.isNaN(interval.end.getTime()) &&
        interval.end > interval.start,
    );

  return {
    calendarId,
    busyIntervals,
    errors: targetCalendar.errors ?? [],
  };
}

export async function createMeetingEvent(params: {
  attendeeEmail: string;
  attendeeName: string;
  startDateTimeIso: string;
  endDateTimeIso: string;
  timeZone: string;
  summary?: string;
  description?: string;
  calendarId?: string;
}) {
  const calendarId = params.calendarId ?? getTargetCalendarId();
  const calendar = getCalendarClient([CALENDAR_WRITE_SCOPE]);
  const conferenceRequestId = `isolegal-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;

  const response = await calendar.events.insert({
    calendarId,
    sendUpdates: "none",
    conferenceDataVersion: 1,
    requestBody: {
      summary: params.summary ?? "Sesion estrategica Isolegal",
      description: params.description ?? "",
      start: {
        dateTime: params.startDateTimeIso,
        timeZone: params.timeZone,
      },
      end: {
        dateTime: params.endDateTimeIso,
        timeZone: params.timeZone,
      },
      attendees: [
        {
          email: params.attendeeEmail,
          displayName: params.attendeeName,
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: conferenceRequestId,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  });

  if (!response.data.id) {
    throw new Error("No se pudo crear el evento en Google Calendar");
  }

  return {
    eventId: response.data.id,
    eventLink: response.data.htmlLink ?? undefined,
    meetLink: response.data.hangoutLink ?? undefined,
    calendarId,
  };
}

export async function deleteMeetingEvent(params: {
  eventId: string;
  calendarId?: string;
}) {
  const calendarId = params.calendarId ?? getTargetCalendarId();
  const calendar = getCalendarClient([CALENDAR_WRITE_SCOPE]);

  await calendar.events.delete({
    calendarId,
    eventId: params.eventId,
    sendUpdates: "none",
  });
}
