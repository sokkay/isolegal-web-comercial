import FloatingActionButton from "@/components/FloatingActionButton";
import Button from "@/components/ui/Button";
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
  SstTestimonials,
} from "@/sections/sst-landing";
import type { Metadata } from "next";

const SITE_URL = "https://isolegal.cl";
const PAGE_PATH = "/areas/sst";

export const metadata: Metadata = {
  title: {
    absolute: "Sistema de Gestión SST para Empresas en Chile | Isolegal",
  },
  description:
    "Sistema de gestión de seguridad y salud en el trabajo para empresas en Chile. Centraliza matriz legal SST, evidencia y alertas normativas. Solicita un diagnóstico.",
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "sistema de gestión SST",
    "sistema de gestión de seguridad y salud en el trabajo",
    "SG-SST",
    "ISO 45001",
    "DS 44",
    "Ley 16.744",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Isolegal",
    title: "Sistema de Gestión SST para Empresas en Chile | Isolegal",
    description:
      "Sistema de gestión de seguridad y salud en el trabajo para empresas en Chile. Centraliza matriz legal SST, evidencia y alertas normativas.",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Gestión SST para Empresas en Chile | Isolegal",
    description:
      "Sistema de gestión de seguridad y salud en el trabajo para empresas en Chile. Centraliza matriz legal SST, evidencia y alertas normativas.",
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
      <div className="container mx-auto pb-8 text-center">
        <p className="text-text mb-4">
          ¿También gestionas obligaciones ambientales? Integra SST y medio
          ambiente en una misma matriz legal.
        </p>
        <Button
          text="Conoce Medio Ambiente"
          href="/areas/medio-ambiente"
          variant="outline"
        />
      </div>
      <SstRegulationCategories />
      <SstSteps />
      <SstMetrics />
      <SstTestimonials />
      <SstFaq />
      <SstRiskCta />
      <FloatingActionButton />
    </main>
  );
}
