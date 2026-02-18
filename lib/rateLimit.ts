import Redis from "ioredis";
import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";

const redisUrl = process.env.REDIS_URL;
type JsonResponseInit = { status: number; headers?: HeadersInit };
type RateLimitFailedResult = {
  success: false;
  status: number;
  body: { error: string };
  retryAfterSeconds: number;
};
type RateLimitSuccessResult = { success: true };
export type ScheduleMeetingRateLimitResult =
  | RateLimitSuccessResult
  | RateLimitFailedResult;

const redisClient = redisUrl
  ? new Redis(redisUrl, {
      enableOfflineQueue: false,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    })
  : null;
let redisConnectingPromise: Promise<void> | null = null;

const scheduleMeetingRateLimiterByIp = redisClient
  ? new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "rl:schedule:ip",
      points: 20,
      duration: 10 * 60,
    })
  : null;

const scheduleMeetingRateLimiterByEmail = redisClient
  ? new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "rl:schedule:email",
      points: 10,
      duration: 10 * 60,
    })
  : null;

const scheduleMeetingBookRateLimiterByIp = redisClient
  ? new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "rl:schedule:book:ip",
      points: 8,
      duration: 10 * 60,
    })
  : null;

const scheduleMeetingBookRateLimiterByEmail = redisClient
  ? new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "rl:schedule:book:email",
      points: 4,
      duration: 10 * 60,
    })
  : null;

function isRateLimiterRes(value: unknown): value is RateLimiterRes {
  return (
    typeof value === "object" &&
    value !== null &&
    "msBeforeNext" in value &&
    "remainingPoints" in value
  );
}

function getClientIpFromHeaders(headers: Headers) {
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const [first] = xForwardedFor.split(",");
    if (first?.trim()) return first.trim();
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp?.trim()) return xRealIp.trim();

  return "unknown";
}

async function ensureRedisConnection() {
  if (!redisClient) return;

  if (redisClient.status === "ready" || redisClient.status === "connect") {
    return;
  }

  if (!redisConnectingPromise) {
    redisConnectingPromise = redisClient.connect().finally(() => {
      redisConnectingPromise = null;
    });
  }

  await redisConnectingPromise;
}

export async function consumeScheduleMeetingRateLimit(params: {
  headers: Headers;
  email: string;
}): Promise<ScheduleMeetingRateLimitResult> {
  const { headers, email } = params;

  if (
    !redisUrl ||
    !scheduleMeetingRateLimiterByIp ||
    !scheduleMeetingRateLimiterByEmail
  ) {
    return {
      success: false as const,
      status: 500,
      body: {
        error: "Falta REDIS_URL para rate limiting",
      },
      retryAfterSeconds: 0,
    };
  }

  const ip = getClientIpFromHeaders(headers);
  const normalizedEmail = email.trim().toLowerCase();

  try {
    await ensureRedisConnection();
    await Promise.all([
      scheduleMeetingRateLimiterByIp.consume(ip),
      scheduleMeetingRateLimiterByEmail.consume(normalizedEmail),
    ]);

    return {
      success: true as const,
    };
  } catch (error) {
    console.error("Error al consumir el límite de solicitudes:", error);
    if (isRateLimiterRes(error)) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil(error.msBeforeNext / 1000)
      );

      return {
        success: false as const,
        status: 429,
        body: {
          error: "Demasiadas solicitudes. Intenta nuevamente más tarde.",
        },
        retryAfterSeconds,
      };
    }

    return {
      success: false as const,
      status: 500,
      body: {
        error: "No se pudo validar el límite de solicitudes",
      },
      retryAfterSeconds: 0,
    };
  }
}

export async function consumeScheduleMeetingBookRateLimit(params: {
  headers: Headers;
  email: string;
}): Promise<ScheduleMeetingRateLimitResult> {
  const { headers, email } = params;

  if (
    !redisUrl ||
    !scheduleMeetingBookRateLimiterByIp ||
    !scheduleMeetingBookRateLimiterByEmail
  ) {
    return {
      success: false as const,
      status: 500,
      body: {
        error: "Falta REDIS_URL para rate limiting",
      },
      retryAfterSeconds: 0,
    };
  }

  const ip = getClientIpFromHeaders(headers);
  const normalizedEmail = email.trim().toLowerCase();

  try {
    await ensureRedisConnection();
    await Promise.all([
      scheduleMeetingBookRateLimiterByIp.consume(ip),
      scheduleMeetingBookRateLimiterByEmail.consume(normalizedEmail),
    ]);

    return {
      success: true as const,
    };
  } catch (error) {
    console.error("Error al consumir el límite de reservas:", error);
    if (isRateLimiterRes(error)) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil(error.msBeforeNext / 1000),
      );

      return {
        success: false as const,
        status: 429,
        body: {
          error:
            "Demasiados intentos de reserva. Intenta nuevamente más tarde.",
        },
        retryAfterSeconds,
      };
    }

    return {
      success: false as const,
      status: 500,
      body: {
        error: "No se pudo validar el límite de reservas",
      },
      retryAfterSeconds: 0,
    };
  }
}

export function buildRateLimitResponseInit(
  result: RateLimitFailedResult
): JsonResponseInit {
  return {
    status: result.status,
    headers:
      result.status === 429
        ? { "Retry-After": String(result.retryAfterSeconds) }
        : undefined,
  };
}
