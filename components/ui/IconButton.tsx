"use client";
import { cn } from "@/utils/cn";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";
import MoonIcon from "@/public/icons/moon.svg";
import MenuIcon from "@/public/icons/menu.svg";
import CloseIcon from "@/public/icons/close.svg";

const icons = {
  "arrow-right": ArrowRightIcon,
  moon: MoonIcon,
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
};

export default function IconButton({
  icon,
  onClick,
  className,
  iconClassName,
  alt,
}: IconButtonProps) {
  const Icon = icons[icon];

  return (
    <button
      aria-label={alt}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 cursor-pointer",
        "bg-transparent hover:bg-white/10 active:bg-white/20",
        className
      )}
    >
      <Icon
        className={cn(
          "w-6 h-6 fill-current text-white pointer-events-none",
          iconClassName
        )}
      />
    </button>
  );
}
