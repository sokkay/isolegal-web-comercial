"use client";

import { cn } from "@/utils/cn";
import { useRef, useState, type ReactNode } from "react";
import styles from "./home-team.module.css";

type TeamPanel = {
  id: string;
  title: string;
  content: ReactNode;
};

export default function TeamTabs({ panels }: { panels: TeamPanel[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="mx-auto max-w-6xl">
      <div
        role="tablist"
        aria-label="Los valores de nuestro equipo"
        className="mx-auto mb-8 grid max-w-2xl grid-cols-3 gap-1 rounded-xl border border-white/10 bg-white/5 p-1.5 sm:mb-10"
      >
        {panels.map((panel, index) => (
          <button
            key={panel.id}
            ref={(node) => {
              triggerRefs.current[index] = node;
            }}
            id={`${panel.id}-tab`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`${panel.id}-panel`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              let next: number;
              switch (event.key) {
                case "ArrowRight":
                  next = (index + 1) % panels.length;
                  break;
                case "ArrowLeft":
                  next = (index - 1 + panels.length) % panels.length;
                  break;
                case "Home":
                  next = 0;
                  break;
                case "End":
                  next = panels.length - 1;
                  break;
                default:
                  return;
              }
              event.preventDefault();
              setActiveIndex(next);
              triggerRefs.current[next]?.focus({ preventScroll: true });
            }}
            className={cn(
              "min-h-12 cursor-pointer rounded-lg px-1 py-3 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-4 sm:text-base",
              activeIndex === index
                ? "text-darkBlue bg-white shadow-sm"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            )}
          >
            {panel.title}
          </button>
        ))}
      </div>
      {panels.map((panel, index) => (
        <div
          key={panel.id}
          id={`${panel.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${panel.id}-tab`}
          hidden={activeIndex !== index}
          tabIndex={0}
          className={cn(
            "rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white",
            activeIndex === index && styles.panel
          )}
        >
          {panel.content}
        </div>
      ))}
    </div>
  );
}
