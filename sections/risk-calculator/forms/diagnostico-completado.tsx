"use client";

import VelocimetroRiesgo, {
  getRiskMeta,
} from "@/components/risk-calculator/velocimetro-riesgo";
import Button from "@/components/ui/Button";
import { useRiskCalculator } from "@/contexts/RiskCalculator";
import SpeedFillIcon from "@/public/icons/speed-fill.svg";
import Image from "next/image";

export default function DiagnosticoCompletado() {
  const { calculationResult, goToNextStep } = useRiskCalculator();
  const score = calculationResult?.score ?? 0;
  const riskMeta = getRiskMeta(score);

  return (
    <div className="bg-card-background text-text flex flex-col overflow-hidden rounded-3xl px-4 py-8 shadow-lg md:flex-row md:px-8">
      <div className="flex flex-5 flex-col items-center justify-center border-gray-200 md:border-r md:pr-8 dark:border-gray-800">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          <SpeedFillIcon className="mr-1 inline-block h-4 w-4 fill-gray-500" />
          ÍNDICE DE RIESGO LEGAL ISO
        </span>
        <VelocimetroRiesgo score={score} className="mt-6" showScore={false} />
      </div>
      <div className="flex flex-7 flex-col gap-4 pt-8 md:pt-0 md:pl-6">
        <h1 className="text-2xl font-bold">{riskMeta.title}</h1>
        {/* <span className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {riskMeta.rangeLabel}
        </span> */}
        <p className="mb-6 text-sm leading-6 font-semibold whitespace-pre-line text-gray-500 dark:text-gray-400">
          {riskMeta.description}
        </p>
        <span className="text-text text-base font-semibold">
          Nuestro equipo
        </span>
        <div className="flex flex-col gap-4 lg:flex-row">
          <PersonCard
            name="Claudio Arriagada"
            charge="ISO/Medioambiente"
            imgUrl="/images/personal/claudio.png"
          />
          <PersonCard
            name="Felipe Arriagada"
            charge="Legal/Riesgo Normativo"
            imgUrl="/images/personal/felipe.png"
          />
        </div>

        <Button
          text="Reservar Sesión Estratégica"
          className="mt-4"
          onClick={goToNextStep}
        />
        <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ID formulario:{" "}
            <strong className="text-text font-semibold dark:text-white">
              {calculationResult?.submissionId ?? "N/D"}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

type PersonCardProps = {
  name: string;
  charge: string;
  imgUrl: string;
};

const PersonCard = ({ name, charge, imgUrl }: PersonCardProps) => {
  return (
    <div className="flex flex-1 flex-row items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
      <Image
        src={imgUrl}
        alt={name}
        width={100}
        height={100}
        className="h-10 w-10 rounded-lg"
      />
      <div className="flex flex-col">
        <h3 className="text-base font-bold">{name}</h3>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          {charge}
        </p>
      </div>
    </div>
  );
};
