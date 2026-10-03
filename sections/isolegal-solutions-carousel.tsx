"use client";

import ArrowRightIcon from "@/public/icons/arrow-right-alt.svg";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { HOME_AREAS, type SolutionCard } from "./home-solutions/content";

export default function IsolegalSolutionsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: false,
    dragFree: false,
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const viewport = emblaApi?.rootNode();
    if (!viewport || !emblaApi) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (event.deltaX > 0) emblaApi.scrollNext();
      else emblaApi.scrollPrev();
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [emblaApi]);

  return (
    <div className="embla relative mt-12">
      <div
        className="embla__viewport cursor-grab overflow-x-hidden overflow-y-visible py-5 active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className="embla__container">
          {HOME_AREAS.map((solution) => (
            <div
              key={solution.title}
              className="embla__slide min-w-0 flex-[0_0_85%] px-2 hover:z-10 sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
            >
              <SolutionCard {...solution} />
            </div>
          ))}
        </div>
      </div>
      <CarouselArrow direction="prev" onClick={scrollPrev} />
      <CarouselArrow direction="next" onClick={scrollNext} />
    </div>
  );
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Solución anterior" : "Solución siguiente"}
      className={cn(
        "bg-card-background text-primary absolute top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg sm:flex",
        isPrev ? "left-0" : "right-0"
      )}
    >
      <ArrowRightIcon
        className={cn("fill-primary size-5", isPrev && "rotate-180")}
        aria-hidden="true"
      />
    </button>
  );
}

function SolutionCard({
  title,
  description,
  href,
  themeClassName,
}: SolutionCard) {
  const pointerStartX = useRef<number | null>(null);
  const hasDragged = useRef(false);

  return (
    <div className={cn("h-full", themeClassName)}>
      <Link
        href={href}
        scroll={href === "#" ? false : undefined}
        draggable={false}
        onPointerDown={(event) => {
          pointerStartX.current = event.clientX;
          hasDragged.current = false;
        }}
        onPointerMove={(event) => {
          if (pointerStartX.current === null) return;
          if (Math.abs(event.clientX - pointerStartX.current) > 8) {
            hasDragged.current = true;
          }
        }}
        onClick={(event) => {
          if (hasDragged.current) event.preventDefault();
        }}
        className="group bg-primary relative flex h-full min-h-60 flex-col gap-3 overflow-hidden rounded-2xl p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none sm:p-7"
      >
        <h3 className="text-xl font-extrabold sm:text-2xl">{title}</h3>
        <p className="flex-1 text-sm leading-5 text-white/85 sm:text-base sm:leading-6">
          {description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold">
          Conoce más
          <ArrowRightIcon
            className="size-4 fill-white transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    </div>
  );
}
