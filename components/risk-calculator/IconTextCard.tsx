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
        "flex  items-center gap-4 py-3 px-6 rounded-lg cursor-pointer relative transition-all",
        className,
        containerStyle === "outline" ? "border border-border" : "",
        selected ? "border border-primary bg-primary/10" : "",
        align === "left" ? "flex-row items-start" : " flex-col justify-center"
      )}
    >
      {selected ? (
        <div className="absolute top-3 right-2 w-6 h-6 bg-primary rounded-full z-10 flex items-center justify-center">
          <CheckIcon className="w-4 h-4 fill-white" />
        </div>
      ) : null}
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-sm shrink-0",
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
        <h3 className="text-lg font-bold text-center text-text dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-center opacity-80 leading-5 text-text dark:text-white">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
