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
  const selectedWidthPercent =
    selectedIndex >= 0 && options.length > 1
      ? (selectedIndex / (options.length - 1)) * 100
      : 0;

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
              width: `${selectedWidthPercent}%`,
            }}
          />
        )}
      </div>

      {/* Labels mobile/tablet */}
      <div className="mt-4 lg:hidden">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${Math.max(options.length, 1)}, minmax(0, 1fr))`,
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange?.(option.value)}
                className={cn(
                  "text-center text-xs leading-tight transition-colors whitespace-pre-line break-words cursor-pointer px-1",
                  isSelected
                    ? "text-primary font-bold"
                    : "text-text/60 dark:text-white/60"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Labels desktop */}
      <div className="relative mt-4 hidden lg:block">
        {options.map((option, index) => {
          const isSelected = option.value === value;
          const isFirst = index === 0;
          const isLast = index === options.length - 1;
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
                "absolute text-sm transition-colors cursor-pointer whitespace-pre-line leading-tight w-44",
                isFirst && "left-0 translate-x-0 text-left",
                isLast && "right-0 translate-x-0 text-right",
                !isFirst && !isLast && "-translate-x-1/2 text-center",
                isSelected
                  ? "text-primary font-bold"
                  : "text-text/60 dark:text-white/60"
              )}
              style={
                isFirst
                  ? { left: 0 }
                  : isLast
                    ? { right: 0 }
                    : { left: `${position}%` }
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Spacer para que los labels no se corten */}
      <div className="h-14 lg:h-12" />
    </div>
  );
}
