import { buildUrlSetXml } from "@/lib/sitemap/buildUrlSetXml";
import { getMainSitemapEntries } from "@/lib/sitemap/main";

export const revalidate = 3600;

export async function GET() {
  const xml = buildUrlSetXml(getMainSitemapEntries());

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
