import FloatingActionButton from "@/components/FloatingActionButton";
import {
  SST_FAQ_ITEMS,
  SstComparison,
  SstFaq,
  SstHero,
  SstManagementAreas,
  SstMetrics,
  SstRegulationCategories,
  SstRiskCta,
  SstSteps,
} from "@/sections/sst-landing";
import type { Metadata } from "next";

const SITE_URL = "https://isolegal.cl";
const PAGE_PATH = "/sistema-de-gestion-sst";

export const metadata: Metadata = {
  title: "Sistema de Gestión de Seguridad y Salud en el Trabajo",
  description:
    "Gestiona SST, HSE y medio ambiente en una sola plataforma: matriz legal, evidencia auditable, alertas normativas y reportes de cumplimiento.",
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "sistema de gestión de seguridad y salud en el trabajo",
    "sistema de gestión SST",
    "SG-SST Chile",
    "software SST",
    "HSE",
    "SSOMA",
    "ISO 45001",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "Sistema de Gestión SST, HSE y Medio Ambiente | Isolegal",
    description:
      "Centraliza tu matriz legal, evidencia y alertas normativas para demostrar cumplimiento SST en Chile.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Gestión SST, HSE y Medio Ambiente | Isolegal",
    description:
      "Centraliza tu matriz legal, evidencia y alertas normativas para demostrar cumplimiento SST en Chile.",
    images: ["/images/og-image.png"],
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SST_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function SistemaGestionSstPage() {
  return (
    <main className="sst-page-theme bg-background min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SstHero />
      <SstManagementAreas />
      <SstComparison />
      <SstRegulationCategories />
      <SstSteps />
      <SstMetrics />
      <SstFaq />
      <SstRiskCta />
      <FloatingActionButton />
    </main>
  );
}
