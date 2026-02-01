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
  { id: 1, imageUrl: "/images/isolgal-logo-1.jpg", alt: "Cliente 1" },
  { id: 2, imageUrl: "/images/isolgal-logo-2.jpg", alt: "Cliente 2" },
  { id: 3, imageUrl: "/images/isolgal-logo-3.jpg", alt: "Cliente 3" },
  { id: 4, imageUrl: "/images/isolgal-logo-4.jpg", alt: "Cliente 4" },
  { id: 5, imageUrl: "/images/isolgal-logo-5.jpg", alt: "Cliente 5" },
  { id: 6, imageUrl: "/images/isolgal-logo-6.jpg", alt: "Cliente 6" },
  { id: 7, imageUrl: "/images/isolgal-logo-7.jpg", alt: "Cliente 7" },
  { id: 8, imageUrl: "/images/isolgal-logo-8.jpg", alt: "Cliente 8" },
  { id: 9, imageUrl: "/images/isolgal-logo-9.jpg", alt: "Cliente 9" },
  { id: 10, imageUrl: "/images/isolgal-logo-10.jpg", alt: "Cliente 10" },
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
    <section className="bg-darkBlue py-16 text-white" id="bussiness">
      <div className="container mx-auto">
        <h2 className="mb-2 text-center text-sm font-bold tracking-wider">
          QUIENES YA CONFIARON EN ISOLEGAL
        </h2>

        <div className="embla relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {/* Duplicamos los logos para un loop infinito suave */}
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={`${logo.id}-${index}`}
                  className="embla__slide flex-[0_0_20%] min-w-0 pl-6"
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
