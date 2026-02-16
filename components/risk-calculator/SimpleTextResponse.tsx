import CheckIcon from "@/public/icons/check.svg";
import { cn } from "@/utils/cn";

type SimpleTextResponseProps = {
  selected: boolean;
  value: string;
  onClick: () => void;
};

export default function SimpleTextResponse({
  selected,
  value,
  onClick,
}: SimpleTextResponseProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-5 rounded-2xl cursor-pointer relative transition-all border border-border",
        selected ? "border border-primary bg-primary/10" : ""
      )}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-full z-10 flex items-center justify-center border shrink-0",
          selected
            ? "bg-primary border-primary"
            : "border-border bg-white dark:bg-[#334155]"
        )}
      >
        {selected ? <CheckIcon className="w-4 h-4 fill-white" /> : null}
      </div>
      <span className="font-bold text-text dark:text-white">{value}</span>
    </div>
  );
}
