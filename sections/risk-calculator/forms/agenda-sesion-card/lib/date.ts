import { addDays, format, parse, setHours, startOfDay } from "date-fns";
import type { Slot } from "../types";

export const WEEKDAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];
export const CALENDAR_SKELETON_CELLS = Array.from(
  { length: 42 },
  (_, index) => index
);
export const SLOT_SKELETON_ROWS = Array.from(
  { length: 6 },
  (_, index) => index
);

export function getDateKeyInTimeZone(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    return format(date, "yyyy-MM-dd");
  }

  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string) {
  return setHours(parse(dateKey, "yyyy-MM-dd", new Date()), 12);
}

export function getDayRangeFromDateKey(dateKey: string) {
  const dayStart = startOfDay(parseDateKey(dateKey));
  const nextDayStart = addDays(dayStart, 1);

  return {
    dayStart,
    nextDayStart,
  };
}

export function formatMonthLabel(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("es-CL", {
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date);
}

export function formatLongDate(dateKey: string, timeZone: string) {
  return new Intl.DateTimeFormat("es-CL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(parseDateKey(dateKey));
}

export function formatTimeRange(slot: Slot, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });

  return `${formatter.format(new Date(slot.start))} - ${formatter.format(
    new Date(slot.end)
  )}`;
}
