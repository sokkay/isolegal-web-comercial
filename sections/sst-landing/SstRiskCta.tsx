import RiskCalculatorBanner from "@/sections/risk-calculator/risk-calculator-banner";

const riskInformationItems = [
  {
    title: "Score de Riesgo Inmediato",
    description: "Obtén una puntuación clara sobre tu estado actual.",
  },
  {
    title: "Conoce tu estado actual",
    description:
      "Visualiza el nivel de exposición al incumplimiento de tu organización.",
  },
  {
    title: "Agenda una reunión",
    description: "Conoce en detalle tus principales riesgos SST y ambientales.",
  },
];

export default function SstRiskCta() {
  return (
    <section
      id="calcula-tu-riesgo-sst"
      className="container mx-auto pb-16 sm:pb-20"
    >
      <RiskCalculatorBanner
        title="¿Tu sistema de gestión SST resistiría una fiscalización hoy mismo?"
        description="Descubre el nivel de riesgo de incumplimiento SST, HSE y ambiental de tu organización en menos de 5 minutos."
        buttonText="Iniciar evaluación gratuita SST"
        informationItems={riskInformationItems}
      />
    </section>
  );
}
