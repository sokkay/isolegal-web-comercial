"use client";
import StarIcon from "@/public/icons/start.svg";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";

interface Testimonial {
  id: string | number;
  quote: string;
  name: string;
  companyRole?: string;
  logoUrl: string;
}

// Array de testimonios - agrega aquí tus testimonios
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Isolegal ha sido un antes y un después en cómo manejamos el cumplimiento normativo. Más que una plataforma, se ha convertido en una herramienta clave para tener orden y claridad sobre nuestras obligaciones legales. Lo que más valoramos es poder anticiparnos a los cambios, en vez de estar siempre reaccionando. La automatización y trazabilidad que ofrece nos han ayudado a trabajar de forma más eficiente y a mejorar la coordinación con otras áreas. En resumen, hoy gestionamos el cumplimiento con más control y seguridad.",
    name: "Roberto Alarcón",
    companyRole: "Jefe de Aseguramiento de Calidad",
    logoUrl: "/images/isolgal-logo-8.jpg",
  },
  {
    id: 2,
    quote:
      "Desde nuestra perspectiva, la plataforma ha representado un gran avance en la gestión del cumplimiento normativo, facilitando el trabajo de contratos y asesores al proporcionar una herramienta más dinámica y amigable en comparación con el uso tradicional de matrices en Excel. El valor agregado más significativo ha sido la optimización del tiempo y la eficiencia en la gestión, ya que la plataforma permite enfocarnos en el análisis y cumplimiento de las normativas en lugar de destinar esfuerzos en la integración y actualización manual de los requisitos legales. Esto nos ha permitido abordar el cumplimiento de manera más estratégica y proactiva.",
    name: "Patricia A. Gavilán",
    companyRole: "Jefe de Calidad y Seguridad Ocupacional",
    logoUrl: "/images/isolgal-logo-3.jpg",
  },
  {
    id: 3,
    quote:
      "En Orbit Garant Chile S.A., la gestión eficiente de los aspectos legales es una prioridad para garantizar el cumplimiento normativo y la continuidad operativa de nuestras actividades. (…) Desde que comenzamos a utilizar ISOLEGAL, hemos experimentado una mejora sustancial en la identificación, seguimiento y control de nuestros requisitos legales aplicables, tanto a nivel ambiental, como en materia de seguridad, salud ocupacional y normativa laboral. La plataforma nos ha permitido contar con información actualizada, centralizada y accesible, lo cual ha facilitado la toma de decisiones informadas y oportunas. Destacamos especialmente la capacidad de ISOLEGAL para emitir alertas automáticas sobre cambios normativos, así como su funcionalidad para asignar responsables y llevar el registro de cumplimiento, lo que ha mejorado nuestra trazabilidad y transparencia en auditorías internas y externas.",
    name: "Rubén Medina",
    companyRole: "Coordinador Hseq",
    logoUrl: "/images/isolgal-logo-9.jpg",
  },
  {
    id: 4,
    quote: "En AVUS, la experiencia de trabajo junto a ISOLEGAL ha sido altamente positiva. Destacamos especialmente su profesionalismo, flexibilidad y capacidad de análisis, cualidades que han fortalecido de manera concreta el trabajo colaborativo entre los equipos, particularmente en el desarrollo de las Matrices Legales para CMP. Tanto la plataforma como el acompañamiento del equipo de ISOLEGAL han aportado un valor tangible a nuestra gestión de cumplimiento, permitiéndonos abordar los requerimientos normativos con mayor claridad, orden y consistencia, y consolidar un enfoque más sólido en el control de nuestras obligaciones legales",
    name: "Rodrigo Bravo C",
    companyRole: "Socio Fundador & Risk Architect Lead",
    logoUrl: "/images/isolgal-logo-6.jpg",
  },
  {
    id: 5,
    quote: "El trabajo realizado junto a Isolegal fue un factor clave para que ESM destacara en su auditoría de normas ISO, particularmente en el control y cumplimiento de sus obligaciones legales. Más que una plataforma tecnológica, Isolegal actúa como un socio estratégico, gestionando activamente la normativas aplicables y manteniendo actualizada nuestra matriz legal, la cual nos permitió evidenciar nuestro cumplimiento. Esto nos permitió enfrentar la auditoría con orden, trazabilidad y plena confianza en la solidez de nuestro sistema",
    name: "Alex Rivera T",
    companyRole: "Subgerente SSMA - Empresa de Soluciones Mineras, filial ENEX",
    logoUrl: "/images/isolgal-logo-5.jpg",
  },
];
export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        playOnInit: true,
      }),
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <div id="testimonios" className="bg-white py-16">
      <div className="container mx-auto">
        <h2 className="mb-2 text-center text-sm font-bold tracking-wider">
          TESTIMONIOS
        </h2>
        <h3 className="mb-12 text-center text-3xl font-bold">
          Lo que dicen nuestros clientes
        </h3>

        <div className="embla relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="embla__slide flex-[0_0_100%] lg:flex-[0_0_50%] min-w-0 pl-4"
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TestimonialCard = ({
  quote,
  name: companyName,
  companyRole,
  logoUrl,
}: Testimonial) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 flex flex-col h-full">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="w-5 h-5 fill-yellow-400" />
        ))}
      </div>
      <p className="text-base leading-6 mb-6 flex-1">&quot;{quote}&quot;</p>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shrink-0 relative overflow-hidden">
          <Image
            src={logoUrl}
            alt={companyName}
            fill
            className="object-contain p-2"
            sizes="48px"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-base font-bold">{companyName}</h4>
          {companyRole && <p className="text-sm opacity-60">{companyRole}</p>}
        </div>
      </div>
    </div>
  );
};
