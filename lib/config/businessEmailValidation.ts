import freeEmailDomains from "free-email-domains";

const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSE_VALUES = new Set(["0", "false", "no", "off"]);
const BUSINESS_EMAIL_VALIDATION_ENV_KEYS = [
  "VALIDATE_BUSINESS_EMAILS",
  "NEXT_PUBLIC_VALIDATE_BUSINESS_EMAILS",
] as const;

function getBusinessEmailValidationEnvValue() {
  for (const envKey of BUSINESS_EMAIL_VALIDATION_ENV_KEYS) {
    const value = process.env[envKey];

    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
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
