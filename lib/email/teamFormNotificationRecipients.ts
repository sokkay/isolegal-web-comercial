export function getTeamFormNotificationEmails() {
  const rawRecipients = process.env.TEAM_FORM_NOTIFICATION_EMAILS ?? "";
  const recipients = rawRecipients
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return [...new Set(recipients)];
}
