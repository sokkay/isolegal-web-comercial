"use client";

import { cn } from "@/utils/cn";

type VelocimetroRiesgoProps = {
  score: number;
  className?: string;
  showScore?: boolean;
};

export const MAX_RISK_SCORE = 20;

const clampScore = (score: number) =>
  Math.min(MAX_RISK_SCORE, Math.max(0, score));

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
  showScore = true,
}: VelocimetroRiesgoProps) {
  const safeScore = clampScore(score);
  const needleDegrees = (safeScore / MAX_RISK_SCORE) * 180 - 90;
  const riskMeta = getRiskMeta(safeScore);

  return (
    <div
      className={cn("flex w-full max-w-xs flex-col items-center", className)}
    >
      <div className="relative h-32 w-64">
        <div
          className="absolute inset-0 rounded-t-full opacity-90"
          style={{
            background:
              "conic-gradient(from 270deg at 50% 100%, #22c55e 0deg, #eab308 90deg, #ef4444 180deg, transparent 180deg)",
          }}
        />
        <div className="bg-card-background absolute bottom-0 left-1/2 z-10 h-24 w-48 -translate-x-1/2 rounded-t-full" />
        <div className="absolute bottom-0 left-0 z-20 w-full border-b border-gray-300 dark:border-gray-700" />

        <div className="absolute bottom-0 left-1/2 z-30 flex h-full -translate-x-1/2 items-end justify-center">
          <div
            className="h-[120px] w-1.5 origin-bottom rounded-t-sm bg-slate-800 transition-transform duration-700 ease-out dark:bg-slate-100"
            style={{ transform: `rotate(${needleDegrees}deg)` }}
          />
        </div>

        <div className="absolute bottom-0 left-1/2 z-40 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-slate-900 dark:bg-slate-100" />
      </div>

      <div className="mt-6 text-center">
        {showScore && (
          <div className="flex items-baseline justify-center gap-1">
            <span
              className={cn(
                "text-6xl font-black tracking-tighter",
                riskMeta.scoreClass
              )}
            >
              {safeScore.toFixed(1)}
            </span>
            <span className="text-2xl font-bold text-gray-400">/20</span>
          </div>
        )}

        <span
          className={cn(
            "mt-3 inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold",
            riskMeta.badgeClass
          )}
        >
          {riskMeta.badgeLabel}
        </span>
      </div>
    </div>
  );
}
