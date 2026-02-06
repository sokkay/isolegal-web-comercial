"use client";
import StarIcon from "@/public/icons/start.svg";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string | number;
  quote: string;
  name: string;
  companyRole?: string;
  logoUrl: string;
}

export default function Testimonials() {
  const [list, setList] = useState<Testimonial[]>([]);
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
    fetch("/api/testimonios")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { items?: Testimonial[] }) => {
        if (data?.items?.length) {
          setList(
            data.items.map((t) => ({
              ...t,
              logoUrl: t.logoUrl || "/images/isolgal-logo-8.jpg",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!emblaApi || list.length === 0) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (typeof autoplay?.play === "function") autoplay.play();
  }, [emblaApi, list.length]);

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
              {list.map((testimonial) => (
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
    <div className="bg-background rounded-2xl p-8 flex flex-col h-full">
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
