import { TextareaHTMLAttributes } from "react";

export type TextAreaProps = {
  label?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-text text-sm font-semibold">{label}</label>
      )}
      <textarea
        className="bg-input-bg border-input-border text-text placeholder:text-placeholder focus:border-primary w-full resize-none rounded-lg border px-4 py-3 text-sm font-semibold transition-colors placeholder:font-semibold focus:outline-none"
        rows={5}
        {...props}
      />
    </div>
  );
}
