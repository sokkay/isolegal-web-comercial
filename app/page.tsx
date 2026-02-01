import BussinessSection from "@/sections/bussiness";
import HeadingSection from "@/sections/heading";
import WhyIsolegalSection from "@/sections/why-isolegal";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full mx-auto flex-col">
      <HeadingSection />
      <BussinessSection />
      <WhyIsolegalSection />
    </main>
  );
}
