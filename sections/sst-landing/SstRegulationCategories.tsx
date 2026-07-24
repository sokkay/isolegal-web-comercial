import SectionHeading from "./SectionHeading";

const regulationCategories = [
  {
    title: "Seguridad y Salud Laboral",
    items: ["Ley 16.744", "DS N°44", "DS N°594", "Protocolos MINSAL"],
  },
  {
    title: "Medio Ambiente",
    items: [
      "RCA",
      "DS N°40 (act. DS N°17/2025)",
      "Normas SMA",
      "Permisos sectoriales",
    ],
  },
  {
    title: "Estándares Internacionales",
    subtitle: "Voluntarios",
    items: ["ISO 45001", "ISO 14001", "ISO 9001", "Modelos de gestión SIG"],
  },
  {
    title: "Exigencias de Mandantes",
    items: ["SIGO", "RESSO", "RECSS", "Auditorías de contratistas"],
  },
];

export default function SstRegulationCategories() {
  return (
    <section className="container mx-auto py-16 sm:py-20">
      <SectionHeading
        eyebrow="Cobertura integral"
        title="Toda la normativa SST, HSE y de medio ambiente en un solo lugar"
        description="Nuestro equipo legal mantiene la matriz actualizada en las cuatro dimensiones que más le importan a tu operación."
      />
      <div className=" bg-card-background mx-auto max-w-6xl overflow-hidden rounded-3xl shadow-sm">
        <div className="divide-border divide-y">
          {regulationCategories.map((category, index) => (
            <article
              key={category.title}
              className="group hover:bg-primary/5 grid gap-5 px-5 py-6 transition-colors sm:px-7 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.7fr)] lg:items-center lg:gap-10 lg:px-9"
            >
              <div className="flex items-center gap-4">
                <span className="border-primary/25 bg-primary/10 text-primary group-hover:bg-primary flex size-11 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold transition-colors group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-text text-lg leading-6 font-extrabold">
                    {category.title}
                  </h3>
                  {category.subtitle && (
                    <p className="text-text/55 mt-1 text-xs font-semibold tracking-wider uppercase">
                      {category.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="border-border bg-background text-text/80 rounded-full border px-3.5 py-2 text-sm leading-5 font-semibold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
