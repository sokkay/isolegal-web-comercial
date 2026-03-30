const ORGANIZER_EMAIL = "contacto@isolegal.cl";
const ORGANIZER_NAME = "Isolegal";
const MEETING_SUMMARY = "Sesion Estrategica Isolegal";
const ICS_FILENAME = "confirmacion-reunion-isolegal.ics";
const ICS_MIME_TYPE = "text/calendar; charset=UTF-8; method=REQUEST";

function padDatePart(value: number) {
  return String(value).padStart(2, "0");
}

function formatUtcDateTime(valueIso: string) {
  const date = new Date(valueIso);
  if (Number.isNaN(date.getTime())) {
    throw new Error("No se pudo generar el archivo ICS por una fecha invalida");
  }

  return [
    date.getUTCFullYear(),
    padDatePart(date.getUTCMonth() + 1),
    padDatePart(date.getUTCDate()),
    "T",
    padDatePart(date.getUTCHours()),
    padDatePart(date.getUTCMinutes()),
    padDatePart(date.getUTCSeconds()),
    "Z",
  ].join("");
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldIcsLine(line: string) {
  const maxLength = 73;
  if (line.length <= maxLength) {
    return line;
  }

  const chunks: string[] = [];
  for (let index = 0; index < line.length; index += maxLength) {
    const chunk = line.slice(index, index + maxLength);
    chunks.push(index === 0 ? chunk : ` ${chunk}`);
  }

  return chunks.join("\r\n");
}

function buildEventDescription(params: {
  attendeeName: string;
  meetLink?: string;
  eventLink?: string;
}) {
  return [
    "Confirmacion de reunion con Isolegal.",
    `Invitado: ${params.attendeeName}`,
    params.meetLink ? `Google Meet: ${params.meetLink}` : undefined,
    params.eventLink ? `Detalle del evento: ${params.eventLink}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildEventUid(params: { attendeeEmail: string; startDateTimeIso: string }) {
  const sanitizedEmail = params.attendeeEmail
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const startDate = new Date(params.startDateTimeIso);

  return `meeting-${startDate.getTime()}-${sanitizedEmail}@isolegal.cl`;
}

export type ZeptoMailAttachment = {
  name: string;
  mimeType: string;
  content: string;
};

export function buildMeetingInvitationIcsAttachment(params: {
  attendeeEmail: string;
  attendeeName: string;
  startDateTimeIso: string;
  endDateTimeIso: string;
  eventLink?: string;
  meetLink?: string;
}): ZeptoMailAttachment {
  const createdAtIso = new Date().toISOString();
  const description = buildEventDescription(params);
  const lines = [
    "BEGIN:VCALENDAR",
    "PRODID:-//Isolegal//Meeting Scheduler//ES",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${buildEventUid(params)}`,
    `DTSTAMP:${formatUtcDateTime(createdAtIso)}`,
    `DTSTART:${formatUtcDateTime(params.startDateTimeIso)}`,
    `DTEND:${formatUtcDateTime(params.endDateTimeIso)}`,
    `SUMMARY:${escapeIcsText(MEETING_SUMMARY)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    params.meetLink ? `LOCATION:${escapeIcsText(params.meetLink)}` : undefined,
    params.eventLink ? `URL:${escapeIcsText(params.eventLink)}` : undefined,
    "STATUS:CONFIRMED",
    `ORGANIZER;CN=${escapeIcsText(ORGANIZER_NAME)}:mailto:${ORGANIZER_EMAIL}`,
    `ATTENDEE;CN=${escapeIcsText(params.attendeeName)};RSVP=TRUE:mailto:${params.attendeeEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean) as string[];

  const icsContent = `${lines.map(foldIcsLine).join("\r\n")}\r\n`;

  return {
    name: ICS_FILENAME,
    mimeType: ICS_MIME_TYPE,
    content: Buffer.from(icsContent, "utf8").toString("base64"),
  };
}
