import { SoftwareRiskCta } from "@/sections/software-landing";

export default function SstRiskCta() {
  return (
    <SoftwareRiskCta
      id="calcula-tu-riesgo-sst"
      title="¿Tu sistema de gestión SST resistiría una fiscalización hoy mismo?"
      description="Descubre el nivel de riesgo de incumplimiento SST, HSE y ambiental de tu organización en menos de 5 minutos."
      buttonText="Iniciar evaluación gratuita SST"
      informationItems={[
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
          description:
            "Conoce en detalle tus principales riesgos SST y ambientales.",
        },
      ]}
    />
  );
}
