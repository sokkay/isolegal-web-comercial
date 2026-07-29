"use client";
import { cn } from "@/utils/cn";
import { InputHTMLAttributes } from "react";

export type InputProps = {
  fullWidth?: boolean;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  fullWidth = false,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
      {label && (
        <label className="text-text text-sm font-semibold">{label}</label>
      )}
      <input
        type="text"
        className={cn(
          "bg-input-bg border-input-border text-text placeholder:text-placeholder focus:border-primary w-full rounded-lg border px-4 py-3 text-sm font-semibold transition-colors placeholder:font-semibold focus:outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
