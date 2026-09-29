"use client";

import SectionHeading from "@/sections/software-landing/SectionHeading";
import { cn } from "@/utils/cn";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { PulsoHowItWorksStep } from "./content";

type PulsoHowItWorksProps = {
  title: string;
  description: string;
  steps: PulsoHowItWorksStep[];
  className?: string;
};

export default function PulsoHowItWorks({
  title,
  description,
  steps,
  className,
}: PulsoHowItWorksProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const isPinned = !shouldReduceMotion;

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!isPinned) return;
    const next = Math.min(
      steps.length - 1,
      Math.max(0, Math.round(value * (steps.length - 1)))
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  const scrollToStep = (index: number) => {
    const el = pinRef.current;
    if (!el || steps.length < 2) {
      setActiveIndex(index);
      return;
    }

    const start = el.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(el.offsetHeight - window.innerHeight, 1);
    window.scrollTo({
      top: start + (index / (steps.length - 1)) * range,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const activeStep = steps[activeIndex] ?? steps[0];

  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto">
        <SectionHeading title={title} description={description} />

        <div className="lg:hidden">
          <PulsoBrowserFrame step={steps[0]} />
          <ol className="mt-10 space-y-8">
            {steps.map((step) => (
              <li key={step.number}>
                <StepCopy step={step} active />
              </li>
            ))}
          </ol>
        </div>

        <div
          ref={pinRef}
          className="hidden lg:block"
          style={isPinned ? { height: `${steps.length * 100}vh` } : undefined}
        >
          <div
            className={cn(
              "grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-16",
              isPinned && "sticky top-20 h-[calc(100svh-5rem)]"
            )}
          >
            <ol className="flex flex-col">
              {steps.map((step, index) => {
                const active = index === activeIndex;
                return (
                  <li key={step.number}>
                    <button
                      type="button"
                      onClick={() =>
                        isPinned ? scrollToStep(index) : setActiveIndex(index)
                      }
                      aria-current={active ? "step" : undefined}
                      className={cn(
                        "border-border w-full rounded-2xl border-b py-8 text-left transition-opacity duration-300 last:border-b-0",
                        active ? "opacity-100" : "opacity-35 hover:opacity-70"
                      )}
                    >
                      <StepCopy step={step} active={active} />
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="relative min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.number}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PulsoBrowserFrame step={activeStep} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCopy({
  step,
  active,
}: {
  step: PulsoHowItWorksStep;
  active: boolean;
}) {
  return (
    <>
      <span
        className={cn(
          "block text-sm font-extrabold tracking-[0.08em]",
          active ? "text-primary" : "text-text/50"
        )}
      >
        {step.number}
      </span>
      <h3 className="text-text mt-2 text-xl font-extrabold sm:text-[1.35rem]">
        {step.title}
      </h3>
      <p className="text-text/70 mt-2 max-w-md text-[0.95rem] leading-7">
        {step.description}
      </p>
    </>
  );
}

function PulsoBrowserFrame({ step }: { step: PulsoHowItWorksStep }) {
  return (
    <div className="border-border bg-card-background overflow-hidden rounded-[22px] border shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)]">
      <div className="border-border bg-background flex items-center gap-1.5 border-b px-4 py-3">
        <span className="bg-primary/35 size-2.5 rounded-full" />
        <span className="bg-primary/60 size-2.5 rounded-full" />
        <span className="bg-primary size-2.5 rounded-full" />
        <span className="text-text/50 ml-auto text-xs font-bold">
          PULSO · App
        </span>
      </div>
      <div className="relative aspect-4/3 min-h-57.5">
        {step.imageSrc ? (
          <Image
            src={step.imageSrc}
            alt={step.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <div className="text-text/45 flex h-full flex-col items-center justify-center gap-2 px-6 dark:text-white/50">
            <ImagePendingIcon />
            <span className="text-sm font-medium">Imagen pendiente</span>
            <span className="text-text/40 max-w-xs text-center text-xs leading-5">
              {step.imageAlt}
            </span>
          </div>
        )}
      </div>
    </div>
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
