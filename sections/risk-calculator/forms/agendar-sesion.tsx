"use client";

import Button from "@/components/ui/Button";
import {
  useResultadosDiagnostico,
  useRiskCalculator,
} from "@/contexts/RiskCalculator";
import AgendaSesionCard from "@/sections/risk-calculator/forms/agenda-sesion-card";

export default function AgendarSesion() {
  const { calculationResult, goToPrevStep } = useRiskCalculator();
  const { nombreCompleto, correoCorporativo, empresa } =
    useResultadosDiagnostico();

  return (
    <div className="rounded-3xl bg-card-background px-4 py-8 text-text shadow-lg md:px-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Agenda tu sesión estratégica</h1>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Selecciona un día activo y luego el bloque horario que prefieras para
          reservar tu reunión.
        </p>
      </div>

      <AgendaSesionCard
        clientName={nombreCompleto}
        clientEmail={correoCorporativo}
        clientCompany={empresa}
        submissionId={calculationResult?.submissionId}
      />

      <div className="mt-6">
        <Button
          text="Volver al diagnóstico"
          variant="outline"
          onClick={goToPrevStep}
        />
      </div>
    </div>
  );
}
