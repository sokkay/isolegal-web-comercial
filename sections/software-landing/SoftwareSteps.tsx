"use client";

import { cn } from "@/utils/cn";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "./SectionHeading";

export type SoftwareStep = {
  title: string;
  description: string;
};

type SoftwareStepsProps = {
  eyebrow?: string;
  title: string;
  description: string;
  steps: SoftwareStep[];
  className?: string;
};

export default function SoftwareSteps({
  eyebrow = "Cómo funciona",
  title,
  description,
  steps,
  className,
}: SoftwareStepsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn("dark:bg-darkBlue bg-white py-16 sm:py-20", className)}
    >
      <div className="container mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <ol className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4 md:gap-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.14,
                ease: "easeOut",
              }}
              className="relative flex gap-5 pb-4 md:block md:px-3 md:pb-0 md:text-center"
            >
              {index < steps.length - 1 ? (
                <motion.span
                  aria-hidden="true"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.14 + 0.34,
                  }}
                  className="bg-primary/30 absolute top-12 bottom-[-1.5rem] left-6 w-px md:top-6 md:right-[-50%] md:bottom-auto md:left-[calc(50%+1.5rem)] md:h-px md:w-auto"
                />
              ) : null}
              <motion.span
                initial={shouldReduceMotion ? false : { scale: 0.65 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: shouldReduceMotion ? 0 : index * 0.14 + 0.08,
                }}
                className="bg-primary shadow-primary/25 relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full text-base font-extrabold text-white shadow-lg md:mx-auto"
              >
                {index + 1}
              </motion.span>
              <div className="pt-1 md:pt-0">
                <h3 className="text-text mt-0 text-lg font-extrabold md:mt-5">
                  {step.title}
                </h3>
                <p className="text-text/70 mt-2 text-sm leading-6">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
