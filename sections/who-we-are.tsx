import FadeIn from "@/components/FadeIn";
import LinkedInIcon from "@/public/icons/linkedin.svg";
import Image from "next/image";

const TEAM_MEMBERS = [
  {
    name: "Claudio Arriagada I.",
    role: "Especialista en Sistemas de Gestión, Cofundador de Isolegal",
    image: "/images/personal/claudio.png",
    linkedin: "https://www.linkedin.com/in/claudio-arriagada-ibaceta/",
  },
  {
    name: "Felipe Arriagada Z.",
    role: "Abogado especializado en Compliance, Cofundador de Isolegal",
    image: "/images/personal/felipe.png",
    linkedin: "https://www.linkedin.com/in/felipe-arriagada-zeta/",
  },
  {
    name: "Paula Arriagada Z.",
    role: "Customer Success, Cofundadora de Isolegal",
    image: "/images/personal/paula.png",
    linkedin: "https://www.linkedin.com/in/paula-arriagada-zeta/",
  },
];

export default function WhoWeAre() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="container mx-auto">
        <p className="text-primary mb-4 text-center text-sm font-bold tracking-wider dark:text-white">
          CONOCE A NUESTRO EQUIPO
        </p>
        <h2 className="text-text mb-4 text-center text-3xl font-bold dark:text-white">
          Quiénes somos
        </h2>
        <p className="text-text/75 mx-auto max-w-2xl text-center text-base leading-7">
          Conoce al equipo detrás de Isolegal. Un grupo con experiencia en
          derecho, tecnología y gestión de riesgo, dedicado a que el
          cumplimiento normativo deje de ser un problema para las empresas en
          Chile.
        </p>

        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, index) => (
            <FadeIn
              as="li"
              key={member.name}
              delay={index * 0.14}
              className="relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-2xl shadow-lg sm:max-w-none"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="bg-background/95 absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl px-4 py-3 shadow-md backdrop-blur-sm">
                <div className="min-w-0 flex-1">
                  <p className="text-text text-sm font-bold">{member.name}</p>
                  <p className="text-text/70 mt-0.5 text-xs leading-4">
                    {member.role}
                  </p>
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${member.name}`}
                  className="bg-text flex size-10 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                >
                  <LinkedInIcon className="[&_path]:fill-background size-6" />
                </a>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
