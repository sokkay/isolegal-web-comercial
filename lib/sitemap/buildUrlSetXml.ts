import type { MetadataRoute } from "next";

type SitemapEntry = MetadataRoute.Sitemap[number];

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatLastModified(lastModified?: SitemapEntry["lastModified"]): string | null {
  if (!lastModified) {
    return null;
  }

  if (lastModified instanceof Date) {
    return lastModified.toISOString();
  }

  return lastModified;
}

export function buildUrlSetXml(entries: MetadataRoute.Sitemap): string {
  const items = entries
    .map((entry) => {
      const lastModified = formatLastModified(entry.lastModified);

      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        lastModified ? `    <lastmod>${escapeXml(lastModified)}</lastmod>` : null,
        entry.changeFrequency
          ? `    <changefreq>${entry.changeFrequency}</changefreq>`
          : null,
        typeof entry.priority === "number"
          ? `    <priority>${entry.priority}</priority>`
          : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    items,
    "</urlset>",
  ].join("\n");
}
