import { getBlogSitemapIndexEntry } from "@/lib/sitemap/blog";
import { buildIndexXml } from "@/lib/sitemap/buildIndexXml";
import { getMainSitemapIndexEntry } from "@/lib/sitemap/main";

export const revalidate = 3600;

export async function GET() {
  const xml = buildIndexXml([
    getMainSitemapIndexEntry(),
    await getBlogSitemapIndexEntry(),
  ]);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
