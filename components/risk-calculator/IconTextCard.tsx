import CheckIcon from "@/public/icons/check.svg";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

type IconTextCardProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  iconContainerStyle?: "circle" | "square";
  /**
   * debe ser un color de
   */
  iconContainerClassName?: string;
  className?: string;
  containerStyle?: "outline" | "filled";
  align?: "center" | "left";
  selected?: boolean;
  onClick?: () => void;
};

export default function IconTextCard({
  icon,
  title,
  description,
  iconContainerStyle = "circle",
  iconContainerClassName,
  className,
  containerStyle = "filled",
  align = "center",
  selected = false,
  onClick,
}: IconTextCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex cursor-pointer items-center gap-4 rounded-lg px-6 py-3 transition-all",
        className,
        containerStyle === "outline" ? "border-border border" : "",
        selected ? "border-primary bg-primary/10 border" : "",
        align === "left" ? "flex-row items-start" : "flex-col justify-center"
      )}
    >
      {selected ? (
        <div className="bg-primary absolute top-3 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full">
          <CheckIcon className="h-4 w-4 fill-white" />
        </div>
      ) : null}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-sm",
          iconContainerStyle === "circle"
            ? "rounded-full bg-white dark:bg-[#334155]"
            : "rounded-sm",
          iconContainerClassName
        )}
      >
        {icon}
      </div>
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          align === "left" ? "items-start" : "items-center"
        )}
      >
        <span
          className={cn(
            "text-text text-center text-lg font-bold dark:text-white",
            align === "left" ? "text-left" : "text-center"
          )}
        >
          {title}
        </span>
        {description && (
          <p className="text-text text-center text-sm leading-5 opacity-80 dark:text-white">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
