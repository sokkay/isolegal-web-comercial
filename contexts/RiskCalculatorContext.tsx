"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema para el formulario de Contexto Operativo
const contextoOperativoSchema = z
  .object({
    rubro: z.string().min(1, "Debes seleccionar un rubro"),
    rubroOtro: z.string().optional(),
    normasISO: z
      .array(z.string())
      .min(1, "Debes seleccionar al menos una norma"),
  })
  .refine(
    (data) => {
      // Si seleccionó "otro", debe llenar el campo rubroOtro
      if (data.rubro === "otro") {
        return data.rubroOtro && data.rubroOtro.trim().length > 0;
      }
      return true;
    },
    {
      message: "Debes especificar el rubro",
      path: ["rubroOtro"],
    }
  );

// Schema completo del calculador de riesgo (expandible para más formularios)
const riskCalculatorSchema = z.object({
  contextoOperativo: contextoOperativoSchema,
  // Aquí se agregarán más schemas para otros pasos
});

export type ContextoOperativoFormData = z.infer<
  typeof contextoOperativoSchema
>;
export type RiskCalculatorFormData = z.infer<typeof riskCalculatorSchema>;

type RiskCalculatorContextType = {
  form: UseFormReturn<RiskCalculatorFormData>;
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (step: number) => void;
  submitForm: () => Promise<void>;
};

const RiskCalculatorContext = createContext<
  RiskCalculatorContextType | undefined
>(undefined);

type RiskCalculatorProviderProps = {
  children: ReactNode;
  initialData?: Partial<RiskCalculatorFormData>;
  onSubmit?: (data: RiskCalculatorFormData) => void | Promise<void>;
};

export function RiskCalculatorProvider({
  children,
  initialData,
  onSubmit,
}: RiskCalculatorProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const form = useForm<RiskCalculatorFormData>({
    resolver: zodResolver(riskCalculatorSchema),
    defaultValues: {
      contextoOperativo: {
        rubro: initialData?.contextoOperativo?.rubro || "",
        rubroOtro: initialData?.contextoOperativo?.rubroOtro || "",
        normasISO: initialData?.contextoOperativo?.normasISO || [],
      },
    },
    mode: "onChange",
  });

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const submitForm = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      await onSubmit?.(data);
    }
  };

  // Guardar en localStorage cuando cambian los valores
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("riskCalculatorData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <RiskCalculatorContext.Provider
      value={{
        form,
        currentStep,
        totalSteps,
        goToNextStep,
        goToPrevStep,
        goToStep,
        submitForm,
      }}
    >
      {children}
    </RiskCalculatorContext.Provider>
  );
}

export function useRiskCalculator() {
  const context = useContext(RiskCalculatorContext);
  if (!context) {
    throw new Error(
      "useRiskCalculator debe ser usado dentro de RiskCalculatorProvider"
    );
  }
  return context;
}

// Hook específico para el formulario de Contexto Operativo
export function useContextoOperativo() {
  const { form } = useRiskCalculator();
  return {
    rubro: form.watch("contextoOperativo.rubro"),
    rubroOtro: form.watch("contextoOperativo.rubroOtro"),
    normasISO: form.watch("contextoOperativo.normasISO"),
    setRubro: (value: string) => {
      form.setValue("contextoOperativo.rubro", value, {
        shouldValidate: true,
      });
      // Limpiar rubroOtro si no es "otro"
      if (value !== "otro") {
        form.setValue("contextoOperativo.rubroOtro", "", {
          shouldValidate: true,
        });
      }
    },
    setRubroOtro: (value: string) =>
      form.setValue("contextoOperativo.rubroOtro", value, {
        shouldValidate: true,
      }),
    toggleNormaISO: (value: string) => {
      const current = form.getValues("contextoOperativo.normasISO");
      const newValue = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      form.setValue("contextoOperativo.normasISO", newValue, {
        shouldValidate: true,
      });
    },
    errors: {
      rubro: form.formState.errors.contextoOperativo?.rubro,
      rubroOtro: form.formState.errors.contextoOperativo?.rubroOtro,
      normasISO: form.formState.errors.contextoOperativo?.normasISO,
    },
  };
}
