import { cn } from "@/utils/cn";
import PulsoWhatIsSteps from "./PulsoWhatIsSteps";

type PulsoWhatIsProps = {
  title: string;
  description: string;
  steps: readonly string[];
  className?: string;
};

export default function PulsoWhatIs({
  title,
  description,
  steps,
  className,
}: PulsoWhatIsProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h2 className="text-text text-3xl leading-tight font-extrabold sm:text-4xl">
            {title}
          </h2>
          <p className="text-text/75 mt-5 text-base leading-7 sm:text-lg">
            {description}
          </p>
        </div>
        <PulsoWhatIsSteps steps={steps} />
      </div>
    </section>
  );
}
