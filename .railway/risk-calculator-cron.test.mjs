import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { gunzipSync } from "node:zlib";
import { buildRiskCron } from "./build-functions.mjs";

await mkdir("tmp", { recursive: true });
const outfile = "tmp/risk-calculator-cron-test.mjs";
await buildRiskCron({ versionedImports: false, outfile });
let runId = 0;

async function run({
  booked = false,
  failEmail = false,
  failUpdate = false,
  failStart = false,
  networkFailure = false,
  failAnalytics = false,
  emailState = "",
  origin = "web_risk_calculator_email_pending",
} = {}) {
  const env = { ...process.env };
  const oldFetch = globalThis.fetch;
  const oldLog = console.log;
  const oldError = console.error;
  const oldExitCode = process.exitCode;
  const calls = [];
  const logs = [];
  const errors = [];
  const diagnostic = {
    id: "pending00000001",
    correo_corporativo: "cliente@example.test",
    nombre_completo: "Cliente <Prueba>",
    empresa: "Empresa de prueba",
    score: 12,
    nivel_riesgo: "alto",
    origen: origin,
    email_estado: emailState,
  };
  Object.assign(process.env, {
    POCKET_BASE_URL: "https://pb.example.test",
    POCKET_BASE_ADMIN_EMAIL: "admin@example.test",
    POCKET_BASE_ADMIN_PASSWORD: "test-only-password",
    ZEPTOMAIL_URL: "https://mail.example.test/send",
    ZEPTOMAIL_TOKEN: "test-only-token",
    ZEPTOMAIL_FROM_EMAIL: "envios@example.test",
    TEAM_FORM_NOTIFICATION_EMAILS: "equipo@example.test,equipo@example.test",
    APP_URL: "https://www.isolegal.cl",
    POSTHOG_PROJECT_TOKEN: "test-posthog-token",
    POSTHOG_HOST: "https://analytics.example.test",
  });
  process.exitCode = 0;
  console.log = (line) => logs.push(JSON.parse(line));
  console.error = (...args) => errors.push(args);
  globalThis.fetch = async (url, init) => {
    const target = String(url);
    const bodyText =
      init.body instanceof Blob
        ? gunzipSync(Buffer.from(await init.body.arrayBuffer())).toString()
        : init.body;
    const body = bodyText ? JSON.parse(bodyText) : undefined;
    calls.push({ target, method: init.method, body });
    if (target.startsWith("https://analytics.example.test")) {
      return Response.json(
        { status: 1 },
        { status: failAnalytics ? 400 : 200 }
      );
    }
    if (target.includes("/_superusers/auth-with-password")) {
      return Response.json({
        token: "test-token",
        record: { id: "admin", collectionName: "_superusers" },
      });
    }
    if (
      target.startsWith(
        "https://pb.example.test/api/collections/diagnosticos_riesgo/records?"
      )
    ) {
      return Response.json({
        page: 1,
        totalPages: 1,
        totalItems: 1,
        items: [diagnostic],
      });
    }
    if (target.includes("/reservas_reuniones/records?")) {
      return Response.json({ totalItems: booked ? 1 : 0, items: [] });
    }
    if (target.endsWith("/risk_booking_tokens/records")) {
      assert.equal(body.submission_id, diagnostic.id);
      assert.match(body.token_hash, /^[a-f0-9]{64}$/);
      assert.ok(new Date(body.expires_at) > new Date());
      return Response.json({ id: "token000000001" });
    }
    if (target === "https://mail.example.test/send") {
      assert.equal(
        body.to[0].email_address.address,
        diagnostic.correo_corporativo
      );
      assert.equal(body.bcc.length, 1);
      assert.match(body.htmlbody, /Cliente &lt;Prueba&gt;/);
      if (!booked)
        assert.match(
          body.htmlbody,
          /https:\/\/www\.isolegal\.cl\/agendar-sesion\?token&#x3D;/
        );
      else assert.match(body.subject, /Copia de tu formulario/);
      if (networkFailure) throw new TypeError("Network interrupted");
      return Response.json({}, { status: failEmail ? 503 : 200 });
    }
    if (target.endsWith(`/diagnosticos_riesgo/records/${diagnostic.id}`)) {
      if (body.email_estado === "sent") {
        assert.equal(
          body.origen,
          booked
            ? "web_risk_calculator_email_sent_booking"
            : "web_risk_calculator_email_sent_delayed"
        );
        assert.ok(body.email_enviado_en);
      }
      if (body.email_estado === "sending" && body["email_intentos+"]) {
        assert.equal(body["email_intentos+"], 1);
        assert.ok(body.email_ultimo_intento);
      }
      return Response.json(diagnostic, {
        status:
          (failUpdate && body.email_estado === "sent") ||
          (failStart && body["email_intentos+"])
            ? 503
            : 200,
      });
    }
    throw new Error(`Unexpected external request: ${target}`);
  };
  try {
    await import(
      `${pathToFileURL(`${process.cwd()}/${outfile}`).href}?run=${runId++}`
    );
    return { calls, logs, errors, exitCode: process.exitCode };
  } finally {
    process.env = env;
    globalThis.fetch = oldFetch;
    console.log = oldLog;
    console.error = oldError;
    process.exitCode = oldExitCode;
  }
}

test("sends through ZeptoMail and marks sent without calling the web service", async () => {
  const result = await run();
  assert.equal(result.exitCode, 0, JSON.stringify(result.errors));
  assert.equal(result.logs[0].stats.sent, 1);
  const event = result.calls.find((c) =>
    c.target.startsWith("https://analytics.example.test")
  )?.body.batch[0];
  assert.equal(event.event, "email_send_result");
  assert.equal(event.properties.email_status, "accepted");
  assert.equal(event.properties.email_type, "risk_followup");
  assert.equal(event.properties.submission_id, "pending00000001");
  assert.ok(!JSON.stringify(event).includes("cliente@example.test"));
  assert.ok(
    result.calls.every(
      ({ target }) => !target.startsWith("https://www.isolegal.cl")
    )
  );
});

test("confirmed bookings skip email and token creation", async () => {
  const result = await run({ booked: true });
  assert.equal(result.exitCode, 0);
  assert.equal(result.logs[0].stats.skipped, 1);
  assert.ok(result.calls.every(({ method }) => method !== "PATCH"));
  assert.ok(
    result.calls.every(
      ({ target }) =>
        !target.includes("/risk_booking_tokens/") &&
        !target.includes("mail.example.test")
    )
  );
});

test("email failures leave the diagnostic pending and fail the cron", async () => {
  const result = await run({ failEmail: true });
  assert.equal(result.exitCode, 1);
  assert.equal(result.logs[0].stats.failed, 1);
  const updates = result.calls.filter(({ method }) => method === "PATCH");
  assert.deepEqual(
    updates.map((c) => c.body.email_estado),
    ["sending", "failed"]
  );
  assert.equal(updates[1].body.email_ultimo_error, "ZeptoMail HTTP 503");
  const event = result.calls.find((c) =>
    c.target.startsWith("https://analytics.example.test")
  )?.body.batch[0];
  assert.equal(event.properties.email_status, "failed");
  assert.equal(event.properties.provider_status, 503);
  assert.ok(updates.every((c) => !c.body.origen));
});

test("failure to mark an accepted email as sent is visible in the cron status", async () => {
  const result = await run({ failUpdate: true });
  assert.equal(result.exitCode, 1);
  assert.equal(result.logs[0].stats.failed, 1);
  assert.equal(result.logs[0].stats.sent, 0);
  const event = result.calls.find((c) =>
    c.target.startsWith("https://analytics.example.test")
  )?.body.batch[0];
  assert.equal(event.properties.email_status, "accepted");
});

test("historical sent origins and sent/in-flight states are never resent", async () => {
  for (const options of [
    { origin: "web_risk_calculator_email_sent_booking", emailState: "failed" },
    { origin: "web_risk_calculator_email_sent_delayed", emailState: "" },
    { emailState: "sent" },
    { emailState: "sending" },
  ]) {
    const result = await run(options);
    assert.equal(result.logs[0].stats.skipped, 1);
    assert.ok(
      result.calls.every(
        (c) => c.method !== "PATCH" && !c.target.includes("mail.example.test")
      )
    );
  }
});

test("failed booked diagnostic retries the form copy, not a commercial followup", async () => {
  const result = await run({ booked: true, emailState: "failed" });
  assert.equal(result.logs[0].stats.sent, 1);
  assert.ok(
    result.calls.every((c) => !c.target.includes("/risk_booking_tokens/"))
  );
});

test("failure to persist attempt prevents sending", async () => {
  const result = await run({ failStart: true });
  assert.equal(result.logs[0].stats.failed, 1);
  assert.ok(result.calls.every((c) => !c.target.includes("mail.example.test")));
});

test("uncertain network delivery is blocked from automatic retry", async () => {
  const result = await run({ networkFailure: true });
  assert.equal(result.logs[0].stats.failed, 1);
  const updates = result.calls.filter((c) => c.method === "PATCH");
  assert.deepEqual(
    updates.map((c) => c.body.email_estado),
    ["sending", "sending"]
  );
  assert.match(updates[1].body.email_ultimo_error, /incierto/);
  const event = result.calls.find((c) =>
    c.target.startsWith("https://analytics.example.test")
  )?.body.batch[0];
  assert.equal(event.properties.email_status, "uncertain");
});

test("PostHog rejection never changes an accepted email or retries it", async () => {
  const result = await run({ failAnalytics: true });
  assert.equal(result.exitCode, 0);
  assert.equal(result.logs[0].stats.sent, 1);
  assert.equal(
    result.calls.filter((c) => c.target === "https://mail.example.test/send")
      .length,
    1
  );
  assert.equal(
    result.calls.filter((c) => c.method === "PATCH").at(-1).body.email_estado,
    "sent"
  );
});
