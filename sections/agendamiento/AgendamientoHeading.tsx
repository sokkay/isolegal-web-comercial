"use client";

import Button from "@/components/ui/Button";
import type { ContactFormData } from "@/lib/schemas/contactForm";
import HeadingSection from "@/sections/heading";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type ContactSnapshot = {
  name: string;
  email: string;
  company: string;
};

const MODAL_TRANSITION_MS = 200;

export default function AgendamientoHeading() {
  const router = useRouter();
  const [contactSnapshot, setContactSnapshot] = useState<ContactSnapshot | null>(
    null,
  );
  const [isModalMounted, setIsModalMounted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleContactSuccess = useCallback((data: ContactFormData) => {
    setContactSnapshot({
      name: data.firstname,
      email: data.email,
      company: data.company,
    });
    setErrorMessage(null);
    setIsModalMounted(true);
  }, []);

  useEffect(() => {
    if (!isModalMounted) {
      setIsModalVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => setIsModalVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [isModalMounted]);

  const closeModal = useCallback(() => {
    if (isCreatingToken) return;
    setIsModalVisible(false);
    const timeout = setTimeout(() => {
      setIsModalMounted(false);
      setContactSnapshot(null);
      setErrorMessage(null);
    }, MODAL_TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [isCreatingToken]);

  useEffect(() => {
    if (!isModalMounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isModalMounted, closeModal]);

  const handleConfirm = useCallback(async () => {
    if (!contactSnapshot) return;
    setIsCreatingToken(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/scheduleMeeting/create-from-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactSnapshot),
      });
      const result = (await response.json()) as {
        error?: string;
        bookingUrl?: string;
      };

      if (!response.ok || !result.bookingUrl) {
        throw new Error(
          result.error ?? "No se pudo generar el link de agendamiento",
        );
      }

      router.push(result.bookingUrl);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo generar el link de agendamiento",
      );
      setIsCreatingToken(false);
    }
  }, [contactSnapshot, router]);

  return (
    <>
      <HeadingSection onContactSuccess={handleContactSuccess} />

      {isModalMounted && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] transition-opacity duration-200",
            isModalVisible
              ? "bg-black/50 opacity-100 pointer-events-auto"
              : "bg-black/0 opacity-0 pointer-events-none",
          )}
          onClick={closeModal}
          role="presentation"
        >
          <div
            className={cn(
              "w-full max-w-lg bg-card-background dark:bg-surface-tonal-a10 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-200",
              isModalVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-2",
            )}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="agendamiento-prompt-title"
          >
            <div className="flex items-start justify-between gap-4">
              <h3
                id="agendamiento-prompt-title"
                className="text-xl font-bold text-text dark:text-white"
              >
                ¿Deseas agendar una sesión inmediatamente?
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-text-muted dark:text-neutral-300 hover:text-text dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Cerrar"
                disabled={isCreatingToken}
              >
                ✕
              </button>
            </div>
            <p className="mt-4 text-text-muted dark:text-neutral-300 leading-relaxed">
              Recibimos tu mensaje. Si lo prefieres, puedes reservar ahora mismo
              un horario para tu sesión estratégica.
            </p>

            {errorMessage && (
              <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-700/60 dark:bg-rose-900/20 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                text="No por ahora"
                variant="outline"
                onClick={closeModal}
                disabled={isCreatingToken}
              />
              <Button
                text="Sí, agendar ahora"
                onClick={handleConfirm}
                loading={isCreatingToken}
                disabled={isCreatingToken}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
