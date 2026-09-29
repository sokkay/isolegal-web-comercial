import FloatingActionButton from "@/components/FloatingActionButton";
import {
  GRC_COMPARISON,
  GRC_CONSEQUENCES,
  GRC_FAQ_ITEMS,
  GRC_FEATURES,
  GRC_FRAMEWORKS,
  GRC_METRICS,
  GRC_STEPS,
  GRC_TESTIMONIAL,
} from "@/sections/grc-landing";
import IsolegalRoi from "@/sections/isolegal-roi";
import {
  SoftwareComparison,
  SoftwareConsequences,
  SoftwareFaq,
  SoftwareFeatureCards,
  SoftwareHero,
  SoftwareRequirements,
  SoftwareRiskCta,
  SoftwareSteps,
  SoftwareTestimonial,
  createFaqStructuredData,
} from "@/sections/software-landing";
import type { Metadata } from "next";

const SITE_URL = "https://isolegal.cl";
const PAGE_PATH = "/areas/grc";

export const metadata: Metadata = {
  title: {
    absolute: "Software GRC: Gobierno, Riesgo y Cumplimiento | Isolegal",
  },
  description:
    "Software GRC para empresas en Chile. Centraliza riesgo, cumplimiento, evidencia auditable y alertas normativas con apoyo de un equipo legal.",
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "software GRC",
    "plataforma GRC",
    "gobierno riesgo y cumplimiento",
    "gestión de riesgos empresariales",
    "cumplimiento normativo Chile",
    "Ley 20.393",
    "Ley 21.595",
    "modelo de prevención de delitos",
    "ISO 31000",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Isolegal",
    title: "Software GRC: Gobierno, Riesgo y Cumplimiento | Isolegal",
    description:
      "Centraliza tu matriz de riesgo y cumplimiento, evidencia auditable y alertas normativas en una sola plataforma.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software GRC: Gobierno, Riesgo y Cumplimiento | Isolegal",
    description:
      "Centraliza riesgo, cumplimiento y evidencia auditable en una sola plataforma.",
    images: ["/images/og-image.png"],
  },
};

const faqStructuredData = createFaqStructuredData(GRC_FAQ_ITEMS);

export default function SoftwareGrcPage() {
  return (
    <main className="bg-background min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SoftwareHero
        eyebrow="Governance · Risk · Compliance"
        title="Software GRC: Gobierno, Riesgo y Cumplimiento para Empresas en Chile"
        description="Isolegal centraliza tu matriz de riesgo y cumplimiento, evidencia auditable y alertas normativas en una sola plataforma administrada por nuestro equipo legal."
        coverageTitle="Pilares GRC"
        coverageItems={[
          "G — Gobierno corporativo",
          "R — Gestión de riesgos",
          "C — Cumplimiento normativo",
        ]}
        formTitle="Solicita tu diagnóstico GRC"
        formDescription="Respuesta de un especialista en menos de 24 horas hábiles."
        defaultCargo="Compliance/Legal"
        messageLabel="¿Qué necesita resolver tu equipo de compliance?"
        messagePlaceholder="Cuéntanos el principal desafío de riesgo o cumplimiento de tu equipo..."
      />
      <SoftwareFeatureCards
        eyebrow="Tres pilares"
        title="¿Qué es GRC?"
        description="Governance, Risk and Compliance: tres pilares, una sola plataforma."
        items={GRC_FEATURES}
      />
      <SoftwareComparison
        title="Del Excel reactivo al control real de tu GRC"
        description="Esto es lo que cambia cuando tu matriz de riesgo y cumplimiento deja de vivir en Excel."
        {...GRC_COMPARISON}
      />
      <SoftwareRequirements
        eyebrow="Cobertura regulatoria"
        title="Marco normativo GRC en Chile"
        description="Nuestro equipo legal mantiene tu matriz actualizada frente a cada uno de estos marcos."
        items={GRC_FRAMEWORKS}
      />
      <SoftwareSteps
        title="Cómo funciona Isolegal para tu GRC"
        description="Pensado para el flujo real de un equipo de compliance, no para un software genérico de gestión."
        steps={GRC_STEPS}
      />
      <SoftwareConsequences
        eyebrow="Exposición regulatoria"
        title="¿Tu modelo de prevención resistiría una fiscalización hoy mismo?"
        description="Estas son algunas de las consecuencias que contempla la Ley 20.393 cuando existe responsabilidad penal de la persona jurídica."
        listTitle="Penas y consecuencias contempladas en la Ley 20.393"
        items={GRC_CONSEQUENCES}
      />
      <IsolegalRoi items={GRC_METRICS} />
      <SoftwareTestimonial
        title="Equipos que ya confiaron en Isolegal"
        {...GRC_TESTIMONIAL}
      />
      <SoftwareFaq
        id="preguntas-frecuentes-grc"
        titleId="grc-faq-title"
        title="Preguntas frecuentes sobre GRC"
        items={GRC_FAQ_ITEMS}
      />
      <SoftwareRiskCta
        id="evaluacion-grc"
        title="¿Tu modelo de prevención de delitos resistiría una fiscalización hoy mismo?"
        description="Descubre el nivel de riesgo de incumplimiento de tu empresa en menos de 5 minutos."
        buttonText="Iniciar evaluación gratuita GRC"
        informationItems={[
          {
            title: "Score de riesgo inmediato",
            description: "Obtén una puntuación clara sobre tu estado actual.",
          },
          {
            title: "Conoce tu exposición",
            description:
              "Visualiza el nivel de riesgo legal y de cumplimiento de tu organización.",
          },
          {
            title: "Agenda una reunión",
            description:
              "Revisa tus principales brechas con un especialista de Isolegal.",
          },
        ]}
      />
      <FloatingActionButton />
    </main>
  );
}
