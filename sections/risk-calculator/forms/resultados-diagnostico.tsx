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
  const { form, submitForm, goToNextStep, isSubmitting, submitError } =
    useRiskCalculator();
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
    const timeoutId = setTimeout(() => {
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
      clearTimeout(timeoutId);
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
    <div className="bg-card-background text-text flex flex-col overflow-hidden rounded-3xl shadow-lg md:flex-row">
      <div className="dark:bg-background relative flex min-h-96 flex-1 flex-col justify-between overflow-hidden bg-gray-100 p-8">
        <div className="bg-primary/20 absolute -right-26 -bottom-26 h-40 w-40 rounded-full md:-top-26 dark:bg-green-100/30" />
        <div>
          <h2 className="mb-2 text-2xl font-bold">
            Tus brechas de cumplimiento ya están identificadas.
          </h2>
          <motion.ul
            className="mt-4 flex flex-col gap-2 text-sm leading-6 text-gray-500 dark:text-gray-400"
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
                <CheckIcon className="fill-primary mr-1 inline-block h-4 w-4 dark:fill-green-700" />
                <span className="text-text text-sm">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <div className="dark:bg-card-background flex flex-col gap-4 rounded-lg bg-white p-4">
          <div className="flex items-center gap-4">
            <div className="bg-checkbox-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <AnalyticsIcon className="fill-primary h-6 w-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base font-bold">Análisis de Riesgo</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Evaluación completa de áreas críticas y normativas clave
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {/* barra de carga */}
            <div className="bg-primary/20 dark:bg-primary/30 h-2 w-full overflow-hidden rounded-full">
              <motion.div
                className="bg-primary dark:bg-primary h-full rounded-full"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: progressBarDuration,
                  delay: progressBarDelay,
                }}
              />
            </div>
            <span className="text-primary text-sm font-bold dark:text-green-700">
              {progressPercentage}% Completado
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-8">
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 text-center text-2xl font-bold">
            Estás a un paso de conocer tu nivel de exposición al riesgo legal
          </h1>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
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
              className="mt-4 mb-4 md:mb-2"
              loading={isSubmitting}
            />
            {submitError && (
              <span className="text-center text-xs text-red-500">
                {submitError}
              </span>
            )}
            <span className="text-center text-xs text-gray-500 dark:text-gray-400">
              <LockIcon className="mr-1 inline-block h-4 w-4 fill-gray-500 dark:fill-gray-400" />
              Sus datos están protegidos por nuestra política de privacidad. No
              compartiremos su información con terceros.
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
