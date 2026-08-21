import FloatingActionButton from "@/components/FloatingActionButton";
import IsolegalRoi from "@/sections/isolegal-roi";
import {
  RESSO_COMPARISON,
  RESSO_CONSEQUENCES,
  RESSO_FAQ_ITEMS,
  RESSO_METRICS,
  RESSO_REQUIREMENTS,
  RESSO_STEPS,
  RESSO_TESTIMONIAL,
} from "@/sections/resso-landing";
import {
  SoftwareComparison,
  SoftwareConsequences,
  SoftwareFaq,
  SoftwareHero,
  SoftwareIntro,
  SoftwareRequirements,
  SoftwareRiskCta,
  SoftwareSteps,
  SoftwareTestimonial,
  createFaqStructuredData,
} from "@/sections/software-landing";
import type { Metadata } from "next";

const SITE_URL = "https://isolegal.cl";
const PAGE_PATH = "/software/resso";

export const metadata: Metadata = {
  title: {
    absolute: "Plataforma RESSO para Contratistas de Codelco | Isolegal",
  },
  description:
    "Plataforma RESSO para contratistas y subcontratistas de Codelco. Centraliza matriz legal, evidencia, vencimientos y reportes de cumplimiento.",
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "plataforma RESSO",
    "software RESSO",
    "RESSO Codelco",
    "contratistas Codelco",
    "matriz legal RESSO",
    "SIGO",
    "Ley 16.744",
    "DS 76",
    "DS 44",
    "seguridad y salud ocupacional minería",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Isolegal",
    title: "Plataforma RESSO para Contratistas de Codelco | Isolegal",
    description:
      "Centraliza tu matriz legal RESSO, evidencia auditable y alertas normativas en una sola plataforma.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plataforma RESSO para Contratistas de Codelco | Isolegal",
    description:
      "Gestiona tu matriz RESSO, evidencia y vencimientos en una sola plataforma.",
    images: ["/images/og-image.png"],
  },
};

const faqStructuredData = createFaqStructuredData(RESSO_FAQ_ITEMS);

export default function SoftwareRessoPage() {
  return (
    <main className="bg-background min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SoftwareHero
        eyebrow="RESSO · SIGO · Codelco"
        title="Plataforma de Gestión RESSO para Contratistas de Codelco"
        description="Isolegal centraliza tu matriz legal RESSO, evidencia auditable y alertas normativas en una sola plataforma, sin arriesgar tu ingreso a faena."
        coverageTitle="Cobertura normativa incluida"
        coverageItems={["Ley 16.744", "DS N°76", "DS N°44", "RESSO"]}
        formTitle="Solicita tu diagnóstico RESSO"
        formDescription="Respuesta de un especialista en menos de 24 horas hábiles. Revisamos tu matriz actual y te indicamos dónde estás expuesto frente a Codelco."
        defaultCargo="SSOMA/HSE"
        messageLabel="¿Qué necesita resolver tu equipo con el RESSO?"
        messagePlaceholder="Cuéntanos el desafío RESSO de tu contrato o faena..."
      />
      <SoftwareIntro
        eyebrow="Reglamento especial"
        title="¿Qué es el RESSO?"
        description="El RESSO es el Reglamento Especial de Seguridad y Salud Ocupacional que Codelco exige a sus empresas contratistas y subcontratistas. Operacionaliza las obligaciones del artículo 66 bis de la Ley 16.744 y del DS N°76 dentro de su sistema de gestión: no reemplaza la ley, sino que establece cómo demostrar su cumplimiento ante Codelco."
      />
      <SoftwareComparison
        title="Del Excel reactivo al control real de tu RESSO"
        description="Esto es lo que cambia cuando tu matriz RESSO deja de vivir en Excel."
        {...RESSO_COMPARISON}
      />
      <SoftwareRequirements
        eyebrow="Control contractual"
        title="Qué exige el RESSO"
        description="Nuestro equipo legal mantiene tu matriz actualizada frente a cada uno de estos requisitos."
        items={RESSO_REQUIREMENTS}
      />
      <SoftwareSteps
        title="Cómo funciona Isolegal para tu RESSO"
        description="Pensado para el flujo real de un equipo SSOMA que trabaja con Codelco, no para un software genérico de gestión."
        steps={RESSO_STEPS}
      />
      <SoftwareConsequences
        eyebrow="Continuidad operacional"
        title="¿Tu RESSO resistiría una revisión de Codelco hoy mismo?"
        description="Estas son algunas de las consecuencias contractuales y operacionales que puede generar un incumplimiento del RESSO."
        items={RESSO_CONSEQUENCES}
      />
      <IsolegalRoi items={RESSO_METRICS} />
      <SoftwareTestimonial
        title="Equipos que ya confiaron en Isolegal"
        {...RESSO_TESTIMONIAL}
      />
      <SoftwareFaq
        id="preguntas-frecuentes-resso"
        titleId="resso-faq-title"
        title="Preguntas frecuentes sobre el RESSO"
        items={RESSO_FAQ_ITEMS}
      />
      <SoftwareRiskCta
        id="evaluacion-resso"
        title="¿Tu matriz RESSO resistiría una revisión de Codelco hoy mismo?"
        description="Descubre el nivel de riesgo de incumplimiento de tu RESSO en menos de 5 minutos."
        buttonText="Iniciar evaluación gratuita RESSO"
        informationItems={[
          {
            title: "Score de riesgo inmediato",
            description: "Obtén una puntuación clara sobre tu estado actual.",
          },
          {
            title: "Conoce tus brechas",
            description:
              "Visualiza tu exposición frente a exigencias RESSO y contractuales.",
          },
          {
            title: "Agenda una reunión",
            description:
              "Revisa tu matriz y tus principales riesgos con un especialista.",
          },
        ]}
      />
      <FloatingActionButton />
    </main>
  );
}
