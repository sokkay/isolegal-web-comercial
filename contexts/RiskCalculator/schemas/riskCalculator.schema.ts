import { z } from "zod";

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

export const riskCalculatorSchema = z.object({
  contextoOperativo: contextoOperativoSchema,
  saludMatrizLegal: saludMatrizLegalSchema,
  criterioYRespuesta: criterioYRespuestaSchema,
});

export type ContextoOperativoFormData = z.infer<
  typeof contextoOperativoSchema
>;
export type SaludMatrizLegalFormData = z.infer<typeof saludMatrizLegalSchema>;
export type CriterioYRespuestaFormData = z.infer<
  typeof criterioYRespuestaSchema
>;
export type RiskCalculatorFormData = z.infer<typeof riskCalculatorSchema>;
