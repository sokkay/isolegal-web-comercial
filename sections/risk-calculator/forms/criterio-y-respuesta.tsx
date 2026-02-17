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
    {
      value: "agregar_ley_completa_item_adicional",
      label: "Agrego la nueva ley completa como un ítem adicional.",
    },
    {
      value: "actualizar_articulos_modificados",
      label:
        "Actualizo solo los artículos específicos modificados dentro del cuerpo legal original.",
    },
    {
      value: "mantener_norma_hasta_proxima_auditoria",
      label: "Mantengo la norma anterior hasta la próxima auditoría.",
    },
  ];

  const ask7Responses = [
    {
      value: "evidencia_disponible_inmediata",
      label: "Sí, disponible de forma inmediata.",
    },
    {
      value: "tomaria_tiempo_buscar_consolidar",
      label: "Me tomaría tiempo buscar y consolidar archivos/correos.",
    },
    {
      value: "sin_certeza_evidencia_vigente",
      label: "No tengo certeza de contar con toda la evidencia vigente.",
    },
  ];

  const ask8Responses = [
    {
      value: "integrados_y_evaluados",
      label: "Sí, están integrados y evaluados.",
    },
    {
      value: "solo_leyes_y_decretos_nacionales",
      label: "Solo nos enfocamos en leyes y decretos nacionales.",
    },
    {
      value: "gestion_separada_o_informal",
      label: "Se gestionan de forma separada o informal.",
    },
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
            key={response.value}
            value={response.value}
            label={response.label}
            onClick={() => setCambioNormativo(response.value)}
            selected={cambioNormativo === response.value}
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
            key={response.value}
            value={response.value}
            label={response.label}
            onClick={() => setEvidenciaTrazable(response.value)}
            selected={evidenciaTrazable === response.value}
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
            key={response.value}
            value={response.value}
            label={response.label}
            onClick={() => setCompromisosVoluntarios(response.value)}
            selected={compromisosVoluntarios === response.value}
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
