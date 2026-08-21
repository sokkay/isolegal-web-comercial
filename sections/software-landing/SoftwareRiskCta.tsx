import RiskCalculatorBanner, {
  type RiskCalculatorInformationItem,
} from "@/sections/risk-calculator/risk-calculator-banner";

type SoftwareRiskCtaProps = {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  informationItems: RiskCalculatorInformationItem[];
};

export default function SoftwareRiskCta({
  id,
  title,
  description,
  buttonText,
  informationItems,
}: SoftwareRiskCtaProps) {
  return (
    <section id={id} className="container mx-auto pb-16 sm:pb-20">
      <RiskCalculatorBanner
        title={title}
        description={description}
        buttonText={buttonText}
        informationItems={informationItems}
      />
    </section>
  );
}
