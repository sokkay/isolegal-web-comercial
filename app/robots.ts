import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/new/tag/",
        "/new/category/",
        "/new/page/",
        "*/feed/",
      ],
    },
    sitemap: [
      "https://isolegal.cl/sitemap.xml",
      "https://isolegal.cl/sitemap-main.xml",
      "https://isolegal.cl/sitemap-blog.xml",
    ],
  };
}
