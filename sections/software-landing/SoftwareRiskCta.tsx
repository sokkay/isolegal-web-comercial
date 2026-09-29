import RiskCalculatorBanner, {
  type RiskCalculatorInformationItem,
} from "@/sections/risk-calculator/risk-calculator-banner";
import { cn } from "@/utils/cn";

type SoftwareRiskCtaProps = {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  informationItems: RiskCalculatorInformationItem[];
  className?: string;
};

export default function SoftwareRiskCta({
  id,
  title,
  description,
  buttonText,
  informationItems,
  className,
}: SoftwareRiskCtaProps) {
  return (
    <section id={id} className={cn("pb-16 sm:pb-20", className)}>
      <div className="container mx-auto">
        <RiskCalculatorBanner
          title={title}
          description={description}
          buttonText={buttonText}
          informationItems={informationItems}
        />
      </div>
    </section>
  );
}
