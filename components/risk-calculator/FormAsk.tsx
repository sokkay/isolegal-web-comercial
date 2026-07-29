import { cn } from "@/utils/cn";
import CircleNumber from "./CircleNumber";

type FormAskProps = {
  question: string;
  number: number;
  isMultipleChoice?: boolean;
  className?: string;
};

export default function FormAsk({
  question,
  number,
  isMultipleChoice = false,
  className,
}: FormAskProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <CircleNumber number={number} />
      <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
        <span className="text-lg font-bold">{question}</span>
        {isMultipleChoice && (
          <div className="flex shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] px-2 py-1 dark:bg-[#334155]">
            <span className="text-xs">Selección múltiple</span>
          </div>
        )}
      </div>
    </div>
  );
}
