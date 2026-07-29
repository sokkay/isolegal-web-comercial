import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

export const SST_FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es un sistema de gestión SST?",
    answer:
      "Es una plataforma que permite gestionar, controlar y demostrar el cumplimiento de las obligaciones legales en seguridad y salud en el trabajo de una organización, de forma centralizada y trazable.",
  },
  {
    question: "¿Qué diferencia hay entre SST, HSE y SSOMA?",
    answer:
      "Son enfoques equivalentes: SST se centra en seguridad y salud laboral, HSE (Health, Safety, Environment) y SSOMA integran además la gestión ambiental. Isolegal gestiona los tres bajo una misma plataforma.",
  },
  {
    question: "¿Isolegal es compatible con ISO 45001 e ISO 14001?",
    answer:
      "Sí. La plataforma organiza evidencia y requisitos alineados a los estándares de gestión de seguridad y salud ocupacional ISO 45001 y de gestión ambiental ISO 14001.",
  },
  {
    question: "¿Cómo gestiona Isolegal el cumplimiento ambiental (RCA, DS 40)?",
    answer:
      "Incorpora la normativa ambiental aplicable, incluyendo RCA y exigencias de la Superintendencia del Medio Ambiente, dentro de la misma matriz legal.",
  },
  {
    question: "¿Qué empresas necesitan un sistema de gestión SST?",
    answer:
      "Empresas de minería, construcción, energía, transporte e industria, especialmente aquellas con contratistas, certificaciones ISO o exigencias de mandantes.",
  },
  {
    question:
      "¿Isolegal ayuda ante fiscalizaciones de la Dirección del Trabajo, la SEREMI de Salud o la SMA?",
    answer:
      "Sí. Centraliza evidencia y trazabilidad para responder con respaldo documental ante fiscalizaciones, incluyendo las condiciones sanitarias del lugar de trabajo exigidas por el DS N°594 que fiscaliza la SEREMI de Salud.",
  },
];

export default function SstFaq() {
  return (
    <section
      id="preguntas-frecuentes-sst"
      aria-labelledby="sst-faq-title"
      className="bg-background relative isolate overflow-hidden py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-60 dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(138, 43, 226, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(138, 43, 226, 0.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden opacity-70 dark:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(192, 132, 252, 0.34) 1px, transparent 1px), linear-gradient(to bottom, rgba(192, 132, 252, 0.34) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_10%,var(--color-background)_78%)]"
      />

      <div className="container mx-auto">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span
              aria-hidden="true"
              className="bg-primary mx-auto mb-5 block size-9 mask-[url('/icons/psychiatry.svg')] mask-contain mask-center mask-no-repeat dark:bg-(--color-primary-on-dark-gray)"
            />
            <p className="text-primary mb-3 text-sm font-bold tracking-[0.18em] uppercase dark:text-(--color-primary-on-dark-gray)">
              Resolvemos tus dudas
            </p>
            <h2
              id="sst-faq-title"
              className="text-text text-3xl font-extrabold sm:text-4xl"
            >
              Preguntas frecuentes sobre gestión SST
            </h2>
          </div>
          <FaqAccordion
            items={SST_FAQ_ITEMS}
            useThemeAccent
            className="bg-card-background rounded-2xl px-5 shadow-lg shadow-black/5 sm:px-8"
          />
        </div>
      </div>
    </section>
  );
}
