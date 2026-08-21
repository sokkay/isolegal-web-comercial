import EngineeringIcon from "@/public/icons/engineering.svg";
import GroupsIcon from "@/public/icons/groups.svg";
import TempPreferencesEcoIcon from "@/public/icons/temp-preferences-eco.svg";
import { SoftwareFeatureCards } from "@/sections/software-landing";

const managementAreas = [
  {
    Icon: EngineeringIcon,
    title: "Seguridad y Salud en el Trabajo",
    description:
      "Gestiona obligaciones, evidencia y vencimientos asociados a la seguridad y salud de tus equipos.",
  },
  {
    Icon: TempPreferencesEcoIcon,
    title: "Medio Ambiente",
    description:
      "Integra RCA, permisos, normativa SMA y requisitos ambientales dentro de la misma matriz legal.",
  },
  {
    Icon: GroupsIcon,
    title: "HSE Integral y Mandantes",
    description:
      "Centraliza estándares internos y exigencias de mandantes como SIGO, RESSO y RECSS.",
  },
];

export default function SstManagementAreas() {
  return (
    <SoftwareFeatureCards
      eyebrow="Una sola plataforma"
      title="SST, HSE y medio ambiente: tres áreas, una sola matriz legal"
      description="Estas áreas suelen gestionarse en sistemas separados. Isolegal las une para que tu equipo deje de duplicar trabajo."
      items={managementAreas}
    />
  );
}
