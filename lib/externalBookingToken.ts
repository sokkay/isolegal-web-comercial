import { createHash } from "node:crypto";
import type PocketBase from "pocketbase";

export const EXTERNAL_BOOKING_TOKENS_COLLECTION = "external_booking_tokens";

type ExternalTokenRecord = {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  expires_at?: string;
  used_at?: string | null;
};

function escapeFilterValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function hashExternalBookingToken(rawToken: string) {
  return createHash("sha256").update(rawToken).digest("hex");
}

export async function findExternalBookingTokenRecordByRawToken(params: {
  pb: PocketBase;
  rawToken: string;
}) {
  const tokenHash = hashExternalBookingToken(params.rawToken);
  const result = await params.pb
    .collection(EXTERNAL_BOOKING_TOKENS_COLLECTION)
    .getList<ExternalTokenRecord>(1, 1, {
      filter: `token_hash = "${escapeFilterValue(tokenHash)}"`,
      sort: "-created",
    });

  return result.items[0] ?? null;
}

export function isExternalBookingTokenExpired(expiresAtIso: string | undefined) {
  if (!expiresAtIso) return true;
  const expiresAt = new Date(expiresAtIso);
  if (Number.isNaN(expiresAt.getTime())) return true;
  return expiresAt.getTime() < Date.now();
}

export function isExternalBookingTokenUsed(usedAtIso: string | null | undefined) {
  return Boolean(usedAtIso);
}

export async function consumeExternalBookingToken(params: {
  pb: PocketBase;
  tokenRecordId: string;
}) {
  await params.pb
    .collection(EXTERNAL_BOOKING_TOKENS_COLLECTION)
    .update(params.tokenRecordId, {
      used_at: new Date().toISOString(),
    });
}
