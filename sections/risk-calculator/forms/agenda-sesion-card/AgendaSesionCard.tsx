"use client";

import { CalendarPanel } from "./components/CalendarPanel";
import { SlotsPanel } from "./components/SlotsPanel";
import {
  AgendaSesionCardStateProvider,
  useAgendaSesionCardContext,
} from "./context/AgendaSesionCardContext";
import type { AgendaSesionCardProps } from "./types";

function AgendaSesionCardContent() {
  const { hasRequiredClientData } = useAgendaSesionCardContext();

  return (
    <div className="mt-4 rounded-2xl border border-gray-200 bg-background p-4 dark:border-gray-800 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-text">Reserva sesión estratégica</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Elige una fecha activa y luego un bloque horario disponible.
          </p>
        </div>
      </div>

      {!hasRequiredClientData && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-700/70 dark:bg-amber-900/20 dark:text-amber-300">
          Completa nombre, correo y cargo para habilitar la reserva.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.15fr]">
        <CalendarPanel />
        <SlotsPanel />
      </div>
    </div>
  );
}

export default function AgendaSesionCard(props: AgendaSesionCardProps) {
  return (
    <AgendaSesionCardStateProvider {...props}>
      <AgendaSesionCardContent />
    </AgendaSesionCardStateProvider>
  );
}
