import { z } from "zod";

export const riskCalculatorTestEmailSchema = z.object({
  formId: z.string().trim().min(1, "formId es requerido"),
  toEmail: z.email({ message: "Email inválido" }),
  emailVariant: z.enum(["form_copy", "followup_no_booking"]).default("form_copy"),
});

export type RiskCalculatorTestEmailRequest = z.infer<
  typeof riskCalculatorTestEmailSchema
>;
