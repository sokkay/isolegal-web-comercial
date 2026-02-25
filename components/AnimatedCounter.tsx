"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

type CounterType = "number" | "hours" | "porcentaje" | string;

interface AnimatedCounterProps {
  value: number;
  type: CounterType;
  className?: string;
}

const formatNumberWithType = (value: number, type: CounterType) => {
  if (type === "number") return `+${value}`;
  if (type === "hours") return `${value} h`;
  if (type === "porcentaje") return `${value}%`;
  return String(value);
};

export default function AnimatedCounter({
  value,
  type,
  className = "text-6xl text-center font-bold",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {formatNumberWithType(displayValue, type)}
    </motion.span>
  );
}
