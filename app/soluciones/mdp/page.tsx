import FloatingActionButton from "@/components/FloatingActionButton";
import {
  MPD_FAQ_ITEMS,
  MPD_FEATURES,
  MPD_REQUIREMENTS,
  MPD_RISK_CTA_ITEMS,
  MPD_SANCTIONS,
  MPD_STEPS,
} from "@/sections/mpd-landing";
import {
  SoftwareFaq,
  SoftwareFeatureCards,
  SoftwareHero,
  SoftwareRequirements,
  SoftwareRiskCta,
  SoftwareSanctionsStrip,
  SoftwareSteps,
  createFaqStructuredData,
} from "@/sections/software-landing";
import type { Metadata } from "next";

const SITE_URL = "https://isolegal.cl";
const PAGE_PATH = "/soluciones/mdp";

export const metadata: Metadata = {
  title: {
    absolute:
      "Modelo de Prevención del Delito para Empresas en Chile | Isolegal",
  },
  description:
    "Gestiona tu MPD de forma simple, ordenada y trazable, desde la identificación de riesgos hasta la evidencia de los controles.",
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "modelo de prevención del delito",
    "MPD Chile",
    "Ley 20.393",
    "Ley 21.595",
    "delitos económicos",
    "encargado de prevención",
    "canal de denuncias",
    "PULSO Isolegal",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Isolegal",
    title: "Modelo de Prevención del Delito para Empresas en Chile | Isolegal",
    description:
      "Gestiona tu MPD de forma simple, ordenada y trazable, desde la identificación de riesgos hasta la evidencia de los controles.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modelo de Prevención del Delito para Empresas en Chile | Isolegal",
    description:
      "Gestiona tu MPD de forma simple, ordenada y trazable, desde la identificación de riesgos hasta la evidencia de los controles.",
    images: ["/images/og-image.png"],
  },
};

const faqStructuredData = createFaqStructuredData(MPD_FAQ_ITEMS);

export default function ProductosMdpPage() {
  return (
    <main className="bg-background min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SoftwareHero
        title="Modelo de Prevención del Delito para Empresas en Chile"
        description="Gestiona tu MPD de forma simple, ordenada y trazable, desde la identificación de riesgos hasta la evidencia de los controles."
        coverageTitle="Cobertura normativa incluida"
        coverageVariant="list"
        coverageItems={[
          "Ley 20.393",
          "Ley 21.595 (Delitos Económicos)",
          "Código Penal",
        ]}
        formTitle="Cotiza con nosotros para gestionar tu MPD"
        formDescription="Respuesta de un especialista en menos de 24 horas hábiles."
        defaultCargo="Compliance/Legal"
        messageLabel="¿Qué necesita resolver tu equipo?"
        messagePlaceholder="Cuéntanos el estado actual de tu MPD..."
      />
      <SoftwareFeatureCards
        title="Del riesgo asumido a un Modelo de Prevención del Delito defendible"
        description="El Modelo de Prevención de Delitos solo es efectivo si se integra al día a día de la empresa y cuenta con controles respaldables."
        items={MPD_FEATURES}
      />
      <SoftwareRequirements
        title="Qué exige el artículo 4° de la Ley 20.393"
        description="Cuatro elementos mínimos para que un modelo se considere adecuado y permita a la empresa eximirse de responsabilidad."
        items={MPD_REQUIREMENTS}
      />
      <SoftwareSteps
        eyebrow=""
        title="Cómo implementamos o actualizamos tu Modelo de Prevención de Delitos en 4 pasos"
        description="Pensado para el flujo real de un equipo legal o de compliance, no para una plantilla genérica."
        steps={MPD_STEPS}
      />
      <SoftwareSanctionsStrip
        title="Lo que arriesga tu empresa sin un modelo efectivo"
        description="Si tu empresa es condenada y no logra acreditar que el Modelo de Prevención del Delito estaba efectivamente implementado, la Ley 20.393 contempla estas sanciones."
        items={MPD_SANCTIONS}
      />
      <SoftwareFaq
        id="preguntas-frecuentes-mdp"
        titleId="mdp-faq-title"
        title="Preguntas frecuentes sobre el Modelo de Prevención de Delitos"
        items={MPD_FAQ_ITEMS}
      />
      <SoftwareRiskCta
        id="evaluacion-mdp"
        title="¿Tu Modelo de Prevención de Delitos resistiría la revisión de un tribunal hoy mismo?"
        description="Isolegal revisa tu modelo actual contra la Ley 21.595 y te dice exactamente qué falta para dejarlo defendible."
        buttonText="Cotiza aquí"
        informationItems={MPD_RISK_CTA_ITEMS}
      />
      <FloatingActionButton />
    </main>
  );
}
