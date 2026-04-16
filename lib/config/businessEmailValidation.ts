import freeEmailDomains from "free-email-domains";

const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSE_VALUES = new Set(["0", "false", "no", "off"]);
const PUBLIC_BUSINESS_EMAIL_VALIDATION_ENV_VALUE =
  process.env.NEXT_PUBLIC_VALIDATE_BUSINESS_EMAILS;
const SERVER_BUSINESS_EMAIL_VALIDATION_ENV_VALUE =
  process.env.VALIDATE_BUSINESS_EMAILS;

function getBusinessEmailValidationEnvValue() {
  if (
    typeof PUBLIC_BUSINESS_EMAIL_VALIDATION_ENV_VALUE === "string" &&
    PUBLIC_BUSINESS_EMAIL_VALIDATION_ENV_VALUE.trim() !== ""
  ) {
    return PUBLIC_BUSINESS_EMAIL_VALIDATION_ENV_VALUE;
  }

  if (
    typeof window === "undefined" &&
    typeof SERVER_BUSINESS_EMAIL_VALIDATION_ENV_VALUE === "string" &&
    SERVER_BUSINESS_EMAIL_VALIDATION_ENV_VALUE.trim() !== ""
  ) {
    return SERVER_BUSINESS_EMAIL_VALIDATION_ENV_VALUE;
  }

  return undefined;
}

export function isBusinessEmailValidationEnabled() {
  const rawValue = getBusinessEmailValidationEnvValue();

  if (!rawValue) {
    return true;
  }

  const normalizedValue = rawValue.trim().toLowerCase();

  if (FALSE_VALUES.has(normalizedValue)) {
    return false;
  }

  if (TRUE_VALUES.has(normalizedValue)) {
    return true;
  }

  return true;
}

export function hasBusinessEmailDomain(email: string) {
  const domain = email.trim().split("@")[1]?.toLowerCase();

  return !!domain && !freeEmailDomains.includes(domain);
}
