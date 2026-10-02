import FloatingActionButton from "@/components/FloatingActionButton";
import {
  PULSO_AUDIENCES,
  PULSO_FAQ_ITEMS,
  PULSO_FEATURES,
  PULSO_HOW_IT_WORKS_STEPS,
  PULSO_RISK_CTA_ITEMS,
  PULSO_TESTIMONIALS,
  PULSO_WHAT_IS_STEPS,
  PulsoAudiences,
  PulsoComplementsMatrix,
  PulsoPeople,
  PulsoTestimonials,
  PulsoWhatIs,
} from "@/sections/pulso-landing";
import {
  SoftwareFaq,
  SoftwareFeatureCards,
  SoftwareHero,
  SoftwareHowItWorks,
  SoftwareRiskCta,
  createFaqStructuredData,
} from "@/sections/software-landing";
import type { Metadata } from "next";

const SITE_URL = "https://isolegal.cl";
const PAGE_PATH = "/soluciones/pulso";
const PAGE_DESCRIPTION =
  "PULSO asigna actividades de cumplimiento, notifica a tu equipo y registra la evidencia lista para auditar. Complementa tu Matriz Legal con la capa de ejecución en terreno.";

export const metadata: Metadata = {
  title: {
    absolute: "PULSO: Evidencia de Cumplimiento en Terreno | Isolegal",
  },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "PULSO Isolegal",
    "seguimiento de cumplimiento en terreno",
    "evidencia de cumplimiento normativo",
    "software de cumplimiento en terreno",
    "Isolegal",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Isolegal",
    title: "PULSO: Evidencia de Cumplimiento en Terreno | Isolegal",
    description: PAGE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PULSO: Evidencia de Cumplimiento en Terreno | Isolegal",
    description: PAGE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
};

const faqStructuredData = createFaqStructuredData(PULSO_FAQ_ITEMS);
const SURFACE_WHITE = "dark:bg-darkBlue bg-white";
const SURFACE_MUTED = "bg-background dark:bg-background";

export default function SolucionesPulsoPage() {
  return (
    <main className="bg-background min-h-dvh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SoftwareHero
        eyebrow="Nuevo en Isolegal"
        title="PULSO: la prueba de que tu equipo cumplió en terreno"
        description="Asigna actividades de cumplimiento, notifica a cada persona lo que le toca y registra la evidencia que necesitas para cualquier auditoría, sin planillas ni recordatorios manuales."
        tagline="Cumplimiento Vivo, Programa Unificado Legal de Seguimiento en la Operación"
        coverageItems={["Asigna", "Notifica", "Registra evidencia"]}
        formTitle="Cotiza PULSO para tu equipo"
        formDescription="Respuesta de un especialista en menos de 24 horas hábiles."
        defaultCargo="SSOMA/HSE"
        messageLabel="¿Qué necesita resolver tu equipo?"
        messagePlaceholder="Cuéntanos cómo haces seguimiento hoy a las actividades de cumplimiento en terreno..."
      />
      <PulsoWhatIs
        className={SURFACE_WHITE}
        title="¿Qué es PULSO?"
        description="PULSO es el software de Isolegal para gestionar y hacer seguimiento de las actividades de cumplimiento normativo en terreno. Asigna un programa de actividades a cada integrante del equipo, le notifica automáticamente qué le corresponde hacer, y define desde el inicio qué evidencia debe quedar registrada, sin depender de planillas paralelas ni de la memoria de las personas."
        steps={PULSO_WHAT_IS_STEPS}
      />
      <SoftwareHowItWorks
        className={SURFACE_MUTED}
        title="Cómo funciona PULSO"
        description="Cuatro pasos que convierten una obligación normativa en evidencia trazable, sin que nadie tenga que perseguirla después. Sigue el scroll."
        steps={PULSO_HOW_IT_WORKS_STEPS}
      />
      <PulsoComplementsMatrix className={SURFACE_WHITE} />
      <PulsoAudiences
        className={SURFACE_MUTED}
        title="Pensado para dos públicos, resuelto para ambos"
        audiences={PULSO_AUDIENCES}
      />
      <SoftwareFeatureCards
        title="Por qué le sirve a tu empresa"
        items={PULSO_FEATURES}
      />
      <PulsoPeople
        title="PULSO lo construyen personas, no solo un algoritmo"
        paragraphs={[
          "PULSO está construido por personas, para personas en la operación, en base a la experiencia de nuestros clientes para dar respuestas reales en terreno.",
          "Cada programa de actividades es diseñado y ajustado por el equipo legal y de compliance de Isolegal, no por una plantilla genérica. Es lo que nuestros clientes nos han dicho una y otra vez que los diferencia de otras herramientas: detrás de PULSO hay personas que entienden su operación, no solo software.",
        ]}
      />
      <PulsoTestimonials
        title="Empresas que ya confían en Isolegal"
        description="Testimonios reales de organizaciones que gestionan su cumplimiento normativo con la plataforma Isolegal."
        items={PULSO_TESTIMONIALS}
        className={SURFACE_WHITE}
      />
      <SoftwareFaq
        className={SURFACE_MUTED}
        id="preguntas-frecuentes-pulso"
        titleId="pulso-faq-title"
        title="Preguntas frecuentes sobre PULSO"
        items={PULSO_FAQ_ITEMS}
      />
      <SoftwareRiskCta
        id="evaluacion-pulso"
        title="¿Podrías demostrar hoy que tu equipo cumplió en terreno?"
        description="Conoce cómo PULSO asigna, notifica y registra la evidencia que tu empresa necesita, sin depender de planillas ni de la memoria de las personas."
        buttonText="Cotiza aquí"
        informationItems={PULSO_RISK_CTA_ITEMS}
      />
      <FloatingActionButton />
    </main>
  );
}
