import { getBlogSitemapEntries } from "@/lib/sitemap/blog";
import { buildUrlSetXml } from "@/lib/sitemap/buildUrlSetXml";

export const revalidate = 3600;

export async function GET() {
  const xml = buildUrlSetXml(await getBlogSitemapEntries());

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
