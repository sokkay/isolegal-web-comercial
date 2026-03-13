export type BusyInterval = { start: Date; end: Date };
export type SlotInterval = { start: Date; end: Date };

export type WeeklyScheduleRule = {
  dia: string;
  activado: boolean;
  hora_inicio: string;
  hora_fin: string;
  tiempo_bloque?: number;
};

export const dayNameToIsoWeekday: Record<string, number> = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  miércoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  sábado: 6,
  domingo: 7,
};

export function normalizeDay(day: string) {
  return day.trim().toLowerCase();
}

export function getZonedDateParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("es-CL", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    weekday: normalizeDay(get("weekday")),
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

export function zonedDateTimeToUtc(params: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  timeZone: string;
}) {
  const { year, month, day, hour, minute, timeZone } = params;
  let guess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));

  for (let i = 0; i < 2; i++) {
    const zoned = getZonedDateParts(guess, timeZone);
    const desiredTs = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
    const zonedTs = Date.UTC(
      zoned.year,
      zoned.month - 1,
      zoned.day,
      zoned.hour,
      zoned.minute,
      0,
      0,
    );
    guess = new Date(guess.getTime() + (desiredTs - zonedTs));
  }

  return guess;
}

export function getLocalDateKey(date: Date, timeZone: string) {
  const zoned = getZonedDateParts(date, timeZone);
  return `${zoned.year}-${String(zoned.month).padStart(2, "0")}-${String(zoned.day).padStart(2, "0")}`;
}

export function getLocalDayRangeUtc(params: { date: Date; timeZone: string }) {
  const { date, timeZone } = params;
  const zoned = getZonedDateParts(date, timeZone);

  const dayStart = zonedDateTimeToUtc({
    year: zoned.year,
    month: zoned.month,
    day: zoned.day,
    hour: 0,
    minute: 0,
    timeZone,
  });
  const nextDayStart = zonedDateTimeToUtc({
    year: zoned.year,
    month: zoned.month,
    day: zoned.day + 1,
    hour: 0,
    minute: 0,
    timeZone,
  });

  return {
    dayStart,
    nextDayStart,
    weekday: zoned.weekday,
    localDateKey: `${zoned.year}-${String(zoned.month).padStart(2, "0")}-${String(zoned.day).padStart(2, "0")}`,
  };
}

function parseTimeToParts(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return { hours, minutes };
}

function timeToMinutes(time: string) {
  const { hours, minutes } = parseTimeToParts(time);
  return hours * 60 + minutes;
}

export function buildCandidateSlots(params: {
  rangeStart: Date;
  rangeEnd: Date;
  rules: WeeklyScheduleRule[];
  fallbackSlotMinutes: number;
  timeZone: string;
}) {
  const { rangeStart, rangeEnd, rules, fallbackSlotMinutes, timeZone } = params;
  const activeRules = rules.filter((rule) => rule.activado);
  if (activeRules.length === 0) return [];

  const localDateKeys = new Set<string>();
  const cursor = new Date(rangeStart.getTime() - 24 * 60 * 60 * 1000);
  const maxTs = rangeEnd.getTime() + 24 * 60 * 60 * 1000;

  while (cursor.getTime() <= maxTs) {
    const zoned = getZonedDateParts(cursor, timeZone);
    localDateKeys.add(
      `${zoned.year}-${String(zoned.month).padStart(2, "0")}-${String(zoned.day).padStart(2, "0")}`,
    );
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  const slots: SlotInterval[] = [];
  const slotKeys = new Set<string>();
  const sortedLocalDateKeys = [...localDateKeys].sort();

  for (const key of sortedLocalDateKeys) {
    const [yearStr, monthStr, dayStr] = key.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);

    const dayAnchor = zonedDateTimeToUtc({
      year,
      month,
      day,
      hour: 12,
      minute: 0,
      timeZone,
    });
    const weekdayName = getZonedDateParts(dayAnchor, timeZone).weekday;
    const weekday = dayNameToIsoWeekday[weekdayName];
    if (!weekday) continue;

    const dayRules = activeRules.filter(
      (rule) => dayNameToIsoWeekday[normalizeDay(rule.dia)] === weekday,
    );
    if (dayRules.length === 0) continue;

    const sortedDayRules = [...dayRules].sort((a, b) => {
      const startDiff = timeToMinutes(a.hora_inicio) - timeToMinutes(b.hora_inicio);
      if (startDiff !== 0) return startDiff;
      const endDiff = timeToMinutes(a.hora_fin) - timeToMinutes(b.hora_fin);
      if (endDiff !== 0) return endDiff;
      return (a.tiempo_bloque ?? fallbackSlotMinutes) - (b.tiempo_bloque ?? fallbackSlotMinutes);
    });

    for (const rule of sortedDayRules) {
      const startParts = parseTimeToParts(rule.hora_inicio);
      const endParts = parseTimeToParts(rule.hora_fin);
      const slotMinutes = rule.tiempo_bloque ?? fallbackSlotMinutes;
      const slotMs = slotMinutes * 60 * 1000;

      const windowStart = zonedDateTimeToUtc({
        year,
        month,
        day,
        hour: startParts.hours,
        minute: startParts.minutes,
        timeZone,
      });
      const windowEnd = zonedDateTimeToUtc({
        year,
        month,
        day,
        hour: endParts.hours,
        minute: endParts.minutes,
        timeZone,
      });

      let currentStartMs = windowStart.getTime();
      while (currentStartMs + slotMs <= windowEnd.getTime()) {
        const slotStart = new Date(currentStartMs);
        const slotEnd = new Date(currentStartMs + slotMs);

        if (slotEnd > rangeStart && slotStart < rangeEnd) {
          const boundedStart = slotStart < rangeStart ? rangeStart : slotStart;
          const boundedEnd = slotEnd > rangeEnd ? rangeEnd : slotEnd;
          if (boundedEnd > boundedStart) {
            const key = `${boundedStart.getTime()}-${boundedEnd.getTime()}`;
            if (!slotKeys.has(key)) {
              slotKeys.add(key);
              slots.push({ start: boundedStart, end: boundedEnd });
            }
          }
        }

        currentStartMs += slotMs;
      }
    }
  }

  return slots.sort((a, b) => {
    const startDiff = a.start.getTime() - b.start.getTime();
    if (startDiff !== 0) return startDiff;
    return a.end.getTime() - b.end.getTime();
  });
}

export function mergeIntervals(intervals: BusyInterval[]): BusyInterval[] {
  if (intervals.length === 0) return [];

  const sortedIntervals = [...intervals].sort(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );

  const merged: BusyInterval[] = [sortedIntervals[0]];

  for (const current of sortedIntervals.slice(1)) {
    const last = merged[merged.length - 1];
    if (current.start <= last.end) {
      last.end =
        current.end.getTime() > last.end.getTime() ? current.end : last.end;
      continue;
    }

    merged.push({ ...current });
  }

  return merged;
}

function slotOverlapsBusy(slot: SlotInterval, busy: BusyInterval) {
  return slot.start < busy.end && slot.end > busy.start;
}

export function getAvailableSlotsFromCandidates(
  candidateSlots: SlotInterval[],
  mergedBusyIntervals: BusyInterval[],
) {
  return candidateSlots
    .filter(
      (slot) =>
        !mergedBusyIntervals.some((busy) => slotOverlapsBusy(slot, busy)),
    )
    .map((slot) => ({
      start: slot.start.toISOString(),
      end: slot.end.toISOString(),
    }));
}
