import ArrowRightIcon from "@/public/icons/arrow-right-alt.svg";
import EngineeringIcon from "@/public/icons/engineering.svg";
import HealthAndSafetyIcon from "@/public/icons/health-and-safety.svg";
import VerifiedIcon from "@/public/icons/verified.svg";
import { MPD_FEATURES } from "@/sections/mpd-landing/content";
import {
  PULSO_FEATURES,
  PULSO_HOW_IT_WORKS_STEPS,
  PULSO_WHAT_IS_STEPS,
} from "@/sections/pulso-landing/content";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import SolutionsAccordion from "./SolutionsAccordion";
import { HOME_AREAS, HOME_TOOLS } from "./content";

const areaIcons = [HealthAndSafetyIcon, EngineeringIcon, VerifiedIcon];
const matrix = HOME_TOOLS[0];
const pulso = HOME_TOOLS[1];
const mpd = HOME_AREAS[3];

export default function HomeSolutions() {
  return (
    <section
      id="soluciones"
      aria-labelledby="home-solutions-title"
      className="dark:bg-darkBlue bg-white py-16 sm:py-20"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-primary mb-3 text-sm font-bold tracking-wider dark:text-white">
            TECNOLOGÍA PROPIA
          </p>
          <h2
            id="home-solutions-title"
            className="text-text text-3xl leading-tight font-extrabold sm:text-4xl"
          >
            Descubre las soluciones que ofrece Isolegal
          </h2>
          <p className="text-text/75 mt-4 text-base leading-7 sm:text-lg">
            Convertimos requisitos legales en acciones concretas para controlar
            tu riesgo de cumplimiento
          </p>
        </div>
        <SolutionsAccordion
          panels={[
            {
              id: "home-matriz-legal",
              title: matrix.title,
              content: <MatrixPanel />,
            },
            {
              id: "home-pulso",
              title: pulso.title,
              themeClassName: "pulso-page-theme",
              content: <PulsoPanel />,
            },
            {
              id: "home-mpd",
              title: "Modelo de Prevención del Delito",
              themeClassName: "mpd-page-theme",
              content: <MpdPanel />,
            },
          ]}
        />
      </div>
    </section>
  );
}

function MatrixPanel() {
  return (
    <div className="space-y-6 pb-7">
      <div className="grid items-center gap-5 lg:grid-cols-[1.1fr_1fr]">
        <p className="text-text/75 text-sm leading-7 sm:text-base">
          {matrix.description}
        </p>
        <PlatformImage
          src={matrix.imageSrc!}
          alt={matrix.imageAlt!}
          caption="Matriz legal personalizada y accionable en Chile"
        />
      </div>
      <div className="border-border border-t pt-5">
        <p className="text-text/70 mb-4 text-sm leading-6">
          Áreas de cumplimiento que ya resolvemos con matriz legal, evidencia y
          alertas normativas adaptadas a cada industria.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {HOME_AREAS.slice(0, 3).map((area, index) => {
            const Icon = areaIcons[index];
            return (
              <Link
                key={area.href}
                href={area.href}
                className={cn(
                  "group bg-background border-border hover:border-primary focus-visible:outline-primary flex flex-col items-start gap-3 rounded-2xl border p-4 transition-colors",
                  area.themeClassName
                )}
              >
                <span className="bg-green-bg flex size-9 items-center justify-center rounded-full">
                  <Icon className="fill-primary size-5" aria-hidden="true" />
                </span>
                <h4 className="text-text text-sm leading-5 font-extrabold">
                  {area.title}
                </h4>
                <p className="text-text/70 flex-1 text-xs leading-5">
                  {area.description}
                </p>
                <span className="text-primary mt-auto inline-flex items-center gap-1 text-xs font-bold dark:text-(--color-primary-on-dark-gray)">
                  Conoce más
                  <ArrowRightIcon
                    className="size-4 fill-current"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <SolutionLink href={matrix.href} label={matrix.cta} />
    </div>
  );
}

function PulsoPanel() {
  const evidenceStep = PULSO_HOW_IT_WORKS_STEPS[2];
  return (
    <div className="space-y-5 pb-6">
      <p className="text-text/75 max-w-2xl text-[0.8125rem] leading-6 sm:text-sm">
        {pulso.description}
      </p>
      <div className="grid items-center gap-5 lg:grid-cols-[1fr_1.1fr]">
        <ol className="space-y-3">
          {PULSO_WHAT_IS_STEPS.map((step, index) => (
            <li
              key={step}
              className="text-text flex items-center gap-3 text-[0.8125rem] leading-5 font-semibold"
            >
              <span className="bg-green-bg flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold">
                {String(index + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <PlatformImage
          src={evidenceStep.imageSrc!}
          alt={evidenceStep.imageAlt}
          caption="Evidencia lista para auditar"
        />
      </div>
      <FeatureList items={PULSO_FEATURES.slice(0, 3)} compact />
      <SolutionLink
        href={pulso.href}
        label={pulso.cta}
        textClassName="text-darkBlue"
      />
    </div>
  );
}

function MpdPanel() {
  return (
    <div className="space-y-6 pb-7">
      <p className="text-text/75 max-w-2xl text-sm leading-7 sm:text-base">
        {mpd.description}
      </p>
      <FeatureList items={MPD_FEATURES} />
      <SolutionLink href={mpd.href} label="Conoce más" />
    </div>
  );
}

function FeatureList({
  items,
  compact = false,
}: {
  compact?: boolean;
  items: {
    title: string;
    description: string;
    Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  }[];
}) {
  return (
    <div className="border-border grid gap-5 border-t pt-5 sm:grid-cols-2">
      {items.map(({ title, description, Icon }) => (
        <div key={title} className="flex items-start gap-3">
          {Icon && (
            <span className="bg-green-bg flex size-9 shrink-0 items-center justify-center rounded-xl">
              <Icon
                className="fill-primary size-5 dark:fill-white"
                aria-hidden="true"
              />
            </span>
          )}
          <div>
            <h4
              className={cn(
                "text-text font-extrabold",
                compact ? "text-[0.8125rem]" : "text-sm"
              )}
            >
              {title}
            </h4>
            <p
              className={cn(
                "text-text/70 mt-1",
                compact ? "text-[0.8125rem] leading-5" : "text-sm leading-6"
              )}
            >
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlatformImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="bg-background border-border overflow-hidden rounded-2xl border">
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="h-full w-full object-contain"
        />
      </div>
      <figcaption className="text-text/65 border-border border-t px-4 py-2 text-xs">
        {caption}
      </figcaption>
    </figure>
  );
}

function SolutionLink({
  href,
  label,
  textClassName = "text-white",
}: {
  href: string;
  label: string;
  textClassName?: string;
}) {
  return (
    <div className="border-border flex justify-end border-t pt-5">
      <Link
        href={href}
        className={cn(
          "group bg-primary hover:bg-primary/90 focus-visible:outline-primary inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors sm:w-auto",
          textClassName
        )}
      >
        {label}
        <ArrowRightIcon
          className="size-5 fill-current transition-transform motion-safe:group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
