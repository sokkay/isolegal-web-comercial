import { buildTeamFormNotificationTemplate } from "@/lib/email/teamFormNotificationTemplate";
import { sendZeptoMail } from "@/lib/email/zeptomail";
import { getTeamFormNotificationEmails } from "./teamFormNotificationRecipients";

type TeamFormType = "contacto" | "soporte_tecnico" | "opinion";

type TeamFormFieldValue = string | number | boolean | null | undefined;

type TeamFormNotificationField = {
  label: string;
  value: TeamFormFieldValue;
};

type NotifyTeamFormSubmissionParams = {
  formType: TeamFormType;
  fields: TeamFormNotificationField[];
  submittedAt?: Date;
  source?: string;
};

const FORM_LABEL_BY_TYPE: Record<TeamFormType, string> = {
  contacto: "Contacto comercial",
  soporte_tecnico: "Soporte técnico",
  opinion: "Opinión / feedback",
};

function formatFieldValue(value: TeamFormFieldValue) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return String(value);
}

function formatSubmittedAt(value: Date) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(value);
}

export async function notifyTeamFormSubmission(
  params: NotifyTeamFormSubmissionParams,
) {
  const recipients = getTeamFormNotificationEmails();
  if (recipients.length === 0) {
    return { sent: false as const, reason: "no_recipients" as const };
  }

  const formLabel = FORM_LABEL_BY_TYPE[params.formType];
  const submittedAt = params.submittedAt ?? new Date();
  const source = params.source ?? "isolegal-web";
  const subject = `[Web] Nuevo formulario respondido: ${formLabel}`;

  const htmlbody = buildTeamFormNotificationTemplate({
    formLabel,
    source,
    submittedAtDisplay: formatSubmittedAt(submittedAt),
    fields: params.fields.map((field) => ({
      label: field.label,
      value: formatFieldValue(field.value),
    })),
  });

  await sendZeptoMail({
    toEmail: recipients[0],
    toName: "Equipo Isolegal",
    bccEmails: recipients.slice(1),
    subject,
    htmlbody,
  });

  return { sent: true as const, recipientsCount: recipients.length };
}
