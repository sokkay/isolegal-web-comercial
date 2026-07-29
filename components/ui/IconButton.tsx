"use client";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";
import CloseIcon from "@/public/icons/close.svg";
import MenuIcon from "@/public/icons/menu.svg";
import MoonIcon from "@/public/icons/moon.svg";
import SunIcon from "@/public/icons/sun.svg";
import { cn } from "@/utils/cn";

const icons = {
  "arrow-right": ArrowRightIcon,
  moon: MoonIcon,
  sun: SunIcon,
  menu: MenuIcon,
  close: CloseIcon,
} as const;

type Icons = keyof typeof icons;

type IconButtonProps = {
  icon: Icons;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  alt?: string;
  disabled?: boolean;
};

export default function IconButton({
  icon,
  onClick,
  className,
  iconClassName,
  alt,
  disabled = false,
}: IconButtonProps) {
  const Icon = icons[icon];

  return (
    <button
      aria-label={alt}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer bg-transparent hover:bg-white/10 active:bg-white/20",
        className
      )}
    >
      <Icon
        className={cn(
          "pointer-events-none h-6 w-6 fill-current text-white",
          iconClassName
        )}
      />
    </button>
  );
}
