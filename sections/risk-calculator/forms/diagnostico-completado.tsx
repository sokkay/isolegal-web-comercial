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
    <div className="flex md:flex-row flex-col bg-card-background rounded-3xl text-text shadow-lg overflow-hidden px-4 md:px-8 py-8">
      <div className="flex-5 flex flex-col justify-center items-center md:pr-8 md:border-r border-gray-200 dark:border-gray-800">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          <SpeedFillIcon className="w-4 h-4 inline-block mr-1 fill-gray-500" />
          ÍNDICE DE RIESGO LEGAL ISO
        </span>
        <VelocimetroRiesgo score={score} className="mt-6" />
      </div>
      <div className="flex-7 md:pl-6 pt-8 md:pt-0 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{riskMeta.title}</h1>
        {/* <span className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          {riskMeta.rangeLabel}
        </span> */}
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-6 whitespace-pre-line mb-6">
          {riskMeta.description}
        </p>
        <span className="text-base font-semibold text-text">
          Nuestro equipo
        </span>
        <div className="flex lg:flex-row flex-col gap-4">
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
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ID formulario:{" "}
            <strong className="font-semibold text-text dark:text-white">
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
    <div className="flex flex-1 flex-row items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
      <Image
        src={imgUrl}
        alt={name}
        width={100}
        height={100}
        className="w-10 h-10 rounded-lg"
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
