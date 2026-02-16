 "use client";

import FormAsk from "@/components/risk-calculator/FormAsk";
import FormContainer from "@/components/risk-calculator/FormContainer";
import FormError from "@/components/risk-calculator/FormError";
import FormHeader from "@/components/risk-calculator/FormHeader";
import SimpleTextResponse from "@/components/risk-calculator/SimpleTextResponse";
import Button from "@/components/ui/Button";
import {
  useCriterioYRespuesta,
  useRiskCalculator,
} from "@/contexts/RiskCalculator";

export default function CriterioYRespuesta() {
  const { goToNextStep, goToPrevStep, form } = useRiskCalculator();
  const {
    cambioNormativo,
    evidenciaTrazable,
    compromisosVoluntarios,
    setCambioNormativo,
    setEvidenciaTrazable,
    setCompromisosVoluntarios,
    errors,
  } = useCriterioYRespuesta();

  const ask6Responses = [
    "Agrego la nueva ley completa como un ítem adicional.",
    "Actualizo solo los artículos específicos modificados dentro del cuerpo legal original.",
    "Mantengo la norma anterior hasta la próxima auditoría.",
  ];

  const ask7Responses = [
    "Sí, disponible de forma inmediata.",
    "Me tomaría tiempo buscar y consolidar archivos/correos.",
    "No tengo certeza de contar con toda la evidencia vigente.",
  ];

  const ask8Responses = [
    "Sí, están integrados y evaluados.",
    "Solo nos enfoccamos en leyes y decretos nacionales.",
    "Se gestionan de forma separada o informal.",
  ];

  const handleNext = async () => {
    const isValid = await form.trigger("criterioYRespuesta");
    if (isValid) {
      goToNextStep();
    }
  };

  return (
    <FormContainer step={3} totalSteps={5}>
      <FormHeader
        title="Criterio y Respuesta"
        description="Defina cómo su organización gestiona la trazabilidad de requisitos legales y los compromisos voluntarios asumidos."
      />
      <FormAsk
        question="Ante una ley que modifica el Código del Trabajo (ej. Ley de 40 Horas). ¿Cómo actúas?"
        number={6}
      />
      <div className="flex flex-col gap-6">
        {ask6Responses.map((response) => (
          <SimpleTextResponse
            key={response}
            value={response}
            onClick={() => setCambioNormativo(response)}
            selected={cambioNormativo === response}
          />
        ))}
      </div>
      <FormError message={errors.cambioNormativo?.message} />
      <FormAsk
        question="Si una fiscalización (SMA, SEREMI o DT) comenzara en 10 minutos, ¿tienes evidencia trazable de cumplimiento de cada artículo?"
        number={7}
      />
      <div className="flex flex-col gap-6">
        {ask7Responses.map((response) => (
          <SimpleTextResponse
            key={response}
            value={response}
            onClick={() => setEvidenciaTrazable(response)}
            selected={evidenciaTrazable === response}
          />
        ))}
      </div>
      <FormError message={errors.evidenciaTrazable?.message} />
      <FormAsk
        question="¿Tu matriz incluye compromisos voluntarios, RCA o exigencias contractuales de mandantes?"
        number={8}
      />
      <div className="flex flex-col gap-6">
        {ask8Responses.map((response) => (
          <SimpleTextResponse
            key={response}
            value={response}
            onClick={() => setCompromisosVoluntarios(response)}
            selected={compromisosVoluntarios === response}
          />
        ))}
      </div>
      <FormError message={errors.compromisosVoluntarios?.message} />
      <div className="flex justify-between">
        <Button text="Volver" onClick={goToPrevStep} />
        <Button text="Siguiente" onClick={handleNext} />
      </div>
    </FormContainer>
  );
}
