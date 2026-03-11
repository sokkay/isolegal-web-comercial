import { randomBytes, createHash } from "node:crypto";
import type PocketBase from "pocketbase";
import { z } from "zod";

export const RISK_BOOKING_TOKENS_COLLECTION = "risk_booking_tokens";
const DEFAULT_TOKEN_TTL_DAYS = 14;

type TokenRecord = {
  id: string;
  submission_id?: string;
  email?: string;
  expires_at?: string;
  used_at?: string | null;
};

const ttlDaysSchema = z.coerce.number().int().min(1).max(30);

function escapeFilterValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function hashRiskBookingToken(rawToken: string) {
  return createHash("sha256").update(rawToken).digest("hex");
}

export function generateRiskBookingToken() {
  return randomBytes(32).toString("base64url");
}

export function resolveRiskBookingTokenTtlDays() {
  return ttlDaysSchema.parse(
    process.env.RISK_CALCULATOR_BOOKING_TOKEN_TTL_DAYS ?? DEFAULT_TOKEN_TTL_DAYS,
  );
}

export function buildRiskBookingTokenExpiryDate(ttlDays: number) {
  return new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
}

export async function createRiskBookingTokenRecord(params: {
  pb: PocketBase;
  submissionId: string;
  email: string;
  ttlDays?: number;
}) {
  const rawToken = generateRiskBookingToken();
  const tokenHash = hashRiskBookingToken(rawToken);
  const ttlDays = params.ttlDays ?? resolveRiskBookingTokenTtlDays();
  const expiresAt = buildRiskBookingTokenExpiryDate(ttlDays).toISOString();

  await params.pb.collection(RISK_BOOKING_TOKENS_COLLECTION).create({
    token_hash: tokenHash,
    submission_id: params.submissionId,
    email: params.email.trim().toLowerCase(),
    expires_at: expiresAt,
    used_at: null,
  });

  return { rawToken, tokenHash, expiresAt };
}

export async function findRiskBookingTokenRecordByRawToken(params: {
  pb: PocketBase;
  rawToken: string;
}) {
  const tokenHash = hashRiskBookingToken(params.rawToken);
  const result = await params.pb
    .collection(RISK_BOOKING_TOKENS_COLLECTION)
    .getList<TokenRecord>(1, 1, {
      filter: `token_hash = "${escapeFilterValue(tokenHash)}"`,
      sort: "-created",
    });

  return result.items[0] ?? null;
}

export function isRiskBookingTokenExpired(expiresAtIso: string | undefined) {
  if (!expiresAtIso) return true;
  const expiresAt = new Date(expiresAtIso);
  if (Number.isNaN(expiresAt.getTime())) return true;
  return expiresAt.getTime() < Date.now();
}

export function isRiskBookingTokenUsed(usedAtIso: string | null | undefined) {
  return Boolean(usedAtIso);
}

export async function consumeRiskBookingToken(params: {
  pb: PocketBase;
  tokenRecordId: string;
}) {
  await params.pb.collection(RISK_BOOKING_TOKENS_COLLECTION).update(params.tokenRecordId, {
    used_at: new Date().toISOString(),
  });
}
