import { readFileSync } from "node:fs";
import path from "node:path";
import Handlebars from "handlebars";

export type RiskCalculatorResultsTemplateParams = {
  toName: string;
  empresa: string;
  score: number;
  riskLevelLabel: string;
  riskLevelMessage: string;
  rubro: string;
  normasISO: string[];
  gestionMatriz: string;
  ultimaActualizacion: string;
  normasTratadas: string[];
  cambioNormativo: string;
  evidenciaTrazable: string;
  compromisosVoluntarios: string;
};

function getRiskTone(riskLevelLabel: string) {
  const normalized = riskLevelLabel.toLowerCase();
  if (normalized.includes("cr")) return "critical";
  if (normalized.includes("alto")) return "high";
  return "low";
}

const templateSource = readFileSync(
  path.join(
    process.cwd(),
    "lib",
    "email",
    "templates",
    "risk-calculator-results.html",
  ),
  "utf-8",
);

const template = Handlebars.compile(templateSource);

export function buildRiskCalculatorResultsTemplate(
  params: RiskCalculatorResultsTemplateParams,
) {
  const boundedScore = Math.min(20, Math.max(0, params.score));
  const contactEmail = "isolegal@contacto.cl";
  const riskTone = getRiskTone(params.riskLevelLabel);
  const mailSubject = encodeURIComponent(
    `Consulta diagnóstico legal - ${params.empresa}`,
  );
  const mailBody = encodeURIComponent(
    [
      "Hola equipo ISO Legal,",
      "",
      `Recibí el diagnóstico de ${params.empresa} y me gustaría profundizar en los resultados.`,
      "",
      "Contexto adicional:",
      "-",
      "",
      "Saludos,",
      params.toName,
    ].join("\n"),
  );

  return template({
    ...params,
    scoreDisplay: boundedScore.toFixed(1),
    isRiskLow: riskTone === "low",
    isRiskHigh: riskTone === "high",
    isRiskCritical: riskTone === "critical",
    contactEmail,
    contactMailtoHref: `mailto:${contactEmail}?subject=${mailSubject}&body=${mailBody}`,
    normasISOText: params.normasISO.length > 0 ? params.normasISO.join(", ") : "-",
    normasTratadasText:
      params.normasTratadas.length > 0 ? params.normasTratadas.join(", ") : "-",
  });
}
