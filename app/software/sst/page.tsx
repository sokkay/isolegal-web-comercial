import FloatingActionButton from "@/components/FloatingActionButton";
import { createFaqStructuredData } from "@/sections/software-landing";
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
const PAGE_PATH = "/software/sst";

export const metadata: Metadata = {
  title: {
    absolute: "Sistema de Gestión SST, HSE y Medio Ambiente | Isolegal",
  },
  description:
    "Sistema de gestión SST, HSE y medio ambiente para empresas en Chile. Centraliza matriz legal, evidencia y alertas normativas. Solicita un diagnóstico.",
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "sistema de gestión SST",
    "sistema de gestión de seguridad y salud en el trabajo",
    "SG-SST",
    "HSE",
    "medio ambiente",
    "ISO 45001",
    "RCA",
    "DS 44",
    "Ley 16.744",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Isolegal",
    title: "Sistema de Gestión SST, HSE y Medio Ambiente | Isolegal",
    description:
      "Sistema de gestión SST, HSE y medio ambiente para empresas en Chile. Centraliza matriz legal, evidencia y alertas normativas.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Gestión SST, HSE y Medio Ambiente | Isolegal",
    description:
      "Sistema de gestión SST, HSE y medio ambiente para empresas en Chile. Centraliza matriz legal, evidencia y alertas normativas.",
    images: ["/images/og-image.png"],
  },
};

const faqStructuredData = createFaqStructuredData(SST_FAQ_ITEMS);

export default function SistemaGestionSstPage() {
  return (
    <main className="bg-background min-h-dvh overflow-hidden">
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
