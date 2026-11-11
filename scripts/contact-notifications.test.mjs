import { build } from "esbuild";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { after, test } from "node:test";
import { gunzipSync } from "node:zlib";
await mkdir("tmp", { recursive: true });
await build({
  entryPoints: ["lib/email/contactNotification.ts"],
  outfile: "tmp/contact-notification-test.mjs",
  bundle: true,
  packages: "external",
  platform: "node",
  format: "esm",
});
const { sendContactNotification } =
  await import("../tmp/contact-notification-test.mjs");
process.env.TEAM_FORM_NOTIFICATION_EMAILS = "team@example.com";
process.env.ZEPTOMAIL_TOKEN = "test";
process.env.ZEPTOMAIL_FROM_EMAIL = "sender@example.com";
process.env.POSTHOG_PROJECT_TOKEN = "test-posthog-token";
process.env.POSTHOG_HOST = "https://analytics.example.test";
const events = [];
const originalFetch = globalThis.fetch;
let mailFetch;
globalThis.fetch = async (url, options) => {
  if (String(url).startsWith("https://analytics.example.test")) {
    const text =
      options.body instanceof Blob
        ? gunzipSync(Buffer.from(await options.body.arrayBuffer())).toString()
        : options.body;
    events.push(...JSON.parse(text).batch);
    return Response.json({ status: 1 });
  }
  return mailFetch(url, options);
};
after(() => {
  globalThis.fetch = originalFetch;
});

const record = {
  id: "contact123",
  email_estado: "pending",
  created: "2026-11-11T12:00:00Z",
  nombre: "Carlos",
  email: "visitor@example.com",
  mensaje: "<test>",
};
function fakePb(failSent = false) {
  const updates = [];
  return {
    updates,
    collection: () => ({
      update: async (id, data) => {
        if (failSent && data.email_estado === "sent")
          throw new Error("PB unavailable");
        updates.push({ id, ...data });
      },
    }),
  };
}
test("accepted notification is sent to team and recorded", async () => {
  const pb = fakePb();
  mailFetch = async (_url, options) => {
    const body = JSON.parse(options.body);
    assert.equal(body.to[0].email_address.address, "team@example.com");
    assert.ok(body.htmlbody.includes("&lt;test&gt;"));
    return new Response("{}", { status: 201 });
  };
  assert.equal((await sendContactNotification(pb, record)).status, "sent");
  assert.equal(pb.updates[0].email_estado, "sending");
  assert.equal(pb.updates[0].email_intentos, 1);
  assert.equal(pb.updates[1].email_estado, "sent");
  assert.equal(events.at(-1).event, "email_send_result");
  assert.equal(events.at(-1).properties.email_status, "accepted");
  assert.equal(events.at(-1).properties.email_type, "contact_notification");
  assert.equal(events.at(-1).properties.submission_id, record.id);
  assert.ok(!JSON.stringify(events.at(-1)).includes(record.email));
});
test("provider failure preserves retry state with sanitized error", async () => {
  const pb = fakePb();
  mailFetch = async () =>
    new Response('{"message":"Credit exhausted","private":"secret"}', {
      status: 429,
    });
  assert.equal(
    (
      await sendContactNotification(pb, {
        ...record,
        email_estado: "failed",
        email_intentos: 2,
      })
    ).status,
    "failed"
  );
  assert.equal(pb.updates[0].email_intentos, 3);
  assert.equal(events.at(-1).properties.email_status, "failed");
  assert.equal(events.at(-1).properties.error_code, "credit_exhausted");
  assert.equal(events.at(-1).properties.email_attempt, 3);
  assert.ok(!JSON.stringify(events.at(-1)).includes("secret"));
  assert.equal(
    pb.updates[1].email_ultimo_error,
    "ZeptoMail HTTP 429: créditos agotados"
  );
});
test("sent, in-flight and legacy records are never retried", async () => {
  for (const email_estado of ["sent", "sending", "", undefined]) {
    const pb = fakePb();
    assert.equal(
      (await sendContactNotification(pb, { ...record, email_estado })).status,
      "skipped"
    );
    assert.equal(pb.updates.length, 0);
  }
});
test("accepted send with failed persistence remains sending, not failed", async () => {
  const pb = fakePb(true);
  mailFetch = async () => new Response("{}", { status: 201 });
  await assert.rejects(
    () => sendContactNotification(pb, record),
    /PB unavailable/
  );
  assert.equal(pb.updates.length, 1);
  assert.equal(pb.updates[0].email_estado, "sending");
  assert.equal(events.at(-1).properties.email_status, "accepted");
});
test("missing recipients records a retryable failure without sending", async () => {
  process.env.TEAM_FORM_NOTIFICATION_EMAILS = "";
  mailFetch = async () => {
    throw new Error("Unexpected network");
  };
  const pb = fakePb();
  assert.equal((await sendContactNotification(pb, record)).status, "failed");
  assert.equal(
    pb.updates[1].email_ultimo_error,
    "No hay destinatarios configurados"
  );
});
