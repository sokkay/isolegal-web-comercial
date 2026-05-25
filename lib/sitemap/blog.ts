import type { MetadataRoute } from "next";

import { getPublishedBlogPosts } from "@/lib/blogPosts";
import {
  SITEMAP_PATHS,
  SITE_URL,
  STATIC_CONTENT_LAST_MODIFIED,
} from "@/lib/sitemap/constants";

function getBlogLastModified(posts: Awaited<ReturnType<typeof getPublishedBlogPosts>>): Date {
  return posts.reduce((latest, post) => {
    return post.updatedAt > latest ? post.updatedAt : latest;
  }, STATIC_CONTENT_LAST_MODIFIED);
}

export async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedBlogPosts();
  const blogLastModified = getBlogLastModified(posts);

  return [
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

export async function getBlogSitemapIndexEntry() {
  const posts = await getPublishedBlogPosts();

  return {
    url: `${SITE_URL}${SITEMAP_PATHS.blog}`,
    lastModified: getBlogLastModified(posts),
  };
}
