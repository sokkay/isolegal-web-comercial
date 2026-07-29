import EngineeringIcon from "@/public/icons/engineering.svg";
import GroupsIcon from "@/public/icons/groups.svg";
import TempPreferencesEcoIcon from "@/public/icons/temp-preferences-eco.svg";

import SectionHeading from "./SectionHeading";

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
    <section className="container mx-auto py-16 sm:py-20">
      <SectionHeading
        eyebrow="Una sola plataforma"
        eyebrowDarkColor="var(--color-primary-on-dark-gray)"
        title="SST, HSE y medio ambiente: tres áreas, una sola matriz legal"
        description="Estas áreas suelen gestionarse en sistemas separados. Isolegal las une para que tu equipo deje de duplicar trabajo."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {managementAreas.map((area) => {
          const Icon = area.Icon;

          return (
            <article
              key={area.title}
              className="bg-card-background group dark:bg-surface-tonal-a10 flex h-full flex-col items-center gap-4 rounded-2xl p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8"
            >
              <div className="bg-green-bg dark:bg-primary/35 dark:ring-(--color-primary-on-dark)/30 flex size-16 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 dark:ring-1">
                <Icon
                  className="fill-primary size-8 dark:fill-white"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-text text-xl font-extrabold dark:text-white">
                {area.title}
              </h3>
              <p className="text-text/70 max-w-sm leading-7 dark:text-white/70">
                {area.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
