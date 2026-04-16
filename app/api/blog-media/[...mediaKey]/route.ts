import { fetchBlogMediaObject } from "@/lib/blogMediaS3";
import { NextRequest, NextResponse } from "next/server";

const API_PREFIX = "/api/blog-media/";

function mapStatus(status: number): number {
  if (status === 403 || status === 404) {
    return 404;
  }
  if (status >= 400 && status < 500) {
    return 400;
  }
  if (status >= 500) {
    return 500;
  }
  return 500;
}

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith(API_PREFIX)) {
    return NextResponse.json({ error: "Ruta inválida" }, { status: 400 });
  }

  const rawKey = pathname.slice(API_PREFIX.length);
  if (!rawKey) {
    return NextResponse.json({ error: "Key requerido" }, { status: 400 });
  }

  const key = rawKey
    .split("/")
    .map((segment) => decodeURIComponent(segment))
    .join("/");

  try {
    const s3Response = await fetchBlogMediaObject(key);

    if (!s3Response.ok) {
      return NextResponse.json(
        { error: "No fue posible cargar la imagen" },
        { status: mapStatus(s3Response.status) },
      );
    }

    return new NextResponse(s3Response.body, {
      status: 200,
      headers: {
        "Content-Type":
          s3Response.headers.get("content-type") ?? "application/octet-stream",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error cargando media de blog desde S3:", error);
    return NextResponse.json(
      { error: "No fue posible cargar la imagen" },
      { status: 500 },
    );
  }
}
