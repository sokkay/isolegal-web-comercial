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
        "text-sm text-red-500 dark:text-red-400 mt-1 animate-in fade-in slide-in-from-top-1 duration-200",
        className
      )}
      role="alert"
    >
      {message}
    </p>
  );
}
