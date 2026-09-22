"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
