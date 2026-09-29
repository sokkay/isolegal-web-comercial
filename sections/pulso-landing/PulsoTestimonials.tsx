"use client";

import StarIcon from "@/public/icons/start.svg";
import { cn } from "@/utils/cn";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { PulsoTestimonial } from "./content";

type ApiTestimonial = {
  id: string | number;
  name: string;
  companyRole?: string;
  quote?: string;
  logoUrl: string;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matchesApiItem(apiItem: ApiTestimonial, item: PulsoTestimonial) {
  const haystack = normalize(
    `${apiItem.name} ${apiItem.companyRole ?? ""} ${apiItem.quote ?? ""}`
  );
  const person = normalize(item.personName);
  const company = normalize(item.logoMatch);

  return (
    (person.length > 0 && haystack.includes(person)) ||
    (company.length > 0 && haystack.includes(company)) ||
    haystack.includes(normalize(item.company))
  );
}

type PulsoTestimonialsProps = {
  title: string;
  description: string;
  items: PulsoTestimonial[];
  className?: string;
};

export default function PulsoTestimonials({
  title,
  description,
  items,
  className,
}: PulsoTestimonialsProps) {
  const [logos, setLogos] = useState<Record<string, string>>({});
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
      .then((data: { items?: ApiTestimonial[] }) => {
        if (!data?.items?.length) return;

        const nextLogos: Record<string, string> = {};
        for (const item of items) {
          const match = data.items.find((apiItem) =>
            matchesApiItem(apiItem, item)
          );
          if (match?.logoUrl) {
            nextLogos[item.id] = match.logoUrl;
          }
        }
        setLogos(nextLogos);
      })
      .catch(() => {});
  }, [items]);

  useEffect(() => {
    if (!emblaApi || items.length === 0) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (typeof autoplay?.play === "function") autoplay.play();
  }, [emblaApi, items.length]);

  return (
    <section
      id="testimonios-pulso"
      className={cn("dark:bg-darkBlue bg-white py-16", className)}
    >
      <div className="container mx-auto">
        <h2 className="text-text mb-4 text-center text-3xl leading-tight font-extrabold sm:text-4xl dark:text-white">
          {title}
        </h2>
        <p className="text-text/75 mx-auto mb-12 max-w-3xl text-center text-base leading-7 sm:text-lg dark:text-white/70">
          {description}
        </p>

        <div className="embla relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {items.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="embla__slide min-w-0 flex-[0_0_82%] pl-3 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <PulsoTestimonialCard
                    {...testimonial}
                    logoUrl={logos[testimonial.id]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PulsoTestimonialCard({
  company,
  quote,
  personName,
  role,
  logoUrl,
}: PulsoTestimonial & { logoUrl?: string }) {
  return (
    <article className="border-border bg-background dark:bg-surface-tonal-a10 hover:border-primary flex h-full flex-col rounded-2xl border border-dashed p-4 transition-[border-color,border-style] duration-300 hover:border-solid sm:p-5">
      <div className="mb-3 flex items-center gap-2.5">
        <LogoBadge src={logoUrl} alt={company} />
        <h3 className="text-text text-sm font-extrabold dark:text-white">
          {company}
        </h3>
      </div>
      <div className="mb-3 flex gap-0.5" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="h-3.5 w-3.5 fill-yellow-400" />
        ))}
      </div>
      <p className="text-text/80 mb-4 flex-1 text-sm leading-5 dark:text-white/80">
        &quot;{quote}&quot;
      </p>
      <div className="border-border flex items-center gap-2.5 border-t pt-3">
        <LogoBadge src={logoUrl} alt={personName} rounded="full" />
        <div className="flex min-w-0 flex-col">
          <p className="text-text text-xs font-extrabold tracking-wide uppercase dark:text-white">
            {personName}
          </p>
          <p className="text-text/60 truncate text-[11px] tracking-wide uppercase dark:text-white/60">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}

function LogoBadge({
  src,
  alt,
  rounded = "lg",
}: {
  src?: string;
  alt: string;
  rounded?: "lg" | "full";
}) {
  return (
    <div
      className={cn(
        "dark:bg-surface-a20 border-border relative flex size-8 shrink-0 items-center justify-center overflow-hidden border bg-white",
        rounded === "full" ? "rounded-full" : "rounded-[10px]"
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-1.5"
          sizes="32px"
        />
      ) : (
        <span
          className="text-primary text-sm font-extrabold"
          aria-hidden="true"
        >
          {alt.charAt(0)}
        </span>
      )}
    </div>
  );
}
