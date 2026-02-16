import { useCallback } from "react";
import { useFormState, useWatch } from "react-hook-form";
import { useRiskCalculator } from "./useRiskCalculator";

export function useCriterioYRespuesta() {
  const { form } = useRiskCalculator();

  const cambioNormativo = useWatch({
    control: form.control,
    name: "criterioYRespuesta.cambioNormativo",
    defaultValue: "",
  });
  const evidenciaTrazable = useWatch({
    control: form.control,
    name: "criterioYRespuesta.evidenciaTrazable",
    defaultValue: "",
  });
  const compromisosVoluntarios = useWatch({
    control: form.control,
    name: "criterioYRespuesta.compromisosVoluntarios",
    defaultValue: "",
  });
  const { errors } = useFormState({ control: form.control });

  const setCambioNormativo = useCallback(
    (value: string) =>
      form.setValue("criterioYRespuesta.cambioNormativo", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  const setEvidenciaTrazable = useCallback(
    (value: string) =>
      form.setValue("criterioYRespuesta.evidenciaTrazable", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  const setCompromisosVoluntarios = useCallback(
    (value: string) =>
      form.setValue("criterioYRespuesta.compromisosVoluntarios", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  return {
    cambioNormativo,
    evidenciaTrazable,
    compromisosVoluntarios,
    setCambioNormativo,
    setEvidenciaTrazable,
    setCompromisosVoluntarios,
    errors: {
      cambioNormativo: errors.criterioYRespuesta?.cambioNormativo,
      evidenciaTrazable: errors.criterioYRespuesta?.evidenciaTrazable,
      compromisosVoluntarios: errors.criterioYRespuesta?.compromisosVoluntarios,
    },
  };
}
