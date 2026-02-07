"use client";
import { useRouter } from "next/navigation";
import RiskCalculatorBanner from "./risk-calculator-banner";

export default function RiskCalculatorMainContainer() {
  const router = useRouter();

  const onStart = () => {
    router.push("/calcula-tu-riesgo?step=1");
  };

  return (
    <section id="calcula-tu-riesgo" className="container mx-auto py-16">
      <RiskCalculatorBanner onStart={onStart} />
    </section>
  );
}
