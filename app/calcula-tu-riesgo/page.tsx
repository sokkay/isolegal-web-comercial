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
import { useEffect, useState } from "react";

function CalculaTuRiesgoContent() {
  const searchParams = useSearchParams();
  const initialStep = Number(searchParams.get("step")) || 0;
  const { currentStep: contextStep, goToStep } = useRiskCalculator();

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(1);

  // Sincronizar el step del context con el step local
  useEffect(() => {
    if (contextStep !== currentStep && currentStep > 0) {
      setCurrentStep(contextStep);
    }
  }, [contextStep]);

  const goToStepLocal = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const nextStep = () =>
    goToStepLocal(Math.min(currentStep + 1, steps.length - 1));
  const prevStep = () => goToStepLocal(Math.max(currentStep - 1, 0));

  const steps = [
    {
      label: "Inicio",
      component: <RiskCalculatorBanner onStart={nextStep} />,
    },
    {
      label: "Contexto Operativo",
      component: <ContextoOperativo />,
    },
    {
      label: "Salud Matriz Legal",
      component: <SaludMatrizLegal onNext={nextStep} onPrev={prevStep} />,
    },
    {
      label: "Criterio y Respuesta",
      component: <CriterioYRespuesta onNext={nextStep} onPrev={prevStep} />,
    },
    {
      label: "Resultados Diagnóstico",
      component: <ResultadosDiagnostico onNext={nextStep} onPrev={prevStep} />,
    },
    {
      label: "Diagnóstico Completado",
      component: <DiagnosticoCompletado />,
    },
  ];

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
          {steps[currentStep].component}
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
      <CalculaTuRiesgoContent />
    </RiskCalculatorProvider>
  );
}
