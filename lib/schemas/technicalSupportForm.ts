import { z } from "zod";

export const technicalSupportFormSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  company: z.string().min(1, "Empresa es requerida"),
  phone: z.string().min(1, "Teléfono es requerido"),
  email: z.email("Email inválido"),
  problem: z.string().min(1, "Descripción es requerida"),
  terms: z
    .boolean()
    .refine((value) => value === true, "Debes aceptar los términos"),
});

export type TechnicalSupportFormData = z.infer<
  typeof technicalSupportFormSchema
>;
