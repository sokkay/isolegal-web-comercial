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
        <label className="text-text font-semibold text-sm">
          {label}
        </label>
      )}
      <input
        type="text"
        className={cn(
          "w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg text-text text-sm font-semibold placeholder:text-placeholder placeholder:font-semibold focus:outline-none focus:border-primary transition-colors",
          className
        )}
        {...props}
      />
    </div>
  );
}
