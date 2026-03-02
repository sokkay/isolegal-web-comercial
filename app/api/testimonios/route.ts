import { getPb, getPbPublic } from "@/lib/pocketbase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pbPublic = getPbPublic();
    const records = await pbPublic.collection("testimonios").getFullList();
    const items = records.map((r) => {
      const imagen = (r as { imagen?: string }).imagen;
      return {
        id: r.id,
        quote: (r as { comentario?: string }).comentario ?? "",
        name: (r as { nombre?: string }).nombre ?? "",
        companyRole: (r as { cargo?: string }).cargo ?? undefined,
        logoUrl: imagen ? pbPublic.files.getURL(r, imagen) : "",
      };
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET testimonios:", error);
    return NextResponse.json(
      { error: "Error al cargar testimonios" },
      { status: 500 }
    );
  }
}
