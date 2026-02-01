"use client";
import { InputHTMLAttributes } from "react";

export type CheckboxProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="w-5 h-5 appearance-none bg-checkbox-bg border border-input-border rounded cursor-pointer relative checked:after:content-[''] checked:after:absolute checked:after:w-3 checked:after:h-3 checked:after:bg-primary checked:after:rounded-full checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
        {...props}
      />
      {label && (
        <span className="text-text text-sm font-medium">
          {label}
        </span>
      )}
    </label>
  );
}
