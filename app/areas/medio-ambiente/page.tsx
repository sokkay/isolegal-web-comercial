import FloatingActionButton from "@/components/FloatingActionButton";
import IsolegalRoi from "@/sections/isolegal-roi";
import {
  ENVIRONMENT_COMPARISON,
  ENVIRONMENT_FAQ_ITEMS,
  ENVIRONMENT_INDUSTRIES,
  ENVIRONMENT_PILLARS,
  ENVIRONMENT_REGULATIONS,
  ENVIRONMENT_STEPS,
  ENVIRONMENT_TESTIMONIAL,
} from "@/sections/medio-ambiente-landing/content";
import {
  SectionHeading,
  SoftwareComparison,
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

const PAGE_PATH = "/areas/medio-ambiente";
const title =
  "Software de Cumplimiento Ambiental para Empresas en Chile | Isolegal";
const description =
  "Centraliza tu matriz legal ambiental, compromisos RCA, evidencia y alertas normativas en Isolegal. Gestiona tus actividades en Pulso y solicita un diagnóstico.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PAGE_PATH },
  keywords: [
    "software de cumplimiento ambiental",
    "RCA software",
    "matriz legal ambiental",
    "normas SMA",
    "ISO 14001",
    "cumplimiento ambiental Chile",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `https://isolegal.cl${PAGE_PATH}`,
    siteName: "Isolegal",
    title,
    description,
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.png"],
  },
};

export default function MedioAmbientePage() {
  return (
    <main className="bg-background min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            createFaqStructuredData(ENVIRONMENT_FAQ_ITEMS)
          ),
        }}
      />
      <SoftwareHero
        eyebrow="Medio Ambiente · RCA y SMA"
        title="Software de Cumplimiento Ambiental para Empresas en Chile"
        description="Software de cumplimiento ambiental que concentra tu matriz legal y los compromisos de tu RCA. Guarda la evidencia de cada obligación, te alerta ante cambios normativos y te deja programar y seguir las acciones pendientes en Pulso."
        tagline="No partes de cero: nuestro equipo legal administra tu matriz de forma permanente."
        coverageItems={["Compromisos RCA", "Pertinencias", "Normas SMA"]}
        formTitle="Solicita tu diagnóstico ambiental"
        formDescription="Respuesta de un especialista en menos de 24 horas hábiles."
        messageLabel="¿Qué necesita resolver tu equipo ambiental?"
        messagePlaceholder="Cuéntanos brevemente tu desafío de cumplimiento ambiental"
        submitText="Cotiza aquí"
      />
      <SoftwareFeatureCards
        title="¿Qué es el cumplimiento ambiental de una empresa?"
        description="El cumplimiento ambiental es el conjunto de obligaciones que una empresa debe gestionar y demostrar ante la autoridad. Abarca los compromisos de su RCA, las consultas de pertinencia y la normativa ambiental aplicable. Se sostiene en tres elementos:"
        items={ENVIRONMENT_PILLARS}
      />
      <SoftwareComparison
        title="Del Excel desconectado al cumplimiento ambiental demostrable"
        description="Esto es lo que cambia cuando tu normativa y los compromisos de tu RCA dejan de vivir en planillas."
        {...ENVIRONMENT_COMPARISON}
      />
      <SoftwareRequirements
        title="Toda la normativa ambiental en un solo lugar"
        description="Nuestro equipo legal mantiene la matriz actualizada en las dimensiones que más le importan a tu operación."
        items={ENVIRONMENT_REGULATIONS}
      />
      <SoftwareSteps
        title="Tu cumplimiento ambiental con Isolegal, en 4 pasos"
        description="Pensado para el flujo real de un equipo de medio ambiente, no para un software genérico de gestión."
        steps={ENVIRONMENT_STEPS}
      />
      <section className="container mx-auto py-16 sm:py-20">
        <SectionHeading
          title="Cumplimiento ambiental para todas las industrias"
          description="Si tu operación tiene obligaciones ambientales, Isolegal las ordena. Minería es un área fuerte, pero no la única."
        />
        <ul className="flex flex-wrap justify-center gap-3">
          {ENVIRONMENT_INDUSTRIES.map((industry) => (
            <li
              key={industry}
              className="border-primary/25 bg-card-background text-text rounded-full border px-5 py-3 font-semibold"
            >
              {industry}
            </li>
          ))}
        </ul>
      </section>
      <IsolegalRoi title={null} />
      <SoftwareTestimonial
        title="Equipos que ya confiaron en Isolegal"
        {...ENVIRONMENT_TESTIMONIAL}
      />
      <SoftwareFaq
        id="preguntas-frecuentes-ambientales"
        titleId="environment-faq-title"
        title="Preguntas frecuentes sobre cumplimiento ambiental"
        items={ENVIRONMENT_FAQ_ITEMS}
      />
      <SoftwareRiskCta
        id="evaluacion-ambiental"
        title="¿Tu cumplimiento ambiental resistiría una fiscalización hoy mismo?"
        description="Descubre el nivel de riesgo de incumplimiento ambiental de tu organización en menos de 5 minutos."
        buttonText="Iniciar evaluación gratuita"
        informationItems={[
          {
            title: "Score de riesgo inmediato",
            description: "Obtén una puntuación clara sobre tu estado actual.",
          },
          {
            title: "Conoce tu exposición ambiental",
            description:
              "Revisa las brechas de gestión de tu normativa ambiental y compromisos RCA.",
          },
          {
            title: "Agenda una reunión",
            description:
              "Revisa tus principales desafíos de cumplimiento ambiental con un especialista de Isolegal.",
          },
        ]}
      />
      <FloatingActionButton />
    </main>
  );
}
