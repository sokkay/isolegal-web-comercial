const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

export function isBusinessEmailValidationEnabled() {
  const rawValue = process.env.NEXT_PUBLIC_VALIDATE_BUSINESS_EMAILS;

  if (!rawValue) {
    return true;
  }

  return TRUE_VALUES.has(rawValue.trim().toLowerCase());
}
