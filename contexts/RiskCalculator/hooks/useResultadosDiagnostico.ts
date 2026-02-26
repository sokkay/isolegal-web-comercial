import { useCallback } from "react";
import { useFormState, useWatch } from "react-hook-form";
import { useRiskCalculator } from "./useRiskCalculator";

export function useResultadosDiagnostico() {
  const { form } = useRiskCalculator();

  const nombreCompleto = useWatch({
    control: form.control,
    name: "resultadosDiagnostico.nombreCompleto",
    defaultValue: "",
  });
  const correoCorporativo = useWatch({
    control: form.control,
    name: "resultadosDiagnostico.correoCorporativo",
    defaultValue: "",
  });
  const empresa = useWatch({
    control: form.control,
    name: "resultadosDiagnostico.empresa",
    defaultValue: "",
  });
  const { errors } = useFormState({ control: form.control });

  const setNombreCompleto = useCallback(
    (value: string) =>
      form.setValue("resultadosDiagnostico.nombreCompleto", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  const setCorreoCorporativo = useCallback(
    (value: string) =>
      form.setValue("resultadosDiagnostico.correoCorporativo", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  const setEmpresa = useCallback(
    (value: string) =>
      form.setValue("resultadosDiagnostico.empresa", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  return {
    nombreCompleto,
    correoCorporativo,
    empresa,
    setNombreCompleto,
    setCorreoCorporativo,
    setEmpresa,
    errors: {
      nombreCompleto: errors.resultadosDiagnostico?.nombreCompleto,
      correoCorporativo: errors.resultadosDiagnostico?.correoCorporativo,
      empresa: errors.resultadosDiagnostico?.empresa,
    },
  };
}
