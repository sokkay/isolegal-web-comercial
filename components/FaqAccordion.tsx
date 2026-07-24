"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
  defaultOpenIndex?: number | null;
};

export default function FaqAccordion({
  items,
  className,
  defaultOpenIndex = 0,
}: FaqAccordionProps) {
  const accordionId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex !== null &&
      defaultOpenIndex >= 0 &&
      defaultOpenIndex < items.length
      ? defaultOpenIndex
      : null
  );

  if (items.length === 0) return null;

  return (
    <div className={cn("divide-border divide-y", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${accordionId}-trigger-${index}`;
        const panelId = `${accordionId}-panel-${index}`;

        return (
          <div key={item.question} className="py-1">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-start justify-between gap-5 py-5 text-left sm:items-center sm:py-6"
              >
                <span className="text-text group-hover:text-primary text-base leading-6 font-bold transition-colors sm:text-lg dark:group-hover:text-white">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-primary relative mt-1.5 block size-5 shrink-0 sm:mt-0 dark:text-green-300",
                    "before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-5 before:-translate-y-1/2 before:rounded-full before:bg-current",
                    "after:absolute after:top-0 after:left-1/2 after:h-5 after:w-0.5 after:-translate-x-1/2 after:rounded-full after:bg-current after:transition-transform after:duration-200",
                    isOpen && "after:scale-y-0"
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-text/80 max-w-4xl pr-8 pb-6 text-sm leading-7 sm:pr-12 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
