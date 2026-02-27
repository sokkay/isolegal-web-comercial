import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { getPb } from "@/lib/pocketbase";
import { RISK_CALCULATOR_ORIGIN_PENDING } from "@/lib/riskCalculatorEmail";
import {
  type RiskCalculatorSubmissionData,
  type RiskLevel,
  riskCalculatorSubmissionSchema,
} from "@/lib/schemas/riskCalculatorSubmission";

const SCORE_BY_GESTION_MATRIZ: Record<
  RiskCalculatorSubmissionData["saludMatrizLegal"]["gestionMatriz"],
  number
> = {
  planilla_excel_control_manual: 2,
  software_especializado_plataforma_legal: 1,
  sin_matriz_estructurada: 3,
};

const SCORE_BY_ULTIMA_ACTUALIZACION: Record<
  RiskCalculatorSubmissionData["saludMatrizLegal"]["ultimaActualizacion"],
  number
> = {
  menos_3_meses: 1,
  entre_3_y_6_meses: 2,
  mas_6_meses_o_no_seguro: 3,
};

const SCORE_BY_CAMBIO_NORMATIVO: Record<
  RiskCalculatorSubmissionData["criterioYRespuesta"]["cambioNormativo"],
  number
> = {
  agregar_ley_completa_item_adicional: 1,
  actualizar_articulos_modificados: 0,
  mantener_norma_hasta_proxima_auditoria: 2,
};

const SCORE_BY_EVIDENCIA_TRAZABLE: Record<
  RiskCalculatorSubmissionData["criterioYRespuesta"]["evidenciaTrazable"],
  number
> = {
  evidencia_disponible_inmediata: 0,
  tomaria_tiempo_buscar_consolidar: 1,
  sin_certeza_evidencia_vigente: 3,
};

const SCORE_BY_COMPROMISOS_VOLUNTARIOS: Record<
  RiskCalculatorSubmissionData["criterioYRespuesta"]["compromisosVoluntarios"],
  number
> = {
  integrados_y_evaluados: 0,
  solo_leyes_y_decretos_nacionales: 1,
  gestion_separada_o_informal: 3,
};

function getRiskLevel(score: number): RiskLevel {
  if (score <= 4) return "bajo";
  if (score <= 9) return "alto";
  return "critico";
}

function calculateRiskScore(data: RiskCalculatorSubmissionData) {
  const { saludMatrizLegal, criterioYRespuesta } = data;

  const scoreQuestion3 = SCORE_BY_GESTION_MATRIZ[saludMatrizLegal.gestionMatriz];
  const scoreQuestion4 =
    SCORE_BY_ULTIMA_ACTUALIZACION[saludMatrizLegal.ultimaActualizacion];
  const scoreQuestion5 =
    saludMatrizLegal.normasTratadas.filter(
      (value) => value === "ds_369" || value === "ds_40",
    ).length * 3;
  const scoreQuestion6 =
    SCORE_BY_CAMBIO_NORMATIVO[criterioYRespuesta.cambioNormativo];
  const scoreQuestion7 =
    SCORE_BY_EVIDENCIA_TRAZABLE[criterioYRespuesta.evidenciaTrazable];
  const scoreQuestion8 =
    SCORE_BY_COMPROMISOS_VOLUNTARIOS[criterioYRespuesta.compromisosVoluntarios];

  const score =
    scoreQuestion3 +
    scoreQuestion4 +
    scoreQuestion5 +
    scoreQuestion6 +
    scoreQuestion7 +
    scoreQuestion8;

  return {
    score,
    riskLevel: getRiskLevel(score),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = riskCalculatorSubmissionSchema.parse(body);
    const calculation = calculateRiskScore(validatedData);

    let submissionId: string | undefined;

    try {
      const pb = getPb();
      const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
      const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;

      if (adminEmail && adminPassword) {
        await pb.collection("_superusers").authWithPassword(
          adminEmail,
          adminPassword,
        );
      }

      const record = await pb.collection("diagnosticos_riesgo").create({
        nombre_completo: validatedData.resultadosDiagnostico.nombreCompleto,
        correo_corporativo:
          validatedData.resultadosDiagnostico.correoCorporativo,
        empresa: validatedData.resultadosDiagnostico.empresa,
        rubro: validatedData.contextoOperativo.rubro,
        rubro_otro: validatedData.contextoOperativo.rubroOtro || "",
        normas_iso: validatedData.contextoOperativo.normasISO,
        gestion_matriz: validatedData.saludMatrizLegal.gestionMatriz,
        ultima_actualizacion: validatedData.saludMatrizLegal.ultimaActualizacion,
        normas_tratadas: validatedData.saludMatrizLegal.normasTratadas,
        cambio_normativo: validatedData.criterioYRespuesta.cambioNormativo,
        evidencia_trazable: validatedData.criterioYRespuesta.evidenciaTrazable,
        compromisos_voluntarios:
          validatedData.criterioYRespuesta.compromisosVoluntarios,
        score: calculation.score,
        nivel_riesgo: calculation.riskLevel,
        origen: RISK_CALCULATOR_ORIGIN_PENDING,
      });
      submissionId = record.id;
    } catch (pbError) {
      console.error("PocketBase diagnosticos_riesgo:", pbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Diagnóstico calculado exitosamente",
        data: {
          score: calculation.score,
          riskLevel: calculation.riskLevel,
          submissionId,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    console.error("Error en submitRiskCalculator:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      },
      { status: 500 },
    );
  }
}
