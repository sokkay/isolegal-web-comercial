import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
import PocketBase from "pocketbase";

async function main() {
  const [command, target] = process.argv.slice(2);
  if (!(command === "schema" || (command === "retry" && target))) {
    throw new Error("Use: schema [--apply] | retry <contact ID | --failed>");
  }
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

  if (command === "schema") {
    const collection = await pb.collections.getOne("contactos");
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
      (field) =>
        !collection.fields.some((existing) => existing.name === field.name)
    );
    console.log(
      JSON.stringify({ adding: additions.map((field) => field.name) })
    );
    if (target === "--apply" && additions.length) {
      await mkdir("tmp", { recursive: true });
      await writeFile(
        `tmp/contactos-schema-before-${Date.now()}.json`,
        JSON.stringify(collection, null, 2),
        { mode: 0o600 }
      );
      await pb.collections.update(collection.id, {
        fields: [...collection.fields, ...additions],
      });
      const updated = await pb.collections.getOne(collection.id);
      if (
        !additions.every((field) =>
          updated.fields.some((existing) => existing.name === field.name)
        )
      )
        throw new Error("Schema verification failed");
      console.log("Schema actualizado; registros y reglas conservados.");
    }
  } else {
    await mkdir("tmp", { recursive: true });
    await build({
      entryPoints: ["lib/email/contactNotification.ts"],
      outfile: "tmp/contact-notification.mjs",
      bundle: true,
      packages: "external",
      platform: "node",
      format: "esm",
    });
    const { sendContactNotification } =
      await import("../tmp/contact-notification.mjs");
    const records =
      target === "--failed"
        ? await pb
            .collection("contactos")
            .getFullList({ filter: 'email_estado = "failed"', sort: "created" })
        : [await pb.collection("contactos").getOne(target)];
    // shortcut: run one retry process at a time; use an atomic claim before adding parallel workers.
    for (const record of records) {
      const result = await sendContactNotification(pb, record);
      console.log(JSON.stringify({ id: record.id, ...result }));
      if (result.status === "failed") process.exitCode = 1;
    }
  }
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
