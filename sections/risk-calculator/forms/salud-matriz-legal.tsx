"use client";

import FormAsk from "@/components/risk-calculator/FormAsk";
import FormContainer from "@/components/risk-calculator/FormContainer";
import FormError from "@/components/risk-calculator/FormError";
import FormHeader from "@/components/risk-calculator/FormHeader";
import IconTextCard from "@/components/risk-calculator/IconTextCard";
import SimpleSlider from "@/components/risk-calculator/SimpleSlider";
import Button from "@/components/ui/Button";
import {
  useRiskCalculator,
  useSaludMatrizLegal,
} from "@/contexts/RiskCalculatorContext";
import DnsIcon from "@/public/icons/dns.svg";
import DocsIcon from "@/public/icons/docs.svg";
import TableViewIcon from "@/public/icons/table-view.svg";

const sliderOptions = [
  { value: "menos_3_meses", label: "Menos de 3 meses" },
  { value: "hace_6_meses", label: "Hace 6 meses" },
  { value: "mas_6_meses", label: "Más de 6 meses" },
];

export default function SaludMatrizLegal() {
  const { goToNextStep, goToPrevStep, form } = useRiskCalculator();
  const {
    gestionMatriz,
    ultimaActualizacion,
    normasTratadas,
    setGestionMatriz,
    setUltimaActualizacion,
    toggleNormaTratada,
    errors,
  } = useSaludMatrizLegal();

  const question3Responses = [
    {
      value: "Excel / Hojas de Cálculo",
      title: "Excel / Hojas de Cálculo",
      description: "Gestión manual mediante archivos locales o compartidos.",
      icon: <TableViewIcon className="fill-[#15803D] dark:fill-white" />,
      iconContainerClassName: "bg-[#DCFCE7]",
    },
    {
      value: "Software Especializado",
      title: "Software Especializado",
      description: "Plataforma SaaS o solución interna dedicada.",
      icon: <DnsIcon className="fill-[#1D4ED8] dark:fill-white" />,
      iconContainerClassName: "bg-[#DBEAFE]",
    },
  ];

  const question5Responses = [
    {
      value: "DS 594",
      title: "DS 594",
      description: "Condiciones Sanitarias y Ambientales",
    },
    {
      value: "DS 369",
      title: "DS 369",
      description: "Reglamento sobre extintores",
    },
    {
      value: "DS 40",
      title: "DS 40",
      description: "Prevención de Riesgos Profesionales",
    },
    {
      value: "DS 148",
      title: "DS 148",
      description: "Residuos Peligrosos",
    },
    {
      value: "ninguna",
      title: "No estoy seguro / Ninguna de las anteriores",
    },
  ];

  const handleNext = async () => {
    const isValid = await form.trigger("saludMatrizLegal");
    if (isValid) {
      goToNextStep();
    }
  };

  return (
    <FormContainer step={2} totalSteps={5}>
      <FormHeader
        title="Salud de tu Matriz Legal actual"
        description="Ayúdanos a entender cómo gestionas tus requisitos legales actualmente para identificar puntos críticos de mejora."
      />
      <FormAsk
        question="¿Cómo gestionan actualmente su matriz legal?"
        number={3}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {question3Responses.map((response) => (
          <IconTextCard
            key={response.value}
            {...response}
            iconContainerStyle="square"
            containerStyle="outline"
            align="left"
            selected={gestionMatriz === response.value}
            onClick={() => setGestionMatriz(response.value)}
          />
        ))}
      </div>
      <FormError message={errors.gestionMatriz?.message} />
      <FormAsk
        question="¿Cuándo fue la última actualización integral?"
        number={4}
      />
      <SimpleSlider
        options={sliderOptions}
        value={ultimaActualizacion}
        onChange={setUltimaActualizacion}
      />
      <FormError message={errors.ultimaActualizacion?.message} />
      <FormAsk
        question="¿Se encuentran tratadas en tu matriz alguna de estas normas?"
        number={5}
        isMultipleChoice
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {question5Responses.map((response) => (
          <IconTextCard
            key={response.value}
            {...response}
            icon={<DocsIcon className="fill-text" />}
            iconContainerStyle="square"
            iconContainerClassName="bg-[#F1F5F9]"
            containerStyle="outline"
            align="left"
            selected={normasTratadas?.includes(response.value)}
            onClick={() => toggleNormaTratada(response.value)}
          />
        ))}
      </div>
      <FormError message={errors.normasTratadas?.message} />
      <div className="flex justify-between">
        <Button text="Volver" onClick={goToPrevStep} />
        <Button text="Siguiente" onClick={handleNext} />
      </div>
    </FormContainer>
  );
}
