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
  CriterioYRespuestaFormData,
  ResultadosDiagnosticoFormData,
  RiskCalculatorFormData,
} from "@/contexts/RiskCalculator/schemas/riskCalculator.schema";

export type RiskCalculatorContextType = {
  form: UseFormReturn<RiskCalculatorFormData>;
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitError: string | null;
  calculationResult: RiskCalculationResult | null;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (step: number) => void;
  submitForm: () => Promise<void>;
};

export type RiskCalculationResult = {
  score: number;
  riskLevel: "bajo" | "alto" | "critico";
  submissionId?: string;
};

export const RiskCalculatorContext = createContext<
  RiskCalculatorContextType | undefined
>(undefined);

type RiskCalculatorProviderProps = {
  children: ReactNode;
  initialData?: Partial<RiskCalculatorFormData>;
};

export function RiskCalculatorProvider({
  children,
  initialData,
}: RiskCalculatorProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] =
    useState<RiskCalculationResult | null>(null);
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
      criterioYRespuesta: {
        cambioNormativo:
          initialData?.criterioYRespuesta?.cambioNormativo || "",
        evidenciaTrazable:
          initialData?.criterioYRespuesta?.evidenciaTrazable || "",
        compromisosVoluntarios:
          initialData?.criterioYRespuesta?.compromisosVoluntarios || "",
      },
      resultadosDiagnostico: {
        nombreCompleto:
          initialData?.resultadosDiagnostico?.nombreCompleto || "",
        correoCorporativo:
          initialData?.resultadosDiagnostico?.correoCorporativo || "",
        cargoPuesto: initialData?.resultadosDiagnostico?.cargoPuesto || "",
      },
    },
    mode: "onChange",
  });

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, totalSteps]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (!isValid) return;

    const data = form.getValues();

    setIsSubmitting(true);
    setSubmitError(null);
    setCalculationResult(null);

    try {
      const response = await fetch("/api/submitRiskCalculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "No se pudo calcular el diagnóstico");
      }

      setCalculationResult(result.data as RiskCalculationResult);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No se pudo enviar el formulario";
      setSubmitError(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [form]);

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
      isSubmitting,
      submitError,
      calculationResult,
      goToNextStep,
      goToPrevStep,
      goToStep,
      submitForm,
    }),
    [
      form,
      currentStep,
      totalSteps,
      isSubmitting,
      submitError,
      calculationResult,
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
