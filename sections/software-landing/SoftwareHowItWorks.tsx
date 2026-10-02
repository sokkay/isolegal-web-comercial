import { cn } from "@/utils/cn";
import SectionHeading from "./SectionHeading";
import SoftwareHowItWorksSequence from "./SoftwareHowItWorksSequence";

export type SoftwareHowItWorksStep = {
  number: string;
  title: string;
  description: string;
  imageAlt: string;
  imageSrc?: string;
};

type SoftwareHowItWorksProps = {
  title: string;
  description: string;
  steps: SoftwareHowItWorksStep[];
  className?: string;
};

export default function SoftwareHowItWorks({
  title,
  description,
  steps,
  className,
}: SoftwareHowItWorksProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto">
        <SectionHeading title={title} description={description} />
        <SoftwareHowItWorksSequence steps={steps} />
      </div>
    </section>
  );
}
