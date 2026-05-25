import type { MetadataRoute } from "next";

import {
  SITEMAP_PATHS,
  SITE_URL,
  STATIC_CONTENT_LAST_MODIFIED,
} from "@/lib/sitemap/constants";

export function getMainSitemapEntries(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/calcula-tu-riesgo`,
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/soporte-tecnico`,
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/terminos-y-condiciones`,
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}

export function getMainSitemapIndexEntry() {
  return {
    url: `${SITE_URL}${SITEMAP_PATHS.main}`,
    lastModified: STATIC_CONTENT_LAST_MODIFIED,
  };
}
