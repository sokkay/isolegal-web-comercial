import { z } from "zod";

export const riskCalculatorTestEmailSchema = z.object({
  formId: z.string().trim().min(1, "formId es requerido"),
  toEmail: z.email({ message: "Email inválido" }),
});

export type RiskCalculatorTestEmailRequest = z.infer<
  typeof riskCalculatorTestEmailSchema
>;
