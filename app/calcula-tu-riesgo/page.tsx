"use client";
import {
  RiskCalculatorProvider,
  useRiskCalculator,
} from "@/contexts/RiskCalculatorContext";
import ContextoOperativo from "@/sections/risk-calculator/forms/contexto-operativo";
import CriterioYRespuesta from "@/sections/risk-calculator/forms/criterio-y-respuesta";
import DiagnosticoCompletado from "@/sections/risk-calculator/forms/diagnostico-completado";
import ResultadosDiagnostico from "@/sections/risk-calculator/forms/resultados-diagnostico";
import SaludMatrizLegal from "@/sections/risk-calculator/forms/salud-matriz-legal";
import RiskCalculatorBanner from "@/sections/risk-calculator/risk-calculator-banner";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function CalculaTuRiesgoContent() {
  const searchParams = useSearchParams();
  const initialStep = Number(searchParams.get("step")) || 0;
  const { currentStep, goToStep } = useRiskCalculator();

  const [direction, setDirection] = useState(1);

  // Inicializar el step desde la URL
  useEffect(() => {
    if (initialStep !== currentStep) {
      goToStep(initialStep);
    }
  }, []);

  // Detectar cambios de step para la animación
  useEffect(() => {
    setDirection(1);
  }, [currentStep]);

  const startCalculator = () => {
    goToStep(1);
  };

  const getStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <RiskCalculatorBanner onStart={startCalculator} />;
      case 1:
        return <ContextoOperativo />;
      case 2:
        return <SaludMatrizLegal />;
      case 3:
        return <CriterioYRespuesta />;
      case 4:
        return <ResultadosDiagnostico />;
      case 5:
        return <DiagnosticoCompletado />;
      default:
        return <RiskCalculatorBanner onStart={startCalculator} />;
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="relative overflow-hidden bg-background">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="container mx-auto py-16"
        >
          {getStepComponent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function CalculaTuRiesgo() {
  return (
    <RiskCalculatorProvider
      onSubmit={(data) => {
        console.log("Formulario completo:", data);
        // Aquí puedes enviar los datos al backend
      }}
    >
      <Suspense>
        <CalculaTuRiesgoContent />
      </Suspense>
    </RiskCalculatorProvider>
  );
}
