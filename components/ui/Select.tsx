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
        <label className="text-text font-semibold text-sm">{label}</label>
      )}
      <select
        className={cn(
          "w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg text-text text-sm font-semibold focus:outline-none focus:border-primary transition-colors",
          className,
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
