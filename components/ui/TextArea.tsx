import { TextareaHTMLAttributes } from "react";

export type TextAreaProps = {
  label?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-text font-semibold text-sm">
          {label}
        </label>
      )}
      <textarea
        className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg text-text text-sm font-semibold placeholder:text-placeholder placeholder:font-semibold focus:outline-none focus:border-primary transition-colors resize-none"
        rows={5}
        {...props}
      />
    </div>
  );
}
