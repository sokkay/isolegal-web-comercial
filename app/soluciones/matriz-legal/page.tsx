import FloatingActionButton from "@/components/FloatingActionButton";
import HowIsolegalWorks from "@/sections/how-isolegal-works";
import {
  MATRIZ_LEGAL_COLUMNS,
  MATRIZ_LEGAL_COMPARISON_ROWS,
  MATRIZ_LEGAL_FAQ_ITEMS,
  MATRIZ_LEGAL_RISK_CTA_ITEMS,
  MATRIZ_LEGAL_SANCTIONS,
  MATRIZ_LEGAL_STEPS,
} from "@/sections/matriz-legal-landing";
import {
  SoftwareComparisonTable,
  SoftwareFaq,
  SoftwareHero,
  SoftwarePlainColumns,
  SoftwareRiskCta,
  SoftwareSanctionsStrip,
  SoftwareSteps,
  createFaqStructuredData,
} from "@/sections/software-landing";
import type { Metadata } from "next";

const SITE_URL = "https://isolegal.cl";
const PAGE_PATH = "/soluciones/matriz-legal";
const PAGE_DESCRIPTION =
  "Isolegal interpreta qué aplica a tu empresa y lo transforma en tareas trazables. Administramos y mantenemos tu matriz de requisitos legales permanentemente actualizada frente a cada cambio normativo en Chile.";

export const metadata: Metadata = {
  title: {
    absolute: "Matriz Legal para Empresas en Chile | Software Isolegal",
  },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "matriz legal",
    "matriz de requisitos legales",
    "matriz legal Chile",
    "cumplimiento normativo",
    "software matriz legal",
    "Isolegal",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Isolegal",
    title: "Matriz Legal para Empresas en Chile | Software Isolegal",
    description: PAGE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matriz Legal para Empresas en Chile | Software Isolegal",
    description: PAGE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
};

const faqStructuredData = createFaqStructuredData(MATRIZ_LEGAL_FAQ_ITEMS);
const SURFACE_WHITE = "dark:bg-darkBlue bg-white";
const SURFACE_MUTED = "bg-background dark:bg-background";

export default function SolucionesMatrizLegalPage() {
  return (
    <main className="bg-background min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SoftwareHero
        eyebrow="La matriz legal de IsoLegal"
        title="Matriz Legal: Convierte requisitos legales en acciones concretas"
        description={PAGE_DESCRIPTION}
        formTitle="Cotiza la matriz legal para tu empresa"
        formDescription="Respuesta de un especialista en menos de 24 horas hábiles."
        messageLabel="¿Qué necesita resolver tu equipo?"
        messagePlaceholder="Cuéntanos el estado actual de tu matriz legal..."
      />
      <HowIsolegalWorks className={SURFACE_WHITE} />
      <SoftwareComparisonTable
        className={SURFACE_MUTED}
        title="Del Excel estático a una matriz de cumplimiento legal viva y auditable"
        description="Qué cambia cuando la matriz legal de una empresa pasa de ser una planilla olvidada a un sistema de control operativo continuo."
        withoutColumnTitle="Planilla de Excel Estática"
        withColumnTitle="Matriz Legal Isolegal"
        rows={MATRIZ_LEGAL_COMPARISON_ROWS}
      />
      <SoftwarePlainColumns
        className={SURFACE_WHITE}
        title="Un sistema transversal para todas las áreas reguladas de tu empresa"
        description="Desde seguridad laboral hasta gestión ambiental y sistemas de contratistas: una sola plataforma matriz legal."
        items={MATRIZ_LEGAL_COLUMNS}
      />
      <SoftwareSteps
        className={SURFACE_MUTED}
        eyebrow=""
        title="Cómo funciona la plataforma de matriz legal en Chile de Isolegal"
        description="El software matriz legal diseñado para el flujo operativo real de tu equipo, no para una plantilla genérica."
        steps={MATRIZ_LEGAL_STEPS}
      />
      <SoftwareSanctionsStrip
        className={SURFACE_WHITE}
        title="Lo que arriesga tu empresa con una matriz legal desactualizada"
        description="Frente a fiscalizaciones de la Dirección del Trabajo, SEREMI de Salud, SMA o auditorías de clientes, una matriz obsoleta expone a tu operación a estos impactos."
        items={MATRIZ_LEGAL_SANCTIONS}
      />
      <SoftwareFaq
        className={SURFACE_MUTED}
        id="preguntas-frecuentes-matriz-legal"
        titleId="matriz-legal-faq-title"
        title="Preguntas frecuentes sobre la Matriz Legal"
        items={MATRIZ_LEGAL_FAQ_ITEMS}
      />
      <SoftwareRiskCta
        id="evaluacion-matriz-legal"
        title="¿Tu empresa cuenta con una matriz legal actualizada y auditable hoy mismo?"
        description="Isolegal interpreta tus requisitos normativos aplicables, digitaliza tu matriz y la administra de forma continua frente a cada cambio legislativo en Chile."
        buttonText="Cotiza aquí"
        informationItems={MATRIZ_LEGAL_RISK_CTA_ITEMS}
      />
      <FloatingActionButton />
    </main>
  );
}
