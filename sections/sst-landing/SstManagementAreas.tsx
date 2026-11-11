import ConstructionIcon from "@/public/icons/construction.svg";
import EngineeringIcon from "@/public/icons/engineering.svg";
import GroupsIcon from "@/public/icons/groups.svg";
import { SoftwareFeatureCards } from "@/sections/software-landing";
import Link from "next/link";

const managementAreas = [
  {
    Icon: EngineeringIcon,
    title: "Seguridad y Salud en el Trabajo",
    description: "",
  },
  {
    Icon: ConstructionIcon,
    title: "Minería y contratistas",
    description: "",
  },
  {
    Icon: GroupsIcon,
    title: "HSE y Mandantes",
    description: "",
  },
];

export default function SstManagementAreas() {
  return (
    <SoftwareFeatureCards
      eyebrow="Una sola plataforma"
      title="Seguridad y Salud en el Trabajo (SST): una sola matriz legal"
      description="Las empresas deben cumplir diversas obligaciones de seguridad y salud en el trabajo, además de las exigencias de sus mandantes y estándares de gestión. Isolegal centraliza estos requisitos en una matriz legal SST actualizada, facilitando su seguimiento, control y evidencia de cumplimiento."
      items={managementAreas}
    >
      <p className="text-text/75 mt-8 text-center leading-7">
        La parte ambiental del HSE está en{" "}
        <Link
          href="/areas/medioambiente"
          className="text-primary underline underline-offset-4 dark:text-(--color-primary-on-dark-gray)"
        >
          Software de Cumplimiento Ambiental
        </Link>
        .
      </p>
    </SoftwareFeatureCards>
  );
}
