import FloatingActionButton from "@/components/FloatingActionButton";
import BussinessSection from "@/sections/bussiness";
import HeadingSection from "@/sections/heading";
import HomeFaqSection, { HOME_FAQ_ITEMS } from "@/sections/home-faq";
import HomeSolutions from "@/sections/home-solutions";
import RiskCalculatorMainContainer from "@/sections/risk-calculator/risk-calculator-main-container";
import TabsBanner from "@/sections/tabs-banner";
import Testimonials from "@/sections/testimonials";
import WhoWeAre from "@/sections/who-we-are";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Software de Compliance y Cumplimiento Normativo | Isolegal",
  },
  description:
    "Software de compliance y cumplimiento normativo para empresas en Chile. Centraliza matriz legal, evidencias y alertas en una sola plataforma. Contáctanos.",
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <main className="bg-background mx-auto flex min-h-dvh w-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <HeadingSection />
      <BussinessSection />
      <HomeSolutions />
      {/* <IsolegalRoi /> */}
      <WhoWeAre />
      {/* <HowIsolegalWorks /> */}
      <TabsBanner />
      <Testimonials />
      <HomeFaqSection />
      <RiskCalculatorMainContainer />
      <FloatingActionButton />
    </main>
  );
}
