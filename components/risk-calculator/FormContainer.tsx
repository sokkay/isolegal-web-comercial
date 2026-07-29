import { cn } from "@/utils/cn";
import { ReactNode } from "react";

type FormContainerProps = {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
  className?: string;
};

export default function FormContainer({
  children,
  step,
  totalSteps,
  className,
}: FormContainerProps) {
  return (
    <div
      className={cn(
        "bg-card-background text-text rounded-3xl px-8 py-8 shadow-lg md:px-16 md:py-12",
        className
      )}
    >
      {step && totalSteps && (
        <div className="">
          <span className="text-primary text-sm dark:text-white">
            PASO {step}/{totalSteps}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}
