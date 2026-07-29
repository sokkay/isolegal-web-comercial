import ContactForm from "@/sections/heading/ContactForm";

const coverageItems = [
  "Ley 16.744",
  "DS N°44",
  "DS N°594",
  "ISO 45001",
  "ISO 14001",
  "SIGO / RESSO",
  "RECSS",
];

export default function SstHero() {
  return (
    <section className="bg-darkBlue text-white">
      <div className="container mx-auto grid items-start gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(480px,0.95fr)] lg:py-20 xl:gap-14">
        <div className="space-y-6 lg:sticky lg:top-28">
          <p className="text-(--color-primary-on-dark) text-sm font-extrabold tracking-[0.18em] uppercase">
            SST · HSE · Medio Ambiente
          </p>
          <h1 className="text-4xl leading-[1.06] font-extrabold tracking-[-1.5px] sm:text-5xl xl:text-6xl">
            Sistema de Gestión de Seguridad y Salud en el Trabajo para Empresas
            en Chile
          </h1>
          <p className="text-xl leading-8 font-semibold text-white/95">
            Isolegal unifica SST y HSE en una sola plataforma.
          </p>
          <p className="max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            Centraliza tu matriz legal, evidencia auditable y alertas
            normativas, sin planillas paralelas.
          </p>

          <div>
            <p className="mb-3 text-sm font-bold text-white/90">
              Cobertura normativa incluida
            </p>
            <ul
              className="flex flex-wrap gap-2"
              aria-label="Cobertura normativa"
            >
              {coverageItems.map((item) => (
                <li
                  key={item}
                  className="border-primary/45 bg-primary/15 rounded-full border px-3 py-1.5 text-sm font-semibold text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ContactForm
          messageLabel="¿Qué necesita resolver tu equipo SSOMA?"
          messagePlaceholder="Cuéntanos el desafío SST, HSE o ambiental de tu equipo..."
        />
      </div>
    </section>
  );
}
