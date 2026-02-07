"use client";

import { cn } from "@/utils/cn";

type SliderOption = {
  value: string;
  label: string;
};

type SimpleSliderProps = {
  options: SliderOption[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function SimpleSlider({
  options,
  value,
  onChange,
}: SimpleSliderProps) {
  const selectedIndex = options.findIndex((o) => o.value === value);

  return (
    <div className="w-full px-4">
      {/* Track */}
      <div className="relative w-full h-1 bg-border rounded-full">
        {/* Dots */}
        {options.map((option, index) => {
          const isSelected = option.value === value;
          const position =
            options.length === 1
              ? 50
              : (index / (options.length - 1)) * 100;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 cursor-pointer"
              style={{ left: `${position}%` }}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all",
                  isSelected
                    ? "bg-primary border-primary scale-125"
                    : "bg-card-background border-border hover:border-primary/50"
                )}
              />
            </button>
          );
        })}

        {/* Filled track */}
        {selectedIndex >= 0 && (
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all"
            style={{
              width: `${(selectedIndex / (options.length - 1)) * 100}%`,
            }}
          />
        )}
      </div>

      {/* Labels */}
      <div className="relative mt-4">
        {options.map((option, index) => {
          const isSelected = option.value === value;
          const position =
            options.length === 1
              ? 50
              : (index / (options.length - 1)) * 100;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              className={cn(
                "absolute -translate-x-1/2 text-sm transition-colors whitespace-nowrap cursor-pointer",
                isSelected
                  ? "text-primary font-bold"
                  : "text-text/60 dark:text-white/60"
              )}
              style={{ left: `${position}%` }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Spacer para que los labels no se corten */}
      <div className="h-8" />
    </div>
  );
}
