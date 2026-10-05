import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

export const HOME_FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es un software de compliance o cumplimiento normativo?",
    answer:
      "Es una plataforma que permite gestionar obligaciones legales, evidencias, auditorías y riesgos regulatorios de manera centralizada y trazable.",
  },
  {
    question: "¿Qué empresas necesitan un sistema de compliance?",
    answer:
      "Empresas de minería, construcción, energía, industria, transporte y organizaciones sometidas a auditorías, fiscalizaciones o certificaciones ISO.",
  },
  {
    question: "¿Cómo ayuda Isolegal en auditorías?",
    answer:
      "Centraliza evidencia, genera trazabilidad y permite demostrar cumplimiento normativo en tiempo real frente a auditorías internas, externas o fiscalizaciones.",
  },
  {
    question: "¿La plataforma utiliza inteligencia artificial?",
    answer:
      "Sí. Isolegal incorpora IA para interpretar requisitos legales y validar evidencia antes de auditorías. Es una herramienta entrenada por nuestros abogados expertos.",
  },
  {
    question:
      "¿Se puede gestionar cumplimiento ambiental, laboral, SST y de eficiencia energética?",
    answer:
      "Sí. La plataforma permite administrar requisitos ambientales, laborales, de seguridad y salud en el trabajo (SST), eficiencia energética y exigencias de mandantes, adaptados a los distintos rubros de cada organización.",
  },
];

export default function HomeFaqSection() {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="home-faq-title"
      className="bg-background relative isolate overflow-hidden py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-60 dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(30, 94, 61, 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 94, 61, 0.16) 1px, transparent 1px)",
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
            "linear-gradient(to right, rgba(134, 239, 172, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(134, 239, 172, 0.3) 1px, transparent 1px)",
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
          <div className="mb-8 text-center sm:mb-10">
            <span
              aria-hidden="true"
              className="bg-primary mx-auto mb-5 block size-9 [mask-image:url('/icons/psychiatry.svg')] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] dark:bg-green-300"
            />
            <p className="text-primary mb-3 text-sm font-bold tracking-widest uppercase dark:text-green-300">
              Resolvemos tus dudas
            </p>
            <h2
              id="home-faq-title"
              className="text-text text-3xl font-bold sm:text-4xl"
            >
              Preguntas frecuentes
            </h2>
            <p className="text-text/75 mx-auto mt-4 max-w-2xl text-base leading-7">
              Conoce cómo Isolegal simplifica la gestión del cumplimiento
              normativo de tu organización.
            </p>
          </div>

          <FaqAccordion
            items={HOME_FAQ_ITEMS}
            className="bg-card-background/90 rounded-2xl px-5 shadow-md shadow-black/5 backdrop-blur-sm sm:px-8"
          />
        </div>
      </div>
    </section>
  );
}
