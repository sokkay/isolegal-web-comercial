"use client";

import FormError from "@/components/risk-calculator/FormError";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  useResultadosDiagnostico,
  useRiskCalculator,
} from "@/contexts/RiskCalculator";
import AnalyticsIcon from "@/public/icons/analytics.svg";
import LockIcon from "@/public/icons/lock.svg";
import type { SubmitEventHandler } from "react";

export default function ResultadosDiagnostico() {
  const { form, submitForm, goToNextStep } = useRiskCalculator();
  const {
    nombreCompleto,
    correoCorporativo,
    cargoPuesto,
    setNombreCompleto,
    setCorreoCorporativo,
    setCargoPuesto,
    errors,
  } = useResultadosDiagnostico();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isStepValid = await form.trigger("resultadosDiagnostico");
    if (!isStepValid) return;

    await submitForm();
    goToNextStep();
  };

  return (
    <div className="flex md:flex-row flex-col bg-card-background rounded-3xl text-text shadow-lg overflow-hidden">
      <div className="flex-1 p-8 justify-between flex flex-col bg-gray-100 dark:bg-background relative overflow-hidden min-h-96">
        <div className="h-40 w-40 rounded-full absolute -bottom-26 -right-26 md:-top-26  bg-primary/20 dark:bg-green-100/30" />
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Tus resultados están listos.
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hemos analizado tus respuestas y generado un perfil de riesgo legal
            personalizado para tu organización
          </p>
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
            <div className="w-full h-2 bg-primary/60 dark:bg-primary rounded-full" />
            <span className="text-sm text-primary font-bold dark:text-green-700">
              100% Completado
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold mb-2 text-center">
            ¡Diagnóstico Completado con éxito!
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Para proteger la confidencialidad de tu reporte, enviaremos el
            acceso a tu tablero de resultados a tu correo corporativo.
          </p>
        </div>
        <div>
          <form className="flex flex-col gap-2 md:gap-6" onSubmit={handleSubmit}>
            <Input
              label="Nombre Completo"
              placeholder="Juan Pérez"
              fullWidth
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />
            <FormError message={errors.nombreCompleto?.message} />
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
                label="Cargo / Puesto"
                placeholder="Jefe de Medio Ambiente"
                fullWidth
                value={cargoPuesto}
                onChange={(e) => setCargoPuesto(e.target.value)}
              />
              <FormError message={errors.cargoPuesto?.message} />
            </div>
            <Button
              text="VER MI PUNTAJE DE RIESGO"
              fullWidth
              className="mt-4 md:mb-2 mb-4"
            />
            <span className="text-xs text-center text-gray-400">
              <LockIcon className="w-4 h-4 inline-block mr-1 fill-gray-400" />
              Sus datos están protegidos por nuestra política de privacidad. No
              compartiremos tu información con terceros.
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
