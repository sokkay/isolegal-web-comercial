"use client";

import ArrowRightIcon from "@/public/icons/arrow-right-alt.svg";
import TableViewIcon from "@/public/icons/table-view.svg";
import VerifiedIcon from "@/public/icons/verified.svg";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { useCallback, useEffect, useRef } from "react";

type ToolCard = {
  title: string;
  description: string;
  cta: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  accent: "green" | "blue" | "lime";
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const tools: ToolCard[] = [
  {
    title: "Matriz Legal",
    description:
      "Convierte la normativa aplicable a tu empresa en Chile en requisitos claros y accionables. Actualizada continuamente por abogados especialistas y con evidencia auditable ante fiscalizaciones y certificaciones ISO.",
    cta: "Conoce Matriz Legal",
    href: "/soluciones/matriz-legal",
    imageSrc: "/images/features/dashboard-interactivo.png",
    imageAlt:
      "Dashboard de Matriz Legal con el cumplimiento general de proyectos",
    accent: "green",
    Icon: TableViewIcon,
  },
  {
    title: "PULSO",
    description:
      "Asigna actividades de cumplimiento a tus equipos y empresas contratistas, activa notificaciones automáticas y captura evidencia fotográfica y documental verificable en terreno, garantizando trazabilidad total para tus auditorías.",
    cta: "Conoce PULSO",
    href: "/soluciones/pulso",
    accent: "lime",
    Icon: VerifiedIcon,
  },
];

export default function OurToolsCarousel() {
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
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="embla__slide min-w-0 flex-[0_0_88%] px-2 hover:z-10 sm:flex-[0_0_66%] lg:flex-[0_0_52%]"
            >
              <ToolCard {...tool} />
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
      aria-label={isPrev ? "Herramienta anterior" : "Herramienta siguiente"}
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

const accentClasses = {
  green: "bg-green-bg dark:bg-primary/25",
  blue: "bg-[#e8edf5] dark:bg-slate-700/70",
  lime: "bg-[color-mix(in_srgb,#abd038_16%,white)] dark:bg-[color-mix(in_srgb,#abd038_22%,#262c3e)]",
};

function ToolCard({
  title,
  description,
  cta,
  href,
  imageSrc,
  imageAlt,
  accent,
  Icon,
}: ToolCard) {
  const pointerStartX = useRef<number | null>(null);
  const hasDragged = useRef(false);

  return (
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
      className="group bg-card-background dark:bg-surface-tonal-a10 focus-visible:ring-primary relative flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none"
    >
      <div
        className={cn(
          "relative flex aspect-5/3 items-center justify-center overflow-hidden p-5 pt-8",
          accentClasses[accent]
        )}
      >
        <span className="absolute top-3 left-3 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-sm">
          <Icon className="fill-primary size-5" aria-hidden="true" />
        </span>
        {imageSrc ? (
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-white shadow-sm">
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              draggable={false}
              sizes="(min-width: 1024px) 60vw, 85vw"
              className="pointer-events-none object-cover object-top"
            />
          </div>
        ) : (
          <div className="text-text/45 flex flex-col items-center gap-2 dark:text-white/50">
            <ImagePendingIcon />
            <span className="text-sm font-medium">Imagen pendiente</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <h3 className="text-text text-2xl font-extrabold dark:text-white">
          {title}
        </h3>
        <p className="text-text/70 flex-1 text-sm leading-5 sm:text-base sm:leading-6 dark:text-white/70">
          {description}
        </p>
        <span className="text-primary mt-2 inline-flex items-center gap-1 text-sm font-semibold dark:text-white">
          {cta}
          <ArrowRightIcon
            className="fill-primary size-4 transition-transform duration-200 group-hover:translate-x-0.5 dark:fill-white"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

function ImagePendingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <path d="m21 16-4.5-4.5-7 7" />
    </svg>
  );
}
