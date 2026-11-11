import { type FaqItem } from "@/components/FaqAccordion";
import { SoftwareFaq } from "@/sections/software-landing";
import Link from "next/link";

const environmentAnswerStart =
  "SST se centra en la seguridad y salud de las personas. HSE (Health, Safety, Environment) y SSOMA son términos corporativos que además integran el medio ambiente. En Isolegal, la parte de seguridad y salud la gestionas en esta página y la ambiental, en ";
const environmentAnswerEnd =
  "; ambas pueden convivir en una misma matriz legal.";

export const SST_FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es un sistema de gestión SST?",
    answer:
      "Es una plataforma que permite gestionar, controlar y demostrar el cumplimiento de las obligaciones legales en seguridad y salud en el trabajo de una organización, de forma centralizada y trazable.",
  },
  {
    question: "¿Qué diferencia hay entre SST, HSE y SSOMA?",
    answer: `${environmentAnswerStart}Medio Ambiente${environmentAnswerEnd}`,
    answerContent: (
      <>
        {environmentAnswerStart}
        <Link
          href="/areas/medioambiente"
          className="text-primary underline underline-offset-4 dark:text-(--color-primary-on-dark-gray)"
        >
          Medio Ambiente
        </Link>
        {environmentAnswerEnd}
      </>
    ),
  },
  {
    question: "¿Isolegal es compatible con ISO 45001?",
    answer:
      "Sí. La plataforma organiza evidencia y requisitos alineados al estándar de gestión de seguridad y salud ocupacional ISO 45001.",
  },
  {
    question: "¿Qué empresas necesitan un sistema de gestión SST?",
    answer:
      "Empresas de minería, construcción, energía, transporte e industria, especialmente aquellas con contratistas, certificaciones ISO o exigencias de mandantes.",
  },
  {
    question:
      "¿Isolegal ayuda ante fiscalizaciones de la Dirección del Trabajo o la SEREMI de Salud?",
    answer:
      "Sí. Centraliza evidencia y trazabilidad para responder con respaldo documental ante fiscalizaciones, incluyendo las condiciones sanitarias del lugar de trabajo exigidas por el DS N°594 que fiscaliza la SEREMI de Salud.",
  },
  {
    question:
      "¿Qué es el Programa de Trabajo Preventivo y cómo se relaciona con el SG-SST?",
    answer:
      "Es el programa que la entidad empleadora debe elaborar o modificar a partir de su matriz de identificación de peligros y evaluación de riesgos, dentro de 30 días corridos desde que la matriz se confecciona o actualiza. Debe contener, al menos, las medidas preventivas y correctivas a implementar, los plazos y los responsables (DS N°44, art. 8).",
  },
  {
    question: "¿Sigue vigente el Comité Paritario bajo el DS N°44?",
    answer:
      "Sí. El DS N°44, que reemplazó al DS N°54, regula los Comités Paritarios de Higiene y Seguridad y exige que funcionen en toda empresa, faena, sucursal o agencia en que trabajen más de 25 personas (art. 23).",
  },
];

export default function SstFaq() {
  return (
    <SoftwareFaq
      id="preguntas-frecuentes-sst"
      titleId="sst-faq-title"
      title="Preguntas frecuentes sobre sistema de gestión SST"
      items={SST_FAQ_ITEMS}
    />
  );
}
