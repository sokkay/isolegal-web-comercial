import { getBlogSitemapIndexEntry } from "@/lib/sitemap/blog";
import { buildIndexXml } from "@/lib/sitemap/buildIndexXml";
import { SITEMAP_REVALIDATE_SECONDS } from "@/lib/sitemap/constants";
import { getMainSitemapIndexEntry } from "@/lib/sitemap/main";

export const revalidate = SITEMAP_REVALIDATE_SECONDS;

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
