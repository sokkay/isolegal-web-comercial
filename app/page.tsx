import BussinessSection from "@/sections/bussiness";
import HeadingSection from "@/sections/heading";
import TabsBanner from "@/sections/tabs-banner";
import Testimonials from "@/sections/testimonials";
import WhatDoesIsolegalDo from "@/sections/what-does-isolegal-do";
import WhyIsolegalSection from "@/sections/why-isolegal";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full mx-auto flex-col">
      <HeadingSection />
      <BussinessSection />
      <WhyIsolegalSection />
      <WhatDoesIsolegalDo />
      <TabsBanner />
      <Testimonials />
    </main>
  );
}
