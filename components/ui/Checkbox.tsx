"use client";
import { InputHTMLAttributes } from "react";

export type CheckboxProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        className="bg-checkbox-bg border-input-border checked:after:bg-primary relative h-5 w-5 cursor-pointer appearance-none rounded border checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:h-3 checked:after:w-3 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:rounded-full checked:after:content-['']"
        {...props}
      />
      {label && <span className="text-text text-sm font-medium">{label}</span>}
    </label>
  );
}
