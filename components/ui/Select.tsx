"use client";

import { cn } from "@/utils/cn";
import { SelectHTMLAttributes } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  fullWidth?: boolean;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  label,
  fullWidth = false,
  placeholder,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
      {label && (
        <label className="text-text text-sm font-semibold">{label}</label>
      )}
      <select
        className={cn(
          "bg-input-bg border-input-border text-text focus:border-primary w-full rounded-lg border px-4 py-3 text-sm font-semibold transition-colors focus:outline-none",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
