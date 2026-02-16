import { useCallback } from "react";
import { useFormState, useWatch } from "react-hook-form";
import { useRiskCalculator } from "./useRiskCalculator";

export function useContextoOperativo() {
  const { form } = useRiskCalculator();

  const rubro = useWatch({
    control: form.control,
    name: "contextoOperativo.rubro",
    defaultValue: "",
  });
  const rubroOtro = useWatch({
    control: form.control,
    name: "contextoOperativo.rubroOtro",
    defaultValue: "",
  });
  const normasISO = useWatch({
    control: form.control,
    name: "contextoOperativo.normasISO",
    defaultValue: [],
  });
  const { errors } = useFormState({ control: form.control });

  const setRubro = useCallback(
    (value: string) => {
      form.setValue("contextoOperativo.rubro", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      if (value !== "otro") {
        form.setValue("contextoOperativo.rubroOtro", "", {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    },
    [form]
  );

  const setRubroOtro = useCallback(
    (value: string) =>
      form.setValue("contextoOperativo.rubroOtro", value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }),
    [form]
  );

  const toggleNormaISO = useCallback(
    (value: string) => {
      const current = form.getValues("contextoOperativo.normasISO");
      const newValue = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      form.setValue("contextoOperativo.normasISO", newValue, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [form]
  );

  return {
    rubro,
    rubroOtro,
    normasISO,
    setRubro,
    setRubroOtro,
    toggleNormaISO,
    errors: {
      rubro: errors.contextoOperativo?.rubro,
      rubroOtro: errors.contextoOperativo?.rubroOtro,
      normasISO: errors.contextoOperativo?.normasISO,
    },
  };
}
