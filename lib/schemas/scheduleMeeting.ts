import { z } from "zod";

export const scheduleMeetingTimeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const defaultTimeZone = "America/Santiago";

function validateDateRange(
  startDateTime: string,
  endDateTime: string,
  ctx: z.RefinementCtx,
) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    ctx.addIssue({
      code: "custom",
      message: "Rango de fechas inválido",
      path: ["startDateTime"],
    });
    return;
  }

  if (end <= start) {
    ctx.addIssue({
      code: "custom",
      message: "endDateTime debe ser mayor que startDateTime",
      path: ["endDateTime"],
    });
  }
}

export const scheduleMeetingAvailabilityRequestSchema = z
  .object({
    email: z.email(),
    startDateTime: z.iso.datetime({ offset: true }),
    endDateTime: z.iso.datetime({ offset: true }),
    timeZone: z.string().trim().min(1).default(defaultTimeZone),
  })
  .superRefine((value, ctx) =>
    validateDateRange(value.startDateTime, value.endDateTime, ctx),
  );

export const weeklyScheduleRecordSchema = z
  .object({
    dia: z.string().trim().min(1),
    activado: z.boolean(),
    hora_inicio: z
      .string()
      .regex(scheduleMeetingTimeRegex, "hora_inicio inválida"),
    hora_fin: z.string().regex(scheduleMeetingTimeRegex, "hora_fin inválida"),
    tiempo_bloque: z.coerce.number().int().min(15).max(120).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.hora_fin <= value.hora_inicio) {
      ctx.addIssue({
        code: "custom",
        message: "hora_fin debe ser mayor a hora_inicio",
        path: ["hora_fin"],
      });
    }
  });

export const scheduleMeetingAvailabilitySlotSchema = z.object({
  start: z.iso.datetime({ offset: true }),
  end: z.iso.datetime({ offset: true }),
});

export const scheduleMeetingAvailabilityResponseSchema = z.object({
  requestEmail: z.email(),
  timeZone: z.string().trim().min(1),
  defaultSlotMinutes: z.number().int().min(15).max(120),
  range: z.object({
    startDateTime: z.iso.datetime({ offset: true }),
    endDateTime: z.iso.datetime({ offset: true }),
  }),
  availableSlots: scheduleMeetingAvailabilitySlotSchema.array(),
});

export const scheduleMeetingActiveDaySchema = z.object({
  date: z.iso.date(),
  enabled: z.boolean(),
});

export const scheduleMeetingActiveDaysResponseSchema = z.object({
  timeZone: z.string().trim().min(1),
  range: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }),
  days: scheduleMeetingActiveDaySchema.array(),
});

export const scheduleMeetingBookRequestSchema = z
  .object({
    submissionId: z.string().trim().min(1).optional(),
    name: z.string().trim().min(1, "Nombre requerido"),
    email: z.email(),
    role: z.string().trim().min(1, "Cargo requerido"),
    timeZone: z.string().trim().min(1).default(defaultTimeZone),
    startDateTime: z.iso.datetime({ offset: true }),
    endDateTime: z.iso.datetime({ offset: true }),
  })
  .superRefine((value, ctx) => {
    validateDateRange(value.startDateTime, value.endDateTime, ctx);

    const start = new Date(value.startDateTime);
    const end = new Date(value.endDateTime);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return;

    const durationMs = end.getTime() - start.getTime();
    if (durationMs > 3 * 60 * 60 * 1000) {
      ctx.addIssue({
        code: "custom",
        message: "La reunión no puede superar 3 horas",
        path: ["endDateTime"],
      });
    }
  });

export const scheduleMeetingBookResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  emailSent: z.boolean(),
  booking: z.object({
    eventId: z.string(),
    eventLink: z.string().url().optional(),
    meetLink: z.string().url().optional(),
    startDateTime: z.iso.datetime({ offset: true }),
    endDateTime: z.iso.datetime({ offset: true }),
    timeZone: z.string().trim().min(1),
  }),
});

export type WeeklyScheduleRecord = z.infer<typeof weeklyScheduleRecordSchema>;
export type ScheduleMeetingAvailabilityRequest = z.infer<
  typeof scheduleMeetingAvailabilityRequestSchema
>;
export type ScheduleMeetingBookRequest = z.infer<
  typeof scheduleMeetingBookRequestSchema
>;
