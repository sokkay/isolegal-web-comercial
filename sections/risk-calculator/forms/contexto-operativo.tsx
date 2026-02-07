"use client";

import FormAsk from "@/components/risk-calculator/FormAsk";
import FormContainer from "@/components/risk-calculator/FormContainer";
import FormError from "@/components/risk-calculator/FormError";
import FormHeader from "@/components/risk-calculator/FormHeader";
import IconTextCard from "@/components/risk-calculator/IconTextCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  useContextoOperativo,
  useRiskCalculator,
} from "@/contexts/RiskCalculatorContext";
import { AnimatePresence, motion } from "motion/react";

import ConstructionIcon from "@/public/icons/construction.svg";
import DiamondIcon from "@/public/icons/diamond.svg";
import EcoIcon from "@/public/icons/eco.svg";
import ElectricBoltIcon from "@/public/icons/electric-bolt.svg";
import EngineeringIcon from "@/public/icons/engineering.svg";
import FactoryIcon from "@/public/icons/factory.svg";
import HealthAndSafetyIcon from "@/public/icons/health-and-safety.svg";
import MoreHorizontalIcon from "@/public/icons/more-horiz.svg";
import VerifiedIcon from "@/public/icons/verified.svg";

export default function ContextoOperativo() {
  const { goToNextStep, goToPrevStep, form } = useRiskCalculator();
  const {
    rubro,
    rubroOtro,
    normasISO,
    setRubro,
    setRubroOtro,
    toggleNormaISO,
    errors,
  } = useContextoOperativo();
  const question1Responses = [
    {
      value: "Minería",
      icon: <DiamondIcon className="fill-primary dark:fill-white" />,
      title: "Minería",
    },
    {
      value: "Construcción",
      icon: <ConstructionIcon className="fill-primary dark:fill-white" />,
      title: "Construcción",
    },
    {
      value: "Energía",
      icon: <ElectricBoltIcon className="fill-primary dark:fill-white" />,
      title: "Energía",
    },
    {
      value: "Manufactura",
      icon: <FactoryIcon className="fill-primary dark:fill-white" />,
      title: "Manufactura",
    },
    {
      value: "Servicios Industriales",
      icon: <EngineeringIcon className="fill-primary dark:fill-white" />,
      title: "Servicios Industriales",
    },
    {
      value: "otro",
      icon: <MoreHorizontalIcon className="fill-primary dark:fill-white" />,
      title: "Otro",
    },
  ];

  const question2Responses = [
    {
      value: "ISO 14001",
      icon: <EcoIcon className="fill-[#16A34A]" />,
      iconContainerClassName: "bg-[#F0FDF4]",
      title: "ISO 14001",
      description: "Medio Ambiente",
    },
    {
      value: "ISO 9001",
      icon: <VerifiedIcon className="fill-[#2563EB]" />,
      iconContainerClassName: "bg-[#EFF6FF]",
      title: "ISO 9001",
      description: "Calidad",
    },
    {
      value: "ISO 45001",
      icon: <HealthAndSafetyIcon className="fill-[#EA580C]" />,
      iconContainerClassName: "bg-[#FFF7ED]",
      title: "ISO 45001",
      description: "SST",
    },
    {
      value: "En proceso de certificación inicial",
      icon: <MoreHorizontalIcon className="fill-text" />,
      iconContainerClassName: "bg-[#F8FAFC]",
      title: "Estamos en proceso de certificación inicial",
    },
  ];

  const handleNext = async () => {
    const isValid = await form.trigger("contextoOperativo");
    if (isValid) {
      goToNextStep();
    }
  };

  return (
    <FormContainer step={1} totalSteps={5}>
      <FormHeader
        title="Contexto Operativo"
        description="Defina el rubro principal de su organización y seleccione las normas ISO aplicables para personalizar el diagnóstico legal."
      />
      <FormAsk
        question="¿Cuál es el rubro principal de su organización?"
        number={1}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {question1Responses.map((response) => (
          <IconTextCard
            key={response.value}
            icon={response.icon}
            title={response.title}
            iconContainerStyle="circle"
            className="bg-input-bg"
            selected={rubro === response.value}
            onClick={() => setRubro(response.value)}
          />
        ))}
      </div>
      <AnimatePresence>
        {rubro === "otro" && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Input
              placeholder="Especifica el rubro de tu organización"
              value={rubroOtro || ""}
              onChange={(e) => setRubroOtro(e.target.value)}
              autoFocus
            />
            <FormError message={errors.rubroOtro?.message} />
          </motion.div>
        )}
      </AnimatePresence>
      <FormError message={errors.rubro?.message} />
      <FormAsk
        question="¿Qué norma(s) ISO son prioridad para tu gestión?"
        number={2}
        isMultipleChoice
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {question2Responses.map((response) => (
          <IconTextCard
            key={response.value}
            icon={response.icon}
            title={response.title}
            description={response.description}
            iconContainerClassName={response.iconContainerClassName}
            iconContainerStyle="square"
            containerStyle="outline"
            selected={normasISO.includes(response.value)}
            onClick={() => toggleNormaISO(response.value)}
          />
        ))}
      </div>
      <FormError message={errors.normasISO?.message} />
      <Button text="Siguiente" onClick={handleNext} className="self-end" />
    </FormContainer>
  );
}
