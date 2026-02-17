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
} from "@/contexts/RiskCalculator";
import DnsIcon from "@/public/icons/dns.svg";
import DocsIcon from "@/public/icons/docs.svg";
import TableViewIcon from "@/public/icons/table-view.svg";

const sliderOptions = [
  { value: "menos_3_meses", label: "Hace menos de 3 meses." },
  { value: "entre_3_y_6_meses", label: "Entre 3 y 6 meses." },
  {
    value: "mas_6_meses_o_no_seguro",
    label: "Más de 6 meses o no estoy seguro.",
  },
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
      value: "planilla_excel_control_manual",
      title: "Planilla Excel (Control manual).",
      icon: <TableViewIcon className="fill-[#15803D] dark:fill-white" />,
      iconContainerClassName: "bg-[#DCFCE7]",
    },
    {
      value: "software_especializado_plataforma_legal",
      title: "Software especializado / Plataforma legal.",
      icon: <DnsIcon className="fill-[#1D4ED8] dark:fill-white" />,
      iconContainerClassName: "bg-[#DBEAFE]",
    },
    {
      value: "sin_matriz_estructurada",
      title: "No contamos con una matriz estructurada todavía.",
      icon: <DocsIcon className="fill-[#9A3412] dark:fill-white" />,
      iconContainerClassName: "bg-[#FFEDD5]",
    },
  ];

  const question5Responses = [
    {
      value: "ds_369",
      title: "DS N° 369",
      description: "Reglamento de Extintores",
    },
    {
      value: "ds_40",
      title: "DS N° 40",
      description: "Prevención de Riesgos Profesionales",
    },
    {
      value: "ds_594",
      title: "DS N° 594",
      description: "Condiciones Sanitarias y Ambientales",
    },
    {
      value: "ds_148",
      title: "DS N° 148",
      description: "Residuos Peligrosos",
    },
    {
      value: "ninguna",
      title: "No estoy seguro / Ninguna de las anteriores.",
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
        question="¿Cómo se gestiona actualmente tu matriz legal?"
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
        question="¿Cuándo fue la última actualización real de los requisitos de tu matriz?"
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
