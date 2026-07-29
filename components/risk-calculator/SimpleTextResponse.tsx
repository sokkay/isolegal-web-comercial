import CheckIcon from "@/public/icons/check.svg";
import { cn } from "@/utils/cn";

type SimpleTextResponseProps = {
  selected: boolean;
  value: string;
  label?: string;
  onClick: () => void;
};

export default function SimpleTextResponse({
  selected,
  value,
  label,
  onClick,
}: SimpleTextResponseProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border-border relative flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-all",
        selected ? "border-primary bg-primary/10 border" : ""
      )}
    >
      <div
        className={cn(
          "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
          selected
            ? "bg-primary border-primary"
            : "border-border bg-white dark:bg-[#334155]"
        )}
      >
        {selected ? <CheckIcon className="h-4 w-4 fill-white" /> : null}
      </div>
      <span className="text-text font-bold dark:text-white">
        {label ?? value}
      </span>
    </div>
  );
}
