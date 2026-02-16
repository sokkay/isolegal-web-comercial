import { RiskCalculatorContext } from "@/contexts/RiskCalculator/RiskCalculatorContext";
import { useContext } from "react";

export function useRiskCalculator() {
  const context = useContext(RiskCalculatorContext);
  if (!context) {
    throw new Error(
      "useRiskCalculator debe ser usado dentro de RiskCalculatorProvider"
    );
  }
  return context;
}
