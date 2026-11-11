import { notifyTeamFormSubmission } from "@/lib/email/teamFormNotification";
import { captureEmailDelivery } from "@/lib/posthog/emailDelivery";
import type PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";

export async function sendContactNotification(
  pb: PocketBase,
  record: RecordModel
) {
  if (!["pending", "failed"].includes(record.email_estado)) {
    return { status: "skipped" };
  }

  await pb.collection("contactos").update(record.id, {
    email_estado: "sending",
    email_intentos: Number(record.email_intentos || 0) + 1,
    email_ultimo_intento: new Date().toISOString(),
    email_ultimo_error: "",
  });

  const deliveryEvent = {
    collection: "contactos" as const,
    submissionId: record.id,
    emailType: "contact_notification" as const,
    attempt: Number(record.email_intentos || 0) + 1,
  };
  try {
    const result = await notifyTeamFormSubmission({
      formType: "contacto",
      source: "api/submitContactForm",
      submittedAt: new Date(record.created),
      fields: [
        { label: "Nombre", value: record.nombre },
        { label: "Empresa", value: record.empresa },
        { label: "Correo corporativo", value: record.email },
        { label: "Teléfono", value: record.telefono },
        ...[
          { label: "Cargo", value: record.cargo },
          { label: "Tamaño de la empresa", value: record.tamano_empresa },
          { label: "Rubro/Industria", value: record.rubro },
        ].filter((field) => field.value),
        { label: "¿Qué necesita resolver tu empresa?", value: record.mensaje },
        { label: "Consentimiento", value: true },
      ],
    });
    if (!result.sent) throw new Error("No hay destinatarios configurados");
  } catch (error) {
    // Do not store provider response bodies, which can contain personal data.
    const message = error instanceof Error ? error.message : "";
    const httpStatus = message.match(/\((\d{3})\)/)?.[1];
    const noRecipients = message === "No hay destinatarios configurados";
    await captureEmailDelivery({
      ...deliveryEvent,
      status: httpStatus || noRecipients ? "failed" : "uncertain",
      providerStatus: httpStatus ? Number(httpStatus) : undefined,
      errorCode: noRecipients
        ? "no_recipients"
        : message.includes("Credit exhausted")
          ? "credit_exhausted"
          : httpStatus
            ? "provider_rejected"
            : "delivery_uncertain",
    });
    await pb.collection("contactos").update(record.id, {
      email_estado: "failed",
      email_ultimo_error: httpStatus
        ? `ZeptoMail HTTP ${httpStatus}${message.includes("Credit exhausted") ? ": créditos agotados" : ""}`
        : message === "No hay destinatarios configurados"
          ? message
          : "Fallo de envío; revisar logs del proveedor antes de reintentar",
    });
    return { status: "failed" };
  }

  await captureEmailDelivery({ ...deliveryEvent, status: "accepted" });

  // If this update fails, keep 'sending': retrying could duplicate an accepted mail.
  await pb.collection("contactos").update(record.id, {
    email_estado: "sent",
    email_enviado_en: new Date().toISOString(),
    email_ultimo_error: "",
  });
  return { status: "sent" };
}
