import SectionHeading from "./SectionHeading";

const managementAreas = [
  {
    number: "01",
    title: "Seguridad y Salud en el Trabajo",
    description:
      "Gestiona obligaciones, evidencia y vencimientos asociados a la seguridad y salud de tus equipos.",
  },
  {
    number: "02",
    title: "Medio Ambiente",
    description:
      "Integra RCA, permisos, normativa SMA y requisitos ambientales dentro de la misma matriz legal.",
  },
  {
    number: "03",
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
        title="SST, HSE y medio ambiente: tres áreas, una sola matriz legal"
        description="Estas áreas suelen gestionarse en sistemas separados. Isolegal las une para que tu equipo deje de duplicar trabajo."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {managementAreas.map((area) => (
          <article
            key={area.title}
            className="bg-card-background group dark:bg-surface-tonal-a10 flex h-full flex-col items-center gap-4 rounded-2xl p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8"
          >
            {/* TODO(sst-icons): reemplazar el número por el ícono de cada área. */}
            <div className="bg-green-bg flex size-16 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105">
              <span className="text-primary text-xl font-extrabold">
                {area.number}
              </span>
            </div>
            <h3 className="text-text text-xl font-extrabold dark:text-white">
              {area.title}
            </h3>
            <p className="text-text/70 max-w-sm leading-7 dark:text-white/70">
              {area.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
