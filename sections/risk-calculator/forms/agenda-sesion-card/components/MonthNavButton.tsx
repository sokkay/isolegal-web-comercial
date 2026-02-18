import { cn } from "@/utils/cn";

type MonthNavButtonProps = {
  direction: "prev" | "next";
  enabled: boolean;
  onClick: () => void;
};

export function MonthNavButton({
  direction,
  enabled,
  onClick,
}: MonthNavButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-8 w-8 cursor-pointer rounded-full text-lg transition-colors",
        enabled
          ? "text-text hover:bg-gray-100 dark:hover:bg-gray-800"
          : "cursor-not-allowed text-gray-400"
      )}
      onClick={onClick}
      disabled={!enabled}
      aria-label={direction === "prev" ? "Mes anterior" : "Mes siguiente"}
    >
      {direction === "prev" ? "<" : ">"}
    </button>
  );
}
