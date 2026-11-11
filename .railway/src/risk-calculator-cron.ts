import PocketBase from "pocketbase";
import { dispatchPendingRiskEmails } from "../../lib/email/dispatchPendingRiskEmails";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing variable: ${name}`);
  return value;
}

try {
  const pb = new PocketBase(required("POCKET_BASE_URL"));
  pb.beforeSend = (url, options) => ({
    url,
    options: { ...options, signal: AbortSignal.timeout(60_000) },
  });
  await pb
    .collection("_superusers")
    .authWithPassword(
      required("POCKET_BASE_ADMIN_EMAIL"),
      required("POCKET_BASE_ADMIN_PASSWORD")
    );
  required("ZEPTOMAIL_TOKEN");
  required("ZEPTOMAIL_FROM_EMAIL");
  const appUrl = new URL(required("APP_URL"));
  if (appUrl.protocol !== "https:") throw new Error("APP_URL must use HTTPS");
  const stats = await dispatchPendingRiskEmails(pb, appUrl.origin);
  console.log(JSON.stringify({ success: stats.failed === 0, stats }));
  if (stats.failed > 0) process.exitCode = 1;
} catch (error) {
  // Provider responses may contain addresses or tokens; only log the error class.
  console.error(
    JSON.stringify({
      success: false,
      error: error instanceof Error ? error.name : "UnknownError",
    })
  );
  process.exitCode = 1;
}
