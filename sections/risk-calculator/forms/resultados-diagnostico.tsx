"use client";

import FormError from "@/components/risk-calculator/FormError";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  useResultadosDiagnostico,
  useRiskCalculator,
} from "@/contexts/RiskCalculator";
import AnalyticsIcon from "@/public/icons/analytics.svg";
import CheckIcon from "@/public/icons/check.svg";
import LockIcon from "@/public/icons/lock.svg";
import { motion } from "motion/react";
import { useEffect, useState, type SubmitEventHandler } from "react";

export default function ResultadosDiagnostico() {
  const {
    form,
    submitForm,
    goToNextStep,
    goToPrevStep,
    isSubmitting,
    submitError,
  } = useRiskCalculator();
  const {
    nombreCompleto,
    correoCorporativo,
    empresa,
    setNombreCompleto,
    setCorreoCorporativo,
    setEmpresa,
    errors,
  } = useResultadosDiagnostico();

  const checklistItems = [
    "Cómo gestionas tu matriz legal",
    "Qué tan actualizada está",
    "Qué normas estás cubriendo (y cuáles no)",
    "Cómo manejas cambios legales",
    "Si tienes evidencia trazable disponible",
    "Qué tan integrados están tus compromisos",
  ];
  const checklistItemDuration = 0.35;
  const checklistItemDelay = 0.3;
  const progressBarDuration = 0.7;
  const progressBarDelay =
    checklistItemDuration +
    checklistItemDelay * (checklistItems.length - 1) +
    0.2;
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    let animationFrameId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const durationMs = progressBarDuration * 1000;

      const updateProgress = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const nextValue = Math.min(
          100,
          Math.round((elapsed / durationMs) * 100)
        );

        setProgressPercentage(nextValue);

        if (elapsed < durationMs) {
          animationFrameId = requestAnimationFrame(updateProgress);
        }
      };

      animationFrameId = requestAnimationFrame(updateProgress);
    }, progressBarDelay * 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [progressBarDelay, progressBarDuration]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isStepValid = await form.trigger("resultadosDiagnostico");
    if (!isStepValid) return;

    try {
      await submitForm();
      goToNextStep();
    } catch {
      // El mensaje de error se expone desde el contexto.
    }
  };

  return (
    <div className="flex md:flex-row flex-col bg-card-background rounded-3xl text-text shadow-lg overflow-hidden">
      <div className="flex-1 p-8 justify-between flex flex-col bg-gray-100 dark:bg-background relative overflow-hidden min-h-96">
        <div className="h-40 w-40 rounded-full absolute -bottom-26 -right-26 md:-top-26  bg-primary/20 dark:bg-green-100/30" />
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Tus brechas de cumplimiento ya están identificadas.
          </h2>
          <motion.ul
            className="mt-4 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 leading-6"
            initial="hidden"
            animate="visible"
          >
            {checklistItems.map((item, index) => (
              <motion.li
                key={item}
                className="flex items-center gap-2"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: checklistItemDuration,
                  delay: index * checklistItemDelay,
                }}
              >
                <CheckIcon className="w-4 h-4 inline-block mr-1 fill-primary dark:fill-green-700" />
                <span className="text-sm text-text">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="bg-white dark:bg-card-background rounded-lg p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4 ">
            <div className="w-10 h-10 flex items-center justify-center bg-checkbox-bg rounded-full shrink-0">
              <AnalyticsIcon className="w-6 h-6 fill-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base font-bold">Análisis de Riesgo</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Evaluación completa de áreas críticas y normativas clave
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {/* barra de carga */}
            <div className="w-full h-2 bg-primary/20 dark:bg-primary/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary dark:bg-primary rounded-full"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: progressBarDuration,
                  delay: progressBarDelay,
                }}
              />
            </div>
            <span className="text-sm text-primary font-bold dark:text-green-700">
              {progressPercentage}% Completado
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold mb-2 text-center">
            Estás a un paso de conocer tu nivel de exposición al riesgo legal
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Recibe tu diagnóstico completo y visualiza tu nivel de riesgo en
            segundos
          </p>
        </div>
        <div>
          {/* <Button
            text="Volver atrás (temporal)"
            variant="outline"
            className="mb-4"
            onClick={goToPrevStep}
          /> */}
          <form
            className="flex flex-col gap-2 md:gap-6"
            onSubmit={handleSubmit}
          >
            <div>
              <Input
                label="Nombre Completo"
                placeholder="Juan Pérez"
                fullWidth
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
              />
              <FormError message={errors.nombreCompleto?.message} />
            </div>
            <div>
              <Input
                label="Correo Corporativo"
                placeholder="ejemplo@correo.com"
                fullWidth
                type="email"
                value={correoCorporativo}
                onChange={(e) => setCorreoCorporativo(e.target.value)}
              />
              <FormError message={errors.correoCorporativo?.message} />
            </div>
            <div>
              <Input
                label="Empresa"
                placeholder=""
                fullWidth
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              />
              <FormError message={errors.empresa?.message} />
            </div>
            <Button
              text="Desbloquear resultado"
              fullWidth
              className="mt-4 md:mb-2 mb-4"
              loading={isSubmitting}
            />
            {submitError && (
              <span className="text-xs text-center text-red-500">
                {submitError}
              </span>
            )}
            <span className="text-xs text-center text-gray-500 dark:text-gray-400">
              <LockIcon className="w-4 h-4 inline-block mr-1 fill-gray-500 dark:fill-gray-400" />
              Sus datos están protegidos por nuestra política de privacidad. No
              compartiremos su información con terceros.
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
