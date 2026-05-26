import { z } from "zod";

export const TECHNICAL_SUPPORT_TYPE_LABELS = {
  platform_issue: "Problemas técnicos de la plataforma",
  content_question: "Consultas sobre contenido o normativa",
} as const;

export const TECHNICAL_SUPPORT_TYPE_OPTIONS = Object.entries(
  TECHNICAL_SUPPORT_TYPE_LABELS
).map(([value, label]) => ({
  value: value as keyof typeof TECHNICAL_SUPPORT_TYPE_LABELS,
  label,
}));

export const technicalSupportFormSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  company: z.string().min(1, "Empresa es requerida"),
  phone: z.string().min(1, "Teléfono es requerido"),
  email: z.email("Email inválido"),
  supportType: z.enum(
    Object.keys(TECHNICAL_SUPPORT_TYPE_LABELS) as [
      keyof typeof TECHNICAL_SUPPORT_TYPE_LABELS,
      ...Array<keyof typeof TECHNICAL_SUPPORT_TYPE_LABELS>,
    ],
    "Debes seleccionar el tipo de solicitud"
  ),
  problem: z.string().min(1, "Descripción es requerida"),
  terms: z
    .boolean()
    .refine((value) => value === true, "Debes aceptar los términos"),
});

export type TechnicalSupportFormData = z.infer<
  typeof technicalSupportFormSchema
>;
