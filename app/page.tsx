import BussinessSection from "@/sections/bussiness";
import FloatingActionButton from "@/components/FloatingActionButton";
import HeadingSection from "@/sections/heading";
import HowIsolegalWorks from "@/sections/how-isolegal-works";
import IsolegalRoi from "@/sections/isolegal-roi";
import RiskCalculatorMainContainer from "@/sections/risk-calculator/risk-calculator-main-container";
import TabsBanner from "@/sections/tabs-banner";
import Testimonials from "@/sections/testimonials";
import WhyIsolegalV2Section from "@/sections/why-isolegal-v2";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full mx-auto flex-col bg-background">
      <HeadingSection />
      <BussinessSection />
      <WhyIsolegalV2Section />
      <IsolegalRoi />
      <HowIsolegalWorks />
      <TabsBanner />
      <Testimonials />
      <RiskCalculatorMainContainer />
      <FloatingActionButton />
    </main>
  );
}
