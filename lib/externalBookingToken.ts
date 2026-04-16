import { createHash, randomBytes } from "node:crypto";
import type PocketBase from "pocketbase";
import { z } from "zod";

export const EXTERNAL_BOOKING_TOKENS_COLLECTION = "external_booking_tokens";
const DEFAULT_EXTERNAL_TOKEN_TTL_DAYS = 14;

type ExternalTokenRecord = {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  expires_at?: string;
  used_at?: string | null;
};

const ttlDaysSchema = z.coerce.number().int().min(1).max(30);

function escapeFilterValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function hashExternalBookingToken(rawToken: string) {
  return createHash("sha256").update(rawToken).digest("hex");
}

export function generateExternalBookingToken() {
  return randomBytes(32).toString("base64url");
}

export function resolveExternalBookingTokenTtlDays() {
  return ttlDaysSchema.parse(
    process.env.EXTERNAL_BOOKING_TOKEN_TTL_DAYS ?? DEFAULT_EXTERNAL_TOKEN_TTL_DAYS,
  );
}

export function buildExternalBookingTokenExpiryDate(ttlDays: number) {
  return new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
}

export async function createExternalBookingTokenRecord(params: {
  pb: PocketBase;
  name: string;
  email: string;
  company: string;
  ttlDays?: number;
}) {
  const rawToken = generateExternalBookingToken();
  const tokenHash = hashExternalBookingToken(rawToken);
  const ttlDays = params.ttlDays ?? resolveExternalBookingTokenTtlDays();
  const expiresAt = buildExternalBookingTokenExpiryDate(ttlDays).toISOString();

  await params.pb.collection(EXTERNAL_BOOKING_TOKENS_COLLECTION).create({
    token_hash: tokenHash,
    name: params.name.trim(),
    email: params.email.trim().toLowerCase(),
    company: params.company.trim(),
    expires_at: expiresAt,
    used_at: null,
  });

  return { rawToken, tokenHash, expiresAt };
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
