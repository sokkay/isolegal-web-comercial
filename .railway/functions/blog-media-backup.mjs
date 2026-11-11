import {
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3@3.1166.0";

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing variable: ${name}`);
  return value;
}

function client(prefix) {
  return new S3Client({
    endpoint: required(`${prefix}_ENDPOINT`),
    region: required(`${prefix}_REGION`),
    credentials: {
      accessKeyId: required(`${prefix}_ACCESS_KEY_ID`),
      secretAccessKey: required(`${prefix}_SECRET_ACCESS_KEY`),
    },
    forcePathStyle: true,
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
    maxAttempts: 3,
  });
}

async function send(client, command) {
  return client.send(command, { abortSignal: AbortSignal.timeout(300_000) });
}

async function backup() {
  const source = client("SOURCE");
  const destination = client("BACKUP");
  const sourceBucket = required("SOURCE_BUCKET");
  const backupBucket = required("BACKUP_BUCKET");
  const prefix = "blog-media/";
  let continuationToken;
  let copied = 0;
  let skipped = 0;

  do {
    const page = await send(
      source,
      new ListObjectsV2Command({
        Bucket: sourceBucket,
        ContinuationToken: continuationToken,
      })
    );

    for (const object of page.Contents ?? []) {
      if (!object.Key || !object.ETag || object.Size === undefined) {
        throw new Error("Source listing is missing object identity");
      }
      const target = { Bucket: backupBucket, Key: prefix + object.Key };
      const metadata = {
        "source-etag": object.ETag,
        "source-size": String(object.Size),
        "source-modified": object.LastModified.toISOString(),
      };
      let existing;
      try {
        existing = await send(destination, new HeadObjectCommand(target));
      } catch (error) {
        if (error.$metadata?.httpStatusCode !== 404) throw error;
      }

      if (
        existing?.ContentLength === object.Size &&
        Object.entries(metadata).every(
          ([key, value]) => existing.Metadata?.[key] === value
        )
      ) {
        skipped += 1;
        continue;
      }

      const original = await send(
        source,
        new GetObjectCommand({
          Bucket: sourceBucket,
          Key: object.Key,
          IfMatch: object.ETag,
        })
      );
      if (!original.Body || original.ContentLength !== object.Size) {
        original.Body?.destroy();
        throw new Error("Source object changed or has no readable body");
      }
      try {
        // shortcut: PutObject supports up to 5 GB per file; use multipart if blog files exceed this.
        await send(
          destination,
          new PutObjectCommand({
            ...target,
            Body: original.Body,
            ContentLength: original.ContentLength,
            ContentType: original.ContentType,
            ContentEncoding: original.ContentEncoding,
            ContentDisposition: original.ContentDisposition,
            CacheControl: original.CacheControl,
            Metadata: metadata,
          })
        );
      } finally {
        original.Body.destroy();
      }

      const verified = await send(destination, new HeadObjectCommand(target));
      if (
        verified.ContentLength !== object.Size ||
        !Object.entries(metadata).every(
          ([key, value]) => verified.Metadata?.[key] === value
        )
      ) {
        throw new Error("Backup verification failed");
      }
      copied += 1;
    }

    continuationToken = page.IsTruncated
      ? page.NextContinuationToken
      : undefined;
    if (page.IsTruncated && !continuationToken) {
      throw new Error("Source pagination is missing its continuation token");
    }
  } while (continuationToken);

  console.log(JSON.stringify({ success: true, copied, skipped }));
}

try {
  await backup();
} catch (error) {
  console.error(
    JSON.stringify({
      success: false,
      error: error.name,
      status: error.$metadata?.httpStatusCode,
      message: error.name === "Error" ? error.message : "S3 operation failed",
    })
  );
  process.exitCode = 1;
}
