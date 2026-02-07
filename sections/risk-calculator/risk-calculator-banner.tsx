import Button from "@/components/ui/Button";
import MapIcon from "@/public/icons/map.svg";
import ScoreIcon from "@/public/icons/score.svg";
import WarningIcon from "@/public/icons/warning.svg";
import { cn } from "@/utils/cn";
import Image from "next/image";

type RiskCalculatorBannerProps = {
  onStart?: () => void;
};

export default function RiskCalculatorBanner({
  onStart,
}: RiskCalculatorBannerProps) {
  const informationSection = [
    {
      title: "Score de Riesgo Inmediato",
      description:
        "Obtén una puntuación clara sobre tu estado actual. (0 a 10)",
      Icon: <ScoreIcon className="w-6 h-6 fill-[#16A34A]" />,
      bgColor: "bg-[#F0FDF4]",
    },
    {
      title: 'Identificación de "Normas Zombie"',
      description: "Detecta regulaciones obsoletas que sigues aplicando.",
      Icon: <WarningIcon className="w-6 h-6 fill-[#EA580C]" />,
      bgColor: "bg-[#FFF7ED]",
    },
    {
      title: "Hoja de Ruta Personalizada",
      description: "Para cerrar brechas críticas",
      Icon: <MapIcon className="w-6 h-6 fill-[#9333EA]" />,
      bgColor: "bg-[#FAF5FF]",
    },
  ];

  return (
    <div className="flex flex-row rounded-2xl overflow-hidden">
      <div className="flex-1 flex flex-col gap-6 text-white bg-darkBlue p-6 md:p-16 ">
        <h1 className="text-4xl font-bold">
          ¿Tu empresa resistiría una auditoría legal ISO hoy mismo?
        </h1>
        <h3 className="text-lg">
          Descubre el nivel de cumplimiento normativo de tu organización en
          menos de 5 minutos.
        </h3>
        <div className="flex flex-col gap-6">
          {informationSection.map((section) => (
            <div key={section.title} className="flex flex-row gap-3 md:gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex justify-center items-center shrink-0",
                  section.bgColor
                )}
              >
                {section.Icon}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text font-bold">{section.title}</h4>
                <p className="text-sm">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          text="Iniciar evaluación Gratuita"
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
      <div className="flex-1 hidden lg:flex items-center justify-center bg-card-background ">
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
