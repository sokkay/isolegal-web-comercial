import { type FaqItem } from "@/components/FaqAccordion";
import { SoftwareFaq } from "@/sections/software-landing";

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
    <SoftwareFaq
      id="preguntas-frecuentes-sst"
      titleId="sst-faq-title"
      title="Preguntas frecuentes sobre gestión SST"
      items={SST_FAQ_ITEMS}
    />
  );
}
