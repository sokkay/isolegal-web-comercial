import { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blogPosts";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://isolegal.cl";
  const lastModified = new Date("2026-02-28");
  const blogPosts = await getPublishedBlogPosts();

  const blogIndexLastModified = blogPosts.reduce((latest, post) => {
    return post.updatedAt > latest ? post.updatedAt : latest;
  }, lastModified);

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/calcula-tu-riesgo`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soporte-tecnico`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: blogIndexLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogRoutes,
  ];
}
