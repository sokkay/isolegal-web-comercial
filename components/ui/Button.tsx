"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";

type ButtonProps = {
  text: string;
  variant?: "contained" | "outline";
  color?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
};

export default function Button({
  text,
  variant = "contained",
  color = "primary",
  className,
  onClick,
  disabled,
  loading,
  fullWidth,
  href,
}: ButtonProps) {
  const variants = {
    contained: {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-white text-primary hover:bg-background",
    },
    outline: {
      primary: "border-1 border-primary text-primary bg-transparent hover:bg-primary/10",
      secondary: "border-1 border-primary text-primary bg-transparent hover:bg-primary/10",
    },
  };

  const baseClasses = cn(
    "px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer inline-block text-center",
    fullWidth && "w-full",
    variants[variant][color],
    className
  );

  const content = loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      <span>Cargando...</span>
    </div>
  ) : (
    <span>{text}</span>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}
