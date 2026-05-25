import { getBlogSitemapEntries } from "@/lib/sitemap/blog";
import { buildUrlSetXml } from "@/lib/sitemap/buildUrlSetXml";
import { SITEMAP_REVALIDATE_SECONDS } from "@/lib/sitemap/constants";

export const revalidate = SITEMAP_REVALIDATE_SECONDS;

export async function GET() {
  const xml = buildUrlSetXml(await getBlogSitemapEntries());

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
