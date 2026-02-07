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
      <div className="flex items-start gap-2 flex-col md:flex-row md:items-center">
        <span className="text-lg font-bold">{question}</span>
        {isMultipleChoice && (
          <div className="px-2 py-1 bg-[#F1F5F9] dark:bg-[#334155] rounded-full shrink-0 flex items-center justify-center">
            <span className="text-xs">Selección múltiple</span>
          </div>
        )}
      </div>
    </div>
  );
}
