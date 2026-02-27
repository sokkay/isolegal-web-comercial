export const RISK_CALCULATOR_ORIGIN_LEGACY = "web_risk_calculator";
export const RISK_CALCULATOR_ORIGIN_PENDING =
  "web_risk_calculator_email_pending";
export const RISK_CALCULATOR_ORIGIN_SENT_BOOKING =
  "web_risk_calculator_email_sent_booking";
export const RISK_CALCULATOR_ORIGIN_SENT_DELAYED =
  "web_risk_calculator_email_sent_delayed";

export const riskCalculatorPendingOrigins = [
  RISK_CALCULATOR_ORIGIN_LEGACY,
  RISK_CALCULATOR_ORIGIN_PENDING,
] as const;

export function isRiskCalculatorPendingOrigin(origin?: string | null) {
  if (!origin) return false;
  return riskCalculatorPendingOrigins.includes(
    origin as (typeof riskCalculatorPendingOrigins)[number],
  );
}
