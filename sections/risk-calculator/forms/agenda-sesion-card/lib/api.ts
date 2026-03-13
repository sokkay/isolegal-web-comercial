import { getDateKeyInTimeZone, getDayRangeFromDateKey } from "./date";
import type {
  ActiveDay,
  BookingSource,
  BookingSuccess,
  Slot,
} from "../types";

export async function fetchActiveDays(timeZone: string) {
  const response = await fetch(
    `/api/scheduleMeeting/active-days?timeZone=${encodeURIComponent(timeZone)}`
  );
  const payload = (await response.json()) as
    | {
        error?: string;
        days?: ActiveDay[];
      }
    | undefined;

  if (!response.ok || !payload?.days) {
    throw new Error(
      payload?.error || "No se pudieron obtener días disponibles"
    );
  }

  return payload.days;
}

export async function fetchSlotsByDay(params: {
  dateKey: string;
  clientEmail: string;
  timeZone: string;
}) {
  const { dateKey, clientEmail, timeZone } = params;
  const { dayStart, nextDayStart } = getDayRangeFromDateKey(dateKey);
  const now = new Date();
  const todayDateKey = getDateKeyInTimeZone(now, timeZone);
  const nowPlusOneHour = new Date(now.getTime() + 60 * 60 * 1000);
  const queryStart =
    dateKey === todayDateKey && nowPlusOneHour > dayStart
      ? nowPlusOneHour
      : dayStart;

  if (queryStart >= nextDayStart) {
    return [];
  }

  const response = await fetch("/api/scheduleMeeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: clientEmail,
      startDateTime: queryStart.toISOString(),
      endDateTime: nextDayStart.toISOString(),
      timeZone,
    }),
  });
  const payload = (await response.json()) as
    | {
        error?: string;
        availableSlots?: Slot[];
      }
    | undefined;

  if (!response.ok || !payload?.availableSlots) {
    throw new Error(payload?.error || "No se pudieron obtener horarios");
  }

  return payload.availableSlots;
}

export async function bookMeeting(params: {
  bookingSource?: BookingSource;
  bookingToken?: string;
  submissionId?: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  selectedSlot: Slot;
  timeZone: string;
}) {
  const response = await fetch("/api/scheduleMeeting/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookingSource: params.bookingSource,
      bookingToken: params.bookingToken,
      submissionId: params.submissionId,
      name: params.clientName,
      email: params.clientEmail,
      company: params.clientCompany,
      timeZone: params.timeZone,
      startDateTime: params.selectedSlot.start,
      endDateTime: params.selectedSlot.end,
    }),
  });
  const payload = (await response.json()) as
    | {
        error?: string;
        message?: string;
        emailSent?: boolean;
        booking?: BookingSuccess["booking"];
      }
    | undefined;

  if (!response.ok || !payload?.booking || !payload.message) {
    throw new Error(payload?.error || "No se pudo agendar la reunión");
  }

  return {
    message: payload.message,
    emailSent: Boolean(payload.emailSent),
    booking: payload.booking,
  };
}
