import freeEmailDomains from "free-email-domains";
import { z } from "zod";
import { isBusinessEmailValidationEnabled } from "@/lib/config/businessEmailValidation";

export const contextoOperativoSchema = z
  .object({
    rubro: z.string().min(1, "Debes seleccionar un rubro"),
    rubroOtro: z.string().optional(),
    normasISO: z
      .array(z.string())
      .min(1, "Debes seleccionar al menos una norma"),
  })
  .refine(
    (data) => {
      if (data.rubro === "otro") {
        return data.rubroOtro && data.rubroOtro.trim().length > 0;
      }
      return true;
    },
    {
      message: "Debes especificar el rubro",
      path: ["rubroOtro"],
    }
  );

export const saludMatrizLegalSchema = z.object({
  gestionMatriz: z.string().min(1, "Debes seleccionar una opción"),
  ultimaActualizacion: z.string().min(1, "Debes seleccionar una opción"),
  normasTratadas: z
    .array(z.string())
    .min(1, "Debes seleccionar al menos una opción"),
});

export const criterioYRespuestaSchema = z.object({
  cambioNormativo: z.string().min(1, "Debes seleccionar una opción"),
  evidenciaTrazable: z.string().min(1, "Debes seleccionar una opción"),
  compromisosVoluntarios: z.string().min(1, "Debes seleccionar una opción"),
});

export const resultadosDiagnosticoSchema = z.object({
  nombreCompleto: z.string().min(1, "Debes ingresar tu nombre completo"),
  correoCorporativo: z
    .email("Email inválido")
    .min(1, "Debes ingresar tu correo corporativo")
    .refine((val) => {
      if (!isBusinessEmailValidationEnabled()) {
        return true;
      }

      const domain = val.split("@")[1]?.toLowerCase();
      return !!domain && !freeEmailDomains.includes(domain);
    }, {
      message:
        "Debes usar un correo corporativo",
    }),
  empresa: z.string().min(1, "Debes ingresar tu empresa"),
});

export const riskCalculatorSchema = z.object({
  contextoOperativo: contextoOperativoSchema,
  saludMatrizLegal: saludMatrizLegalSchema,
  criterioYRespuesta: criterioYRespuestaSchema,
  resultadosDiagnostico: resultadosDiagnosticoSchema,
});

export type ContextoOperativoFormData = z.infer<typeof contextoOperativoSchema>;
export type SaludMatrizLegalFormData = z.infer<typeof saludMatrizLegalSchema>;
export type CriterioYRespuestaFormData = z.infer<
  typeof criterioYRespuestaSchema
>;
export type ResultadosDiagnosticoFormData = z.infer<
  typeof resultadosDiagnosticoSchema
>;
export type RiskCalculatorFormData = z.infer<typeof riskCalculatorSchema>;
