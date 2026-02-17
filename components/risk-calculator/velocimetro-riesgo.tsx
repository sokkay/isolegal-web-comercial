"use client";

import { cn } from "@/utils/cn";

type VelocimetroRiesgoProps = {
  score: number;
  className?: string;
};

export const MAX_RISK_SCORE = 20;

const clampScore = (score: number) => Math.min(MAX_RISK_SCORE, Math.max(0, score));

export const getRiskMeta = (score: number) => {
  if (score <= 4) {
    return {
      title: "Bajo",
      rangeLabel: "0-4 puntos",
      description:
        "Tienes una buena base y capacidad de respuesta.\nEl desafío es mantener la consistencia y la trazabilidad en el tiempo para que el riesgo no reaparezca.\nVas en la dirección correcta: ahora se trata de sostenerlo.",
      badgeLabel: "Riesgo Bajo",
      badgeClass:
        "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900/40",
      scoreClass: "text-green-600 dark:text-green-400",
    };
  }

  if (score <= 9) {
    return {
      title: "Alto",
      rangeLabel: "5-9 puntos",
      description:
        "Tu cumplimiento podría fallar cuando más lo necesites:\nExisten brechas que hoy pueden pasar desapercibidas,\npero en una fiscalización real se vuelven visibles de inmediato.\nNo es un problema futuro: es un riesgo activo.\nMientras más tiempo pase sin ajustes, mayor será la exposición.",
      badgeLabel: "Riesgo Alto",
      badgeClass:
        "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/40",
      scoreClass: "text-amber-600 dark:text-amber-400",
    };
  }

  return {
    title: "Crítico",
    rangeLabel: "10-20 puntos",
    description:
      "Tu cumplimiento está en zona de riesgo crítico: La estructura actual no garantiza respuesta ante una auditoría o fiscalización.\nAquí el riesgo no es gradual, es directo.\nCada mes sin control aumenta la probabilidad de observaciones, exigencias urgentes o detenciones operativas.\nEste nivel requiere acción inmediata.",
    badgeLabel: "Riesgo Crítico",
    badgeClass:
      "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/40",
    scoreClass: "text-red-600 dark:text-red-400",
  };
};

export default function VelocimetroRiesgo({
  score,
  className,
}: VelocimetroRiesgoProps) {
  const safeScore = clampScore(score);
  const needleDegrees = (safeScore / MAX_RISK_SCORE) * 180 - 90;
  const riskMeta = getRiskMeta(safeScore);

  return (
    <div className={cn("w-full max-w-xs flex flex-col items-center", className)}>
      <div className="relative w-64 h-32">
        <div
          className="absolute inset-0 rounded-t-full opacity-90"
          style={{
            background:
              "conic-gradient(from 270deg at 50% 100%, #22c55e 0deg, #eab308 90deg, #ef4444 180deg, transparent 180deg)",
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-card-background rounded-t-full z-10" />
        <div className="absolute bottom-0 left-0 w-full border-b border-gray-300 dark:border-gray-700 z-20" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 h-full flex items-end justify-center">
          <div
            className="w-1.5 h-[120px] bg-slate-800 dark:bg-slate-100 origin-bottom rounded-t-sm transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${needleDegrees}deg)` }}
          />
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-100 z-40 translate-y-1/2" />
      </div>

      <div className="text-center mt-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className={cn("text-6xl font-black tracking-tighter", riskMeta.scoreClass)}>
            {safeScore.toFixed(1)}
          </span>
          <span className="text-2xl font-bold text-gray-400">/20</span>
        </div>

        <span
          className={cn(
            "inline-flex mt-3 px-4 py-1.5 rounded-full border text-sm font-semibold",
            riskMeta.badgeClass
          )}
        >
          {riskMeta.badgeLabel}
        </span>
      </div>
    </div>
  );
}
