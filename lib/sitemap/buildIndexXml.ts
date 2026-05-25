type SitemapIndexEntry = {
  url: string;
  lastModified?: Date | string;
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatLastModified(lastModified?: SitemapIndexEntry["lastModified"]): string | null {
  if (!lastModified) {
    return null;
  }

  if (lastModified instanceof Date) {
    return lastModified.toISOString();
  }

  return lastModified;
}

export function buildIndexXml(entries: SitemapIndexEntry[]): string {
  const items = entries
    .map((entry) => {
      const lastModified = formatLastModified(entry.lastModified);

      return [
        "  <sitemap>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        lastModified ? `    <lastmod>${escapeXml(lastModified)}</lastmod>` : null,
        "  </sitemap>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    items,
    "</sitemapindex>",
  ].join("\n");
}
