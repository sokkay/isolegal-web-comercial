import { cn } from "@/utils/cn";

type FormErrorProps = {
  message?: string;
  className?: string;
};

export default function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <p
      className={cn(
        "animate-in fade-in slide-in-from-top-1 mt-1 text-sm text-red-500 duration-200 dark:text-red-400",
        className
      )}
      role="alert"
    >
      {message}
    </p>
  );
}
