import crypto from "node:crypto";

type S3Config = {
  endpointUrl: URL;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} no está configurado`);
  }

  return value;
}

function getS3Config(): S3Config {
  const endpointRaw = getRequiredEnv("AWS_ENDPOINT_URL").trim();
  const normalizedEndpoint = endpointRaw.endsWith("/")
    ? endpointRaw.slice(0, -1)
    : endpointRaw;

  return {
    endpointUrl: new URL(normalizedEndpoint),
    accessKeyId: getRequiredEnv("AWS_ACCESS_KEY_ID"),
    secretAccessKey: getRequiredEnv("AWS_SECRET_ACCESS_KEY"),
    region: getRequiredEnv("AWS_DEFAULT_REGION"),
    bucketName: getRequiredEnv("AWS_S3_BUCKET_NAME"),
  };
}

function sha256Hex(value: string): string {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

function hmac(key: crypto.BinaryLike, value: string): Buffer {
  return crypto.createHmac("sha256", key).update(value, "utf8").digest();
}

function formatAmzDate(date: Date): { amzDate: string; dateStamp: string } {
  const iso = date.toISOString().replace(/[:-]|\.\d{3}/g, "");
  return {
    amzDate: iso,
    dateStamp: iso.slice(0, 8),
  };
}

function encodePathSegments(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildSigningKey(
  secretAccessKey: string,
  dateStamp: string,
  region: string,
): Buffer {
  const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, "s3");
  return hmac(kService, "aws4_request");
}

export async function fetchBlogMediaObject(key: string): Promise<Response> {
  const normalizedKey = key.trim();
  if (!normalizedKey) {
    return new Response(JSON.stringify({ error: "Key inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const config = getS3Config();
  const encodedKey = encodePathSegments(normalizedKey);
  const objectPath = `/${config.bucketName}/${encodedKey}`;
  const objectUrl = new URL(objectPath, config.endpointUrl);
  const now = new Date();
  const { amzDate, dateStamp } = formatAmzDate(now);
  const payloadHash = sha256Hex("");
  const canonicalHeaders =
    `host:${objectUrl.host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = [
    "GET",
    objectUrl.pathname,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const credentialScope = `${dateStamp}/${config.region}/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");
  const signingKey = buildSigningKey(
    config.secretAccessKey,
    dateStamp,
    config.region,
  );
  const signature = crypto
    .createHmac("sha256", signingKey)
    .update(stringToSign, "utf8")
    .digest("hex");
  const authorization =
    "AWS4-HMAC-SHA256 " +
    `Credential=${config.accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, ` +
    `Signature=${signature}`;

  return fetch(objectUrl.toString(), {
    method: "GET",
    headers: {
      authorization,
      "x-amz-date": amzDate,
      "x-amz-content-sha256": payloadHash,
    },
    cache: "no-store",
  });
}
