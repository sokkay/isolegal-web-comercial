import { useCallback } from "react";
import { useFormState, useWatch } from "react-hook-form";
import { useRiskCalculator } from "./useRiskCalculator";

export function useSaludMatrizLegal() {
  const { form } = useRiskCalculator();

  const gestionMatriz = useWatch({
    control: form.control,
    name: "saludMatrizLegal.gestionMatriz",
    defaultValue: "",
  });
  const ultimaActualizacion = useWatch({
    control: form.control,
    name: "saludMatrizLegal.ultimaActualizacion",
    defaultValue: "",
  });
  const normasTratadas = useWatch({
    control: form.control,
    name: "saludMatrizLegal.normasTratadas",
    defaultValue: [],
  });
  const { errors } = useFormState({ control: form.control });

  const setGestionMatriz = useCallback(
    (value: string) =>
      form.setValue("saludMatrizLegal.gestionMatriz", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  const setUltimaActualizacion = useCallback(
    (value: string) =>
      form.setValue("saludMatrizLegal.ultimaActualizacion", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  const toggleNormaTratada = useCallback(
    (value: string) => {
      const current = form.getValues("saludMatrizLegal.normasTratadas");
      if (value === "ninguna") {
        form.setValue("saludMatrizLegal.normasTratadas", ["ninguna"], {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
        return;
      }

      const filtered = current.filter((v) => v !== "ninguna");
      const newValue = filtered.includes(value)
        ? filtered.filter((v) => v !== value)
        : [...filtered, value];
      form.setValue("saludMatrizLegal.normasTratadas", newValue, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [form]
  );

  return {
    gestionMatriz,
    ultimaActualizacion,
    normasTratadas,
    setGestionMatriz,
    setUltimaActualizacion,
    toggleNormaTratada,
    errors: {
      gestionMatriz: errors.saludMatrizLegal?.gestionMatriz,
      ultimaActualizacion: errors.saludMatrizLegal?.ultimaActualizacion,
      normasTratadas: errors.saludMatrizLegal?.normasTratadas,
    },
  };
}
