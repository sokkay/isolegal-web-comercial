"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

type AccordionItem = {
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
};

type AutoRotatingAccordionProps = {
  items: AccordionItem[];
  className?: string;
  autoPlayIntervalMs?: number;
  defaultActiveIndex?: number;
  onActiveChange?: (index: number) => void;
};

export default function AutoRotatingAccordion({
  items,
  className,
  autoPlayIntervalMs = 5000,
  defaultActiveIndex = 0,
  onActiveChange,
}: AutoRotatingAccordionProps) {
  const safeInitialIndex = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.min(Math.max(defaultActiveIndex, 0), items.length - 1);
  }, [defaultActiveIndex, items.length]);

  const [activeIndex, setActiveIndex] = useState(safeInitialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [mobileDirection, setMobileDirection] = useState<1 | -1>(1);

  const handleIndexChange = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    setMobileDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    setMobileDirection(1);
    setActiveIndex(safeInitialIndex);
  }, [safeInitialIndex]);

  useEffect(() => {
    onActiveChange?.(activeIndex);
  }, [activeIndex, onActiveChange]);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const intervalId = window.setInterval(() => {
      setMobileDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [autoPlayIntervalMs, isPaused, items.length]);

  if (items.length === 0) return null;

  const activeItem = items[activeIndex];

  return (
    <div
      className={cn("pt-2", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col gap-5 md:hidden">
        <div
          className="grid gap-3 mt-3"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${item.title}-${index}`}
                type="button"
                aria-label={`Ir a ${item.title}`}
                onClick={() => handleIndexChange(index)}
                className="flex h-8 w-full cursor-pointer items-center"
              >
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  {isActive ? (
                    <motion.div
                      key={`segment-${activeIndex}-${autoPlayIntervalMs}`}
                      className="h-full w-full origin-left bg-darkBlue dark:bg-white"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: autoPlayIntervalMs / 1000,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <div className="h-full w-full scale-x-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`mobile-content-${activeIndex}`}
            className="px-1 py-2"
            initial={{ opacity: 0, x: mobileDirection > 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mobileDirection > 0 ? -24 : 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h3 className="text-text text-lg font-semibold">{activeItem.title}</h3>
            <p className="text-text mt-2 text-sm">{activeItem.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hidden md:flex md:flex-col md:gap-2">
        {items.map((item, index) => {
          const isOpen = index === activeIndex;

          return (
            <motion.div
              key={`${item.title}-${index}`}
              className="relative px-4 py-3 pl-6"
              layout
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="absolute bottom-3 left-0 top-3 w-[2px] overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                {isOpen ? (
                  <motion.div
                    key={`desktop-${activeIndex}-${autoPlayIntervalMs}`}
                    className="h-full w-full origin-top bg-darkBlue dark:bg-white"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: autoPlayIntervalMs / 1000,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <div className="h-full w-full scale-y-0" />
                )}
              </div>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between text-left"
                onClick={() => handleIndexChange(index)}
                aria-expanded={isOpen}
              >
                <h3
                  className={cn(
                    "text-lg font-bold",
                    isOpen ? "text-text" : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {item.title}
                </h3>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key={`desktop-content-${index}`}
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: "easeInOut" }}
                  >
                    <motion.p
                      className="text-text mt-2 text-sm"
                      initial={{ y: -4 }}
                      animate={{ y: 0 }}
                      exit={{ y: -4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {item.description}
                    </motion.p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
