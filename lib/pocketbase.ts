import PocketBase from "pocketbase";

const url = process.env.POCKET_BASE_URL;
const publicUrl = process.env.NEXT_PUBLIC_POCKET_BASE_URL;

function getPb(): PocketBase {
  if (!url) {
    throw new Error("POCKET_BASE_URL no está configurado");
  }
  return new PocketBase(url);
}

function getPbPublic(): PocketBase {
  if (!publicUrl) {
    throw new Error("NEXT_PUBLIC_POCKETBASE_URL no está configurado");
  }
  return new PocketBase(publicUrl);
}

export { getPb, getPbPublic };
