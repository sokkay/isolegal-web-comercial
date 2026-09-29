"use client";

import { cn } from "@/utils/cn";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const CHIP_DELAYS = [0.1, 0.65, 1.2];
const CSS_EASE = [0.25, 0.1, 0.25, 1] as const;

type PulsoWhatIsStepsProps = {
  steps: readonly string[];
};

export default function PulsoWhatIsSteps({ steps }: PulsoWhatIsStepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const shouldReduceMotion = useReducedMotion();
  const visible = shouldReduceMotion || isInView;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md lg:mx-0">
      <motion.span
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { scaleY: 0 }}
        animate={visible ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.4, ease: CSS_EASE }}
        className="bg-primary/40 absolute top-4 bottom-4 left-7.5 w-0.5 origin-top"
      />
      <ol className="relative space-y-5">
        {steps.map((step, index) => (
          <motion.li
            key={step}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.55,
              delay: shouldReduceMotion ? 0 : (CHIP_DELAYS[index] ?? 0.1),
              ease: CSS_EASE,
            }}
            className={cn(
              "border-primary/40 bg-card-background flex items-center gap-3 rounded-full border py-2 pr-6 pl-3 shadow-sm"
            )}
          >
            <span className="bg-primary text-darkBlue flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold">
              {index + 1}
            </span>
            <span className="text-text text-[0.95rem] leading-6 font-bold dark:text-white">
              {step}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
