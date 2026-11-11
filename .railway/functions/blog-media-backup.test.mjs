import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { Readable } from "node:stream";
import test from "node:test";
import { createContext, SourceTextModule, SyntheticModule } from "node:vm";

const source = await readFile(
  new URL("./blog-media-backup.mjs", import.meta.url),
  "utf8"
);
const commandNames = [
  "GetObjectCommand",
  "HeadObjectCommand",
  "ListObjectsV2Command",
  "PutObjectCommand",
];

async function run({
  failUpload = false,
  denyHead = false,
  badPage = false,
} = {}) {
  const object = {
    Key: "blog/imagen con espacios.png",
    ETag: '"source-etag"',
    Size: 4,
    LastModified: new Date("2026-11-11T00:00:00Z"),
  };
  const metadata = {
    "source-etag": object.ETag,
    "source-size": "4",
    "source-modified": object.LastModified.toISOString(),
  };
  const stored = new Map([
    ["blog-media/existing.png", { ContentLength: 4, Metadata: metadata }],
    ["blog-media/deleted-from-source.png", { ContentLength: 9 }],
  ]);
  const calls = [];
  const logs = [];
  const errors = [];
  const process = {
    env: Object.fromEntries(
      ["SOURCE", "BACKUP"].flatMap((prefix) =>
        [
          "ENDPOINT",
          "REGION",
          "ACCESS_KEY_ID",
          "SECRET_ACCESS_KEY",
          "BUCKET",
        ].map((field) => [`${prefix}_${field}`, `${prefix}-${field}`])
      )
    ),
    exitCode: 0,
  };
  const sdk = Object.fromEntries(
    commandNames.map((name) => [
      name,
      class {
        constructor(input) {
          this.name = name;
          this.input = input;
        }
      },
    ])
  );
  sdk.S3Client = class {
    async send({ name, input }) {
      calls.push({ name, input });
      if (name === "ListObjectsV2Command") {
        if (!input.ContinuationToken) {
          return {
            Contents: [{ ...object, Key: "existing.png" }, object],
            IsTruncated: true,
            NextContinuationToken: badPage ? undefined : "second-page",
          };
        }
        assert.equal(input.ContinuationToken, "second-page");
        return { Contents: [{ ...object, Key: "second.png" }] };
      }
      if (name === "HeadObjectCommand") {
        if (denyHead)
          throw { name: "AccessDenied", $metadata: { httpStatusCode: 403 } };
        const result = stored.get(input.Key);
        if (!result) throw { $metadata: { httpStatusCode: 404 } };
        return result;
      }
      if (name === "GetObjectCommand") {
        assert.equal(input.IfMatch, object.ETag);
        return {
          Body: Readable.from([Buffer.from("blog")]),
          ContentLength: 4,
          ContentType: "image/png",
        };
      }
      if (name === "PutObjectCommand") {
        if (failUpload)
          throw {
            name: "ServiceUnavailable",
            $metadata: { httpStatusCode: 503 },
          };
        let content = "";
        for await (const chunk of input.Body) content += chunk;
        assert.equal(content, "blog");
        assert.equal(input.ContentType, "image/png");
        stored.set(input.Key, {
          ContentLength: Buffer.byteLength(content),
          Metadata: input.Metadata,
        });
        return {};
      }
      throw new Error(`Unexpected operation: ${name}`);
    }
  };
  // Use an isolated context so failed-run exit codes cannot affect the test process.
  const context = createContext({
    process,
    AbortSignal,
    console: {
      log: (line) => logs.push(JSON.parse(line)),
      error: (line) => errors.push(JSON.parse(line)),
    },
  });
  const isolated = new SourceTextModule(source, { context });
  const isolatedSdk = new SyntheticModule(
    Object.keys(sdk),
    function () {
      for (const [name, value] of Object.entries(sdk))
        this.setExport(name, value);
    },
    { context }
  );
  await isolated.link(() => isolatedSdk);
  await isolated.evaluate();
  return { calls, logs, errors, stored, exitCode: process.exitCode };
}

test("copies all pages, preserves paths, skips unchanged files and retains deleted originals", async () => {
  const result = await run();
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.logs, [{ success: true, copied: 2, skipped: 1 }]);
  assert.ok(result.stored.has("blog-media/blog/imagen con espacios.png"));
  assert.ok(result.stored.has("blog-media/second.png"));
  assert.ok(result.stored.has("blog-media/deleted-from-source.png"));
});

test("upload failure is reported as failure, never success", async () => {
  const result = await run({ failUpload: true });
  assert.equal(result.exitCode, 1);
  assert.equal(result.logs.length, 0);
  assert.equal(result.errors[0].status, 503);
});

test("access denied is not mistaken for a missing backup", async () => {
  const result = await run({ denyHead: true });
  assert.equal(result.exitCode, 1);
  assert.equal(
    result.calls.filter(({ name }) => name === "PutObjectCommand").length,
    0
  );
});

test("missing pagination token cannot silently omit remaining objects", async () => {
  const result = await run({ badPage: true });
  assert.equal(result.exitCode, 1);
  assert.match(result.errors[0].message, /continuation token/);
});
