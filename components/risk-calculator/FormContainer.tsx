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
        "md:px-16 px-8 md:py-12 py-8 bg-card-background text-text rounded-3xl shadow-lg",
        className
      )}
    >
      {step && totalSteps && (
        <div className="">
          <span className="text-sm text-primary dark:text-white">
            PASO {step}/{totalSteps}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}
