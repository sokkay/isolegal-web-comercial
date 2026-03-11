"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import AgendaSesionCard from "@/sections/risk-calculator/forms/agenda-sesion-card";
import { Suspense, useEffect } from "react";

type BookingContextPayload = {
  bookingToken: string;
  submissionId: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  expiresAt?: string;
};

function AgendarSesionPublicaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [router, token]);

  const bookingContextQuery = useQuery({
    queryKey: ["riskCalculator", "bookingLink", token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await fetch(
        `/api/riskCalculator/booking-link?token=${encodeURIComponent(token)}`,
      );
      const payload = (await response.json()) as
        | { error?: string; bookingContext?: BookingContextPayload }
        | undefined;

      if (!response.ok || !payload?.bookingContext) {
        throw new Error(payload?.error ?? "No se pudo validar el link");
      }

      return payload.bookingContext;
    },
  });

  const isLoading = bookingContextQuery.isPending;
  const error =
    bookingContextQuery.error instanceof Error ? bookingContextQuery.error.message : null;
  const bookingContext = bookingContextQuery.data ?? null;

  if (!token) {
    return null;
  }

  return (
    <div className="container mx-auto py-16">
      <div className="rounded-3xl bg-card-background px-4 py-8 text-text shadow-lg md:px-8">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Agenda tu sesión estratégica</h1>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Selecciona un día activo y luego el bloque horario que prefieras para
            reservar tu reunión.
          </p>
        </div>

        {isLoading && (
          <div className="rounded-lg border border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
            Validando link de agendamiento...
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-700/60 dark:bg-rose-900/20 dark:text-rose-300">
            {error}
          </div>
        )}

        {!isLoading && !error && bookingContext && (
          <AgendaSesionCard
            bookingToken={bookingContext.bookingToken}
            submissionId={bookingContext.submissionId}
            clientName={bookingContext.clientName}
            clientEmail={bookingContext.clientEmail}
            clientCompany={bookingContext.clientCompany}
          />
        )}
      </div>
    </div>
  );
}

export default function AgendarSesionPublicaPage() {
  return (
    <Suspense>
      <AgendarSesionPublicaContent />
    </Suspense>
  );
}
