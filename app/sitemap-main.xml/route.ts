import { buildUrlSetXml } from "@/lib/sitemap/buildUrlSetXml";
import { SITEMAP_REVALIDATE_SECONDS } from "@/lib/sitemap/constants";
import { getMainSitemapEntries } from "@/lib/sitemap/main";

export const revalidate = SITEMAP_REVALIDATE_SECONDS;

export async function GET() {
  const xml = buildUrlSetXml(getMainSitemapEntries());

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
