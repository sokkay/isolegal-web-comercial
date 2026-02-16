"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  riskCalculatorSchema,
  type RiskCalculatorFormData,
} from "@/contexts/RiskCalculator/schemas/riskCalculator.schema";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
export type {
  ContextoOperativoFormData,
  SaludMatrizLegalFormData,
  RiskCalculatorFormData,
} from "@/contexts/RiskCalculator/schemas/riskCalculator.schema";

export type RiskCalculatorContextType = {
  form: UseFormReturn<RiskCalculatorFormData>;
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (step: number) => void;
  submitForm: () => Promise<void>;
};

export const RiskCalculatorContext = createContext<
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
      saludMatrizLegal: {
        gestionMatriz: initialData?.saludMatrizLegal?.gestionMatriz || "",
        ultimaActualizacion:
          initialData?.saludMatrizLegal?.ultimaActualizacion || "",
        normasTratadas:
          initialData?.saludMatrizLegal?.normasTratadas || [],
      },
    },
    mode: "onChange",
  });

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step <= totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  const submitForm = useCallback(async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      await onSubmit?.(data);
    }
  }, [form, onSubmit]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("riskCalculatorData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const contextValue = useMemo(
    () => ({
      form,
      currentStep,
      totalSteps,
      goToNextStep,
      goToPrevStep,
      goToStep,
      submitForm,
    }),
    [
      form,
      currentStep,
      totalSteps,
      goToNextStep,
      goToPrevStep,
      goToStep,
      submitForm,
    ]
  );

  return (
    <RiskCalculatorContext.Provider value={contextValue}>
      {children}
    </RiskCalculatorContext.Provider>
  );
}
