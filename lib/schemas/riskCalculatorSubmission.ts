import freeEmailDomains from "free-email-domains";
import { z } from "zod";
import { isBusinessEmailValidationEnabled } from "@/lib/config/businessEmailValidation";

export const gestionMatrizEnum = z.enum([
  "planilla_excel_control_manual",
  "software_especializado_plataforma_legal",
  "sin_matriz_estructurada",
]);

export const ultimaActualizacionEnum = z.enum([
  "menos_3_meses",
  "entre_3_y_6_meses",
  "mas_6_meses_o_no_seguro",
]);

export const normaTratadaEnum = z.enum([
  "ds_369",
  "ds_40",
  "ds_594",
  "ds_148",
  "ninguna",
]);

export const cambioNormativoEnum = z.enum([
  "agregar_ley_completa_item_adicional",
  "actualizar_articulos_modificados",
  "mantener_norma_hasta_proxima_auditoria",
]);

export const evidenciaTrazableEnum = z.enum([
  "evidencia_disponible_inmediata",
  "tomaria_tiempo_buscar_consolidar",
  "sin_certeza_evidencia_vigente",
]);

export const compromisosVoluntariosEnum = z.enum([
  "integrados_y_evaluados",
  "solo_leyes_y_decretos_nacionales",
  "gestion_separada_o_informal",
]);

export const riskLevelEnum = z.enum(["bajo", "alto", "critico"]);

export const riskCalculatorSubmissionSchema = z.object({
  contextoOperativo: z.object({
    rubro: z.string().min(1, "Debes seleccionar un rubro"),
    rubroOtro: z.string().optional(),
    normasISO: z.array(z.string()).min(1, "Debes seleccionar al menos una norma"),
  }),
  saludMatrizLegal: z
    .object({
      gestionMatriz: gestionMatrizEnum,
      ultimaActualizacion: ultimaActualizacionEnum,
      normasTratadas: z
        .array(normaTratadaEnum)
        .min(1, "Debes seleccionar al menos una opción"),
    })
    .superRefine((data, ctx) => {
      if (
        data.normasTratadas.includes("ninguna") &&
        data.normasTratadas.length > 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["normasTratadas"],
          message:
            "No puedes seleccionar 'ninguna' junto con otras normas tratadas",
        });
      }
    }),
  criterioYRespuesta: z.object({
    cambioNormativo: cambioNormativoEnum,
    evidenciaTrazable: evidenciaTrazableEnum,
    compromisosVoluntarios: compromisosVoluntariosEnum,
  }),
  resultadosDiagnostico: z.object({
    nombreCompleto: z.string().min(1, "Debes ingresar tu nombre completo"),
    correoCorporativo: z
      .email({ message: "Email inválido" })
      .refine((val) => {
        if (!isBusinessEmailValidationEnabled()) {
          return true;
        }

        const domain = val.split("@")[1]?.toLowerCase();
        return !!domain && !freeEmailDomains.includes(domain);
      }, {
        message: "Debes usar un correo corporativo",
      }),
    empresa: z.string().min(1, "Debes ingresar tu empresa"),
  }),
});

export const riskCalculationResultSchema = z.object({
  score: z.number().min(0).max(20),
  riskLevel: riskLevelEnum,
  submissionId: z.string().optional(),
});

export type RiskCalculatorSubmissionData = z.infer<
  typeof riskCalculatorSubmissionSchema
>;
export type RiskCalculationResult = z.infer<typeof riskCalculationResultSchema>;
export type RiskLevel = z.infer<typeof riskLevelEnum>;
