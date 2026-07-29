import Button from "@/components/ui/Button";
import MapIcon from "@/public/icons/map.svg";
import ScoreIcon from "@/public/icons/score.svg";
import WarningIcon from "@/public/icons/warning.svg";
import Image from "next/image";

export type RiskCalculatorInformationItem = {
  title: string;
  description: string;
};

type RiskCalculatorBannerProps = {
  onStart?: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  informationItems?: RiskCalculatorInformationItem[];
};

export default function RiskCalculatorBanner({
  onStart,
  title = "¿Tu empresa resistiría una fiscalización o auditoria legal hoy mismo?",
  description = "Descubre el nivel de riesgo de incumplimiento normativo de tu organización en menos de 5 minutos.",
  buttonText = "Iniciar evaluación Gratuita",
  informationItems,
}: RiskCalculatorBannerProps) {
  const defaultInformationItems = [
    {
      title: "Score de Riesgo Inmediato",
      description: "Obtén una puntuación clara sobre tu estado actual",
    },
    {
      title: "Conoce tu estado actual",
      description:
        "Obtén una visión completa de tu nivel de exposición al incumplimiento",
    },
    {
      title: "Agenda una reunión",
      description:
        "Agenda una reunión y conoce en detalle tus principales riesgos de incumplimiento",
    },
  ];
  const resolvedInformationItems = informationItems ?? defaultInformationItems;
  const icons = [ScoreIcon, WarningIcon, MapIcon];
  const defaultIconClasses = [
    "bg-[#F0FDF4] text-[#16A34A]",
    "bg-[#FFF7ED] text-[#EA580C]",
    "bg-[#FAF5FF] text-[#9333EA]",
  ];

  return (
    <div className="flex flex-row overflow-hidden rounded-2xl">
      <div className="bg-darkBlue flex flex-1 flex-col gap-6 p-6 text-white md:p-16">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-lg">{description}</p>
        <div className="flex flex-col gap-6">
          {resolvedInformationItems.map((section, index) => {
            const Icon = icons[index] ?? ScoreIcon;

            return (
              <div key={section.title} className="flex flex-row gap-3 md:gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    defaultIconClasses[index] ?? defaultIconClasses[0]
                  }`}
                >
                  <Icon className="h-6 w-6 fill-current" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text font-bold">{section.title}</h4>
                  <p className="text-sm">{section.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          text={buttonText}
          variant="contained"
          color="primary"
          className="w-full md:w-auto"
          {...(onStart
            ? { onClick: onStart }
            : { href: "/calcula-tu-riesgo?step=1" })}
        />
        <span className="text-sm text-gray-400">
          No requiere tarjeta de crédito. Resultados confidenciales.
        </span>
      </div>
      <div className="bg-card-background hidden flex-1 items-center justify-center lg:flex">
        <Image
          src="/images/risk-banner-image.png"
          alt="Risk Calculator Banner"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
