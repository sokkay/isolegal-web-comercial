import PocketBase from "pocketbase";

const url = process.env.POCKET_BASE_URL;

function getPb(): PocketBase {
  if (!url) {
    throw new Error("POCKET_BASE_URL no está configurado");
  }
  return new PocketBase(url);
}

export { getPb };
