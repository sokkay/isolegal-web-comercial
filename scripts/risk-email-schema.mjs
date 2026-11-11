import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import PocketBase from "pocketbase";

async function main() {
  const apply = process.argv.includes("--apply");
  const pb = new PocketBase(process.env.POCKET_BASE_URL);
  pb.beforeSend = (url, options) => ({
    url,
    options: { ...options, signal: AbortSignal.timeout(60_000) },
  });
  await pb
    .collection("_superusers")
    .authWithPassword(
      process.env.POCKET_BASE_ADMIN_EMAIL,
      process.env.POCKET_BASE_ADMIN_PASSWORD
    );
  const before = await pb.collections.getOne("diagnosticos_riesgo");
  const additions = [
    {
      name: "email_estado",
      type: "select",
      maxSelect: 1,
      values: ["pending", "sending", "sent", "failed"],
    },
    { name: "email_intentos", type: "number", min: 0, onlyInt: true },
    { name: "email_ultimo_intento", type: "date" },
    { name: "email_enviado_en", type: "date" },
    { name: "email_ultimo_error", type: "text", max: 500 },
  ].filter(
    (field) => !before.fields.some((existing) => existing.name === field.name)
  );
  console.log(
    JSON.stringify({ add: additions.map((field) => field.name), apply })
  );
  if (!apply) return;

  // Snapshot only the schema and delivery markers; never infer historical dates or attempt counts.
  const records = await pb.collection("diagnosticos_riesgo").getFullList({
    fields:
      "id,origen,email_estado,email_intentos,email_enviado_en,email_ultimo_intento,email_ultimo_error",
  });
  await mkdir("tmp", { recursive: true });
  await writeFile(
    `tmp/risk-email-before-${Date.now()}.json`,
    JSON.stringify({ schema: before, records }, null, 2),
    { mode: 0o600 }
  );
  if (additions.length)
    await pb.collections.update(before.id, {
      fields: [...before.fields, ...additions],
    });
  const after = await pb.collections.getOne(before.id);
  for (const field of before.fields)
    assert.deepEqual(
      after.fields.find((f) => f.id === field.id),
      field
    );
  for (const rule of [
    "createRule",
    "updateRule",
    "deleteRule",
    "listRule",
    "viewRule",
  ])
    assert.equal(after[rule], before[rule]);
  for (const field of additions)
    assert.ok(after.fields.some((f) => f.name === field.name));

  let markedSent = 0;
  for (const record of records) {
    if (
      !record.email_estado &&
      [
        "web_risk_calculator_email_sent_booking",
        "web_risk_calculator_email_sent_delayed",
      ].includes(record.origen)
    ) {
      await pb
        .collection("diagnosticos_riesgo")
        .update(record.id, { email_estado: "sent" });
      markedSent++;
    }
  }
  const verified = await pb
    .collection("diagnosticos_riesgo")
    .getFullList({ fields: "id,origen,email_estado" });
  assert.equal(verified.length, records.length);
  for (const record of records) {
    const current = verified.find((r) => r.id === record.id);
    assert.equal(current?.origen, record.origen);
    if (
      [
        "web_risk_calculator_email_sent_booking",
        "web_risk_calculator_email_sent_delayed",
      ].includes(record.origen) &&
      !record.email_estado
    )
      assert.equal(current?.email_estado, "sent");
  }
  console.log(
    JSON.stringify({
      added: additions.length,
      markedSent,
      records: verified.length,
      emailsSent: 0,
      originalFieldsAndRulesPreserved: true,
    })
  );
}

main().catch((error) => {
  console.error(
    JSON.stringify({
      error: error instanceof Error ? error.name : "UnknownError",
      status: error.status ?? null,
    })
  );
  process.exitCode = 1;
});
