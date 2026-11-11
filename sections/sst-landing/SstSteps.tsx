import { SoftwareSteps } from "@/sections/software-landing";

const steps = [
  {
    title: "Definimos tu matriz",
    description:
      "Identificamos junto a tu equipo la normativa SST aplicable a tu operación y rubro.",
  },
  {
    title: "Centralizas evidencia",
    description:
      "Exámenes, capacitaciones, inspecciones y permisos quedan asociados a cada requisito legal.",
  },
  {
    title: "Recibes alertas",
    description:
      "De manera automática, te avisamos de los cambios normativos ya incorporados en tu matriz.",
  },
  {
    title: "Demuestras cumplimiento",
    description:
      "Genera reportes listos para auditorías, fiscalizaciones y certificaciones ISO en minutos.",
  },
];

export default function SstSteps() {
  return (
    <SoftwareSteps
      title="Cómo funciona tu sistema de gestión SST en 4 pasos"
      description="Pensado para el flujo real de un equipo SSOMA, no para un software genérico de gestión."
      steps={steps}
    />
  );
}
