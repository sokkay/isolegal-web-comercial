"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";

type IconButtonProps = {
  icon: string;
  onClick?: () => void;
  className?: string;
  alt?: string;
};

export default function IconButton({
  icon,
  onClick,
  className,
  alt = "icon",
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 cursor-pointer",
        "bg-transparent hover:bg-white/10 active:bg-white/20",
        className
      )}
    >
      <Image
        src={`/icons/${icon}.svg`}
        alt={alt}
        width={24}
        height={24}
        className="brightness-0 invert pointer-events-none" // Para que los iconos negros se vean blancos en el header oscuro
      />
    </button>
  );
}
