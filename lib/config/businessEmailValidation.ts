import freeEmailDomains from "free-email-domains";

const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSE_VALUES = new Set(["0", "false", "no", "off"]);
const COMMON_FREE_EMAIL_DOMAIN_LABELS = new Set([
  "gmail",
  "hotmail",
  "outlook",
  "yahoo",
  "icloud",
  "live",
  "msn",
  "aol",
  "protonmail",
]);
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

function isValidEmailDomain(domain: string) {
  if (!domain || domain.length > 253 || domain.includes("..")) {
    return false;
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    return false;
  }

  const domainLabelPattern = /^[a-z0-9-]+$/;
  const topLevelDomainPattern = /^[a-z]{2,24}$/;

  return labels.every((label, index) => {
    if (!label || label.length > 63) {
      return false;
    }

    if (label.startsWith("-") || label.endsWith("-")) {
      return false;
    }

    if (index === labels.length - 1) {
      return topLevelDomainPattern.test(label);
    }

    return domainLabelPattern.test(label);
  });
}

export function hasBusinessEmailDomain(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const emailParts = normalizedEmail.split("@");

  if (emailParts.length !== 2 || !emailParts[0]) {
    return false;
  }

  const domain = emailParts[1];
  if (!isValidEmailDomain(domain)) {
    return false;
  }

  if (freeEmailDomains.includes(domain)) {
    return false;
  }

  const rootLabel = domain.split(".")[0];
  return !COMMON_FREE_EMAIL_DOMAIN_LABELS.has(rootLabel);
}
