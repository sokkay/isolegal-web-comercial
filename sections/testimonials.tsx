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
    <section id="testimonios" className="dark:bg-darkBlue bg-white py-16">
      <div className="container mx-auto">
        <h2 className="text-text mb-2 text-center text-sm font-bold tracking-wider dark:text-white">
          TESTIMONIOS
        </h2>
        <h3 className="text-text mb-12 text-center text-3xl font-bold dark:text-white">
          Lo que dicen nuestros clientes
        </h3>

        <div className="embla relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {list.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="embla__slide min-w-0 flex-[0_0_100%] pl-4 lg:flex-[0_0_50%]"
                >
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TestimonialCard = ({
  quote,
  name: companyName,
  companyRole,
  logoUrl,
}: Testimonial) => {
  return (
    <div className="bg-background dark:bg-surface-tonal-a10 flex h-full flex-col rounded-2xl p-8">
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="h-5 w-5 fill-yellow-400" />
        ))}
      </div>
      <p className="text-text mb-6 flex-1 text-base leading-6 dark:text-white">
        &quot;{quote}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div className="dark:bg-surface-a20 relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <Image
            src={logoUrl}
            alt={companyName}
            fill
            className="object-contain p-2"
            sizes="48px"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-text text-base font-bold dark:text-white">
            {companyName}
          </h4>
          {companyRole && (
            <p className="text-text text-sm opacity-60 dark:text-white">
              {companyRole}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
