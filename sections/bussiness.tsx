"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Tipo para las imágenes que vendrán del endpoint
interface BusinessLogo {
  id: string | number;
  imageUrl: string;
  alt: string;
  companyName?: string;
}

// Datos temporales - después reemplazar con fetch al endpoint
const TEMP_LOGOS: BusinessLogo[] = [
  { id: 1, imageUrl: "/images/logos/1.png", alt: "Cliente 1" },
  { id: 2, imageUrl: "/images/logos/2.png", alt: "Cliente 2" },
  { id: 3, imageUrl: "/images/logos/3.png", alt: "Cliente 3" },
  { id: 4, imageUrl: "/images/logos/4.png", alt: "Cliente 4" },
  { id: 5, imageUrl: "/images/logos/5.png", alt: "Cliente 5" },
  { id: 6, imageUrl: "/images/logos/6.png", alt: "Cliente 6" },
  { id: 7, imageUrl: "/images/logos/7.png", alt: "Cliente 7" },
  { id: 8, imageUrl: "/images/logos/8.png", alt: "Cliente 8" },
  { id: 9, imageUrl: "/images/logos/9.png", alt: "Cliente 9" },
  { id: 10, imageUrl: "/images/logos/10.png", alt: "Cliente 10" },
  { id: 11, imageUrl: "/images/logos/11.png", alt: "Cliente 11" },
  { id: 12, imageUrl: "/images/logos/12.png", alt: "Cliente 12" },
  { id: 13, imageUrl: "/images/logos/13.png", alt: "Cliente 13" },
  { id: 14, imageUrl: "/images/logos/14.png", alt: "Cliente 14" },
  { id: 15, imageUrl: "/images/logos/15.png", alt: "Cliente 15" },
];

export default function BussinessSection() {
  const [logos, setLogos] = useState<BusinessLogo[]>(TEMP_LOGOS);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ]
  );

  // Función para cargar logos desde el endpoint (preparada para el futuro)
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        // TODO: Descomentar cuando el endpoint esté listo
        // const response = await fetch('/api/business-logos');
        // const data = await response.json();
        // setLogos(data);

        // Por ahora usa los datos temporales
        setLogos(TEMP_LOGOS);
      } catch (error) {
        console.error("Error cargando logos:", error);
        setLogos(TEMP_LOGOS); // Fallback a datos temporales
      }
    };

    fetchLogos();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <section className="bg-darkBlue py-16 text-white">
      <div className="container mx-auto">
        <h2 className="mb-2 text-center text-sm font-bold tracking-wider">
          {`Ellos ya simplificaron su cumplimiento`.toUpperCase()}
        </h2>

        <div className="embla relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {/* Duplicamos los logos para un loop infinito suave */}
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="embla__slide flex-[0_0_25%] md:flex-[0_0_20%] min-w-0 pl-6"
                >
                  <div className="relative aspect-3/2 overflow-hidden rounded-lg p-4">
                    <Image
                      src={logo.imageUrl}
                      alt={logo.alt}
                      fill
                      className="object-contain brightness-0 invert"
                      sizes="20vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
