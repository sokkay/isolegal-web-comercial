const defaultZeptoMailUrl = "https://api.zeptomail.com/v1.1/email";

function formatDateTime(valueIso: string, timeZone: string) {
  return new Intl.DateTimeFormat("es-CL", {
    timeZone,
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(valueIso));
}

export async function sendMeetingConfirmationEmail(params: {
  toEmail: string;
  toName: string;
  timeZone: string;
  startDateTimeIso: string;
  endDateTimeIso: string;
  eventLink?: string;
  meetLink?: string;
}) {
  const zeptoMailUrl = process.env.ZEPTOMAIL_URL || defaultZeptoMailUrl;
  const zeptoMailToken = process.env.ZEPTOMAIL_TOKEN;
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;

  if (!zeptoMailToken || !fromEmail) {
    throw new Error("Faltan variables ZEPTOMAIL_TOKEN o ZEPTOMAIL_FROM_EMAIL");
  }

  const formattedStart = formatDateTime(params.startDateTimeIso, params.timeZone);
  const formattedEnd = formatDateTime(params.endDateTimeIso, params.timeZone);
  const htmlParts = [
    `<p>Hola ${params.toName},</p>`,
    "<p>Tu sesión estratégica en ISO Legal fue agendada correctamente.</p>",
    `<p><strong>Inicio:</strong> ${formattedStart}<br/>`,
    `<strong>Término:</strong> ${formattedEnd}<br/>`,
    `<strong>Zona horaria:</strong> ${params.timeZone}</p>`,
  ];

  if (params.meetLink) {
    htmlParts.push(
      `<p><strong>Enlace de Google Meet:</strong> <a href="${params.meetLink}">${params.meetLink}</a></p>`,
    );
  }
  if (params.eventLink) {
    htmlParts.push(
      `<p><strong>Evento en Google Calendar:</strong> <a href="${params.eventLink}">${params.eventLink}</a></p>`,
    );
  }
  htmlParts.push("<p>Nos vemos pronto.</p>");

  const response = await fetch(zeptoMailUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: zeptoMailToken,
    },
    body: JSON.stringify({
      from: {
        address: fromEmail,
      },
      to: [
        {
          email_address: {
            address: params.toEmail,
            name: params.toName,
          },
        },
      ],
      subject: "Confirmación de reunión - ISO Legal",
      htmlbody: htmlParts.join(""),
    }),
  });

  if (response.ok) return;

  const responseText = await response.text();
  throw new Error(
    `Error enviando correo de confirmación (${response.status}): ${responseText}`,
  );
}
