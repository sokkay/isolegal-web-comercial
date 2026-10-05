import Logo from "@/components/Logo";
import ArrowRightIcon from "@/public/icons/arrow-right-alt.svg";
import LinkedInIcon from "@/public/icons/linkedin.svg";
import Image from "next/image";
import Link from "next/link";
import TeamTabs from "./TeamTabs";

const TEAM_PANELS = [
  {
    id: "equipo-conocimiento",
    title: "Conocimiento",
    paragraphs: [
      "Isolegal se construye sobre una base normativa creada y mantenida por abogados durante más de 10 años. No partimos desde interpretaciones genéricas: trabajamos con una biblioteca legal robusta —más de 1.300 normas y más de 4.500 artículos— estructurada para reflejar aplicabilidad real en operación. Ese conocimiento se traduce en matrices claras, preguntas guía y criterios consistentes, para que el cumplimiento se gestione con evidencia y no con suposiciones.",
    ],
    button: "Inicia hoy",
    member: {
      name: "Felipe Arriagada Z.",
      role: "Abogado especializado en Compliance, Cofundador de Isolegal",
      image: "/images/personal/felipe.png",
      linkedin: "https://www.linkedin.com/in/felipe-arriagada-zeta/",
    },
  },
  {
    id: "equipo-cercania",
    title: "Cercanía",
    paragraphs: [
      "Creemos que el cumplimiento normativo no se gestiona desde la distancia ni solo con software. Se gestiona en la operación diaria, con personas que toman decisiones bajo presión y necesitan apoyo real. Por eso, nuestra visión es acompañar a organizaciones que operan bajo alta exigencia normativa en Chile y Latinoamérica, integrando tecnología, conocimiento especializado y apoyo continuo.",
      "Nos involucramos como socios estratégicos, trabajando codo a codo con quienes tienen la responsabilidad de cumplir. Cuando existe cercanía, el cumplimiento deja de ser una carga impuesta y se transforma en un activo estratégico, capaz de generar confianza, continuidad operativa y decisiones más seguras.",
    ],
    button: "Conversemos",
    member: {
      name: "Paula Arriagada Z.",
      role: "Customer Success, Cofundadora de Isolegal",
      image: "/images/personal/paula.png",
      linkedin: "https://www.linkedin.com/in/paula-arriagada-zeta/",
    },
  },
  {
    id: "equipo-simplicidad",
    title: "Simplicidad",
    paragraphs: [
      "Nuestra misión es ayudar a las organizaciones a cumplir y demostrar el cumplimiento normativo de forma simple, trazable y confiable. Creemos que la complejidad no agrega valor: lo que agrega valor es entender qué aplica, qué hacer y cómo demostrarlo. Por eso, traducimos requisitos legales y ESG en acciones operativas claras, apoyadas por tecnología y acompañamiento experto.",
      "Así, el cumplimiento deja de ser un proceso confuso y reactivo, y se convierte en una práctica ordenada que genera confianza, sostenibilidad y mejores decisiones. Porque cuando el cumplimiento es simple, se puede sostener en el tiempo.",
    ],
    button: "¡Empecemos!",
    member: {
      name: "Claudio Arriagada I.",
      role: "Especialista en Sistemas de Gestión, Cofundador de Isolegal",
      image: "/images/personal/claudio.png",
      linkedin: "https://www.linkedin.com/in/claudio-arriagada-ibaceta/",
    },
  },
];

export default function HomeTeam() {
  return (
    <section
      id="nosotros"
      aria-labelledby="home-team-title"
      className="bg-darkBlue border-t border-white/10 py-16 text-white sm:py-20"
    >
      <div className="container mx-auto px-4! sm:px-8!">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <Logo width={160} height={40} className="mx-auto" />
          <h2 id="home-team-title" className="sr-only">
            Nosotros
          </h2>
          {/*<p className="mt-4 text-base leading-7 text-white/75">
            Conoce al equipo detrás de Isolegal. Un grupo con experiencia en
            derecho, tecnología y gestión de riesgo, dedicado a que el
            cumplimiento normativo deje de ser un problema para las empresas en
            Chile.
          </p>*/}
        </div>
        <TeamTabs
          panels={TEAM_PANELS.map((panel) => ({
            id: panel.id,
            title: panel.title,
            content: (
              <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16">
                <div className="min-w-0">
                  <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                    {panel.title}
                  </h3>
                  <div className="space-y-4 text-sm leading-7 text-white/80 sm:text-base">
                    {panel.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <Link
                    href="/contacto"
                    className="text-darkBlue mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
                  >
                    {panel.button}
                    <ArrowRightIcon
                      className="size-5 fill-current"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <figure className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
                  <Image
                    src={panel.member.image}
                    alt={panel.member.name}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 40vw, (min-width: 416px) 384px, calc(100vw - 32px)"
                    className="object-cover"
                  />
                  <figcaption className="bg-background/95 absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl px-4 py-3 shadow-md backdrop-blur-sm">
                    <div className="min-w-0 flex-1">
                      <p className="text-text text-sm font-bold">
                        {panel.member.name}
                      </p>
                      <p className="text-text/70 mt-0.5 text-xs leading-4">
                        {panel.member.role}
                      </p>
                    </div>
                    <a
                      href={panel.member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${panel.member.name}`}
                      className="bg-text flex size-11 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                    >
                      <LinkedInIcon
                        className="[&_path]:fill-background size-6"
                        aria-hidden="true"
                      />
                    </a>
                  </figcaption>
                </figure>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
}
