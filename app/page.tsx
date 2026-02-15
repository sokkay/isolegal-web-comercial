import BussinessSection from "@/sections/bussiness";
import HeadingSection from "@/sections/heading";
import RiskCalculatorMainContainer from "@/sections/risk-calculator/risk-calculator-main-container";
import TabsBanner from "@/sections/tabs-banner";
import Testimonials from "@/sections/testimonials";
import WhatDoesIsolegalDo from "@/sections/what-does-isolegal-do";
import WhyIsolegalV2Section from "@/sections/why-isolegal-v2";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full mx-auto flex-col bg-background">
      <HeadingSection />
      <BussinessSection />
      <WhyIsolegalV2Section />
      <WhatDoesIsolegalDo />
      <TabsBanner />
      <Testimonials />
      <RiskCalculatorMainContainer />
    </main>
  );
}
