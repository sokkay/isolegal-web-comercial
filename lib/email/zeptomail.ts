import { buildRiskCalculatorResultsTemplate } from "@/lib/email/riskCalculatorResultsTemplate";

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

  await sendZeptoMail({
    toEmail: params.toEmail,
    toName: params.toName,
    subject: "Confirmación de reunión - ISO Legal",
    htmlbody: htmlParts.join(""),
  });
}

function getRiskLevelLabel(riskLevel: "bajo" | "alto" | "critico") {
  if (riskLevel === "bajo") return "Riesgo Bajo";
  if (riskLevel === "alto") return "Riesgo Alto";
  return "Riesgo Crítico";
}


function mapGestionMatriz(value: string) {
  const labels: Record<string, string> = {
    planilla_excel_control_manual: "Planilla Excel (control manual)",
    software_especializado_plataforma_legal:
      "Software especializado / plataforma legal",
    sin_matriz_estructurada: "Sin matriz estructurada",
  };
  return labels[value] ?? value;
}

function mapUltimaActualizacion(value: string) {
  const labels: Record<string, string> = {
    menos_3_meses: "Hace menos de 3 meses",
    entre_3_y_6_meses: "Entre 3 y 6 meses",
    mas_6_meses_o_no_seguro: "Más de 6 meses o no seguro",
  };
  return labels[value] ?? value;
}

function mapNormasTratadas(values: string[]) {
  const labels: Record<string, string> = {
    ds_369: "DS N° 369",
    ds_40: "DS N° 40",
    ds_594: "DS N° 594",
    ds_148: "DS N° 148",
    ninguna: "Ninguna / no seguro",
  };
  return values.map((value) => labels[value] ?? value);
}

function mapCambioNormativo(value: string) {
  const labels: Record<string, string> = {
    agregar_ley_completa_item_adicional:
      "Agregar ley completa como ítem adicional",
    actualizar_articulos_modificados: "Actualizar artículos modificados",
    mantener_norma_hasta_proxima_auditoria:
      "Mantener norma hasta próxima auditoría",
  };
  return labels[value] ?? value;
}

function mapEvidenciaTrazable(value: string) {
  const labels: Record<string, string> = {
    evidencia_disponible_inmediata: "Disponible de forma inmediata",
    tomaria_tiempo_buscar_consolidar: "Tomaría tiempo consolidarla",
    sin_certeza_evidencia_vigente: "Sin certeza de evidencia vigente",
  };
  return labels[value] ?? value;
}

function mapCompromisosVoluntarios(value: string) {
  const labels: Record<string, string> = {
    integrados_y_evaluados: "Integrados y evaluados",
    solo_leyes_y_decretos_nacionales: "Solo leyes/decretos nacionales",
    gestion_separada_o_informal: "Gestión separada o informal",
  };
  return labels[value] ?? value;
}

export async function sendRiskCalculatorResultsEmail(params: {
  toEmail: string;
  toName: string;
  empresa: string;
  score: number;
  riskLevel: "bajo" | "alto" | "critico";
  emailVariant?: "followup_no_booking" | "form_copy";
  rubro: string;
  normasISO: string[];
  gestionMatriz: string;
  ultimaActualizacion: string;
  normasTratadas: string[];
  cambioNormativo: string;
  evidenciaTrazable: string;
  compromisosVoluntarios: string;
}) {
  const emailVariant = params.emailVariant ?? "form_copy";
  const htmlbody = buildRiskCalculatorResultsTemplate({
    toName: params.toName,
    empresa: params.empresa,
    score: params.score,
    riskLevelLabel: getRiskLevelLabel(params.riskLevel),
    emailVariant,
    rubro: params.rubro,
    normasISO: params.normasISO,
    gestionMatriz: mapGestionMatriz(params.gestionMatriz),
    ultimaActualizacion: mapUltimaActualizacion(params.ultimaActualizacion),
    normasTratadas: mapNormasTratadas(params.normasTratadas),
    cambioNormativo: mapCambioNormativo(params.cambioNormativo),
    evidenciaTrazable: mapEvidenciaTrazable(params.evidenciaTrazable),
    compromisosVoluntarios: mapCompromisosVoluntarios(
      params.compromisosVoluntarios,
    ),
  });

  await sendZeptoMail({
    toEmail: params.toEmail,
    toName: params.toName,
    subject:
      emailVariant === "followup_no_booking"
        ? "Ya tienes el diagnóstico. ¿Qué vas a hacer con eso? | Isolegal 🌱"
        : "Copia de tu formulario completado | Isolegal 🌱",
    htmlbody,
  });
}

async function sendZeptoMail(params: {
  toEmail: string;
  toName: string;
  subject: string;
  htmlbody: string;
}) {
  const zeptoMailUrl = process.env.ZEPTOMAIL_URL || defaultZeptoMailUrl;
  const zeptoMailToken = process.env.ZEPTOMAIL_TOKEN;
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;

  if (!zeptoMailToken || !fromEmail) {
    throw new Error("Faltan variables ZEPTOMAIL_TOKEN o ZEPTOMAIL_FROM_EMAIL");
  }

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
      subject: params.subject,
      htmlbody: params.htmlbody,
    }),
  });

  if (response.ok) return;

  const responseText = await response.text();
  throw new Error(
    `Error enviando correo de confirmación (${response.status}): ${responseText}`,
  );
}
