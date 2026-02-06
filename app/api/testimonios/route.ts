import { NextResponse } from "next/server";

import { getPb } from "@/lib/pocketbase";

export async function GET() {
  try {
    const pb = getPb();
    const records = await pb.collection("testimonios").getFullList();
    const items = records.map((r) => {
      const imagen = (r as { imagen?: string }).imagen;
      return {
        id: r.id,
        quote: (r as { comentario?: string }).comentario ?? "",
        name: (r as { nombre?: string }).nombre ?? "",
        companyRole: (r as { cargo?: string }).cargo ?? undefined,
        logoUrl: imagen ? pb.files.getUrl(r, imagen) : "",
      };
    });
    return NextResponse.json({ items });
  } catch (error) {
    console.error("GET testimonios:", error);
    return NextResponse.json(
      { error: "Error al cargar testimonios" },
      { status: 500 },
    );
  }
}
