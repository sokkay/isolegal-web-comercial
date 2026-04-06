import { unstable_cache } from "next/cache";
import type PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";

import { getPb } from "@/lib/pocketbase";
import { blogPostRecordSchema } from "@/lib/schemas/blogPost";

const BLOG_POSTS_COLLECTION = "blog_posts";
export const BLOG_CACHE_REVALIDATE_SECONDS = 60 * 60;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl: string | null;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface CachedBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

function toValidDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function hydrateBlogPost(post: CachedBlogPost): BlogPost | null {
  const publishedAt = toValidDate(post.publishedAt);
  const createdAt = toValidDate(post.createdAt);
  const updatedAt = toValidDate(post.updatedAt);

  if (!publishedAt || !createdAt || !updatedAt) {
    return null;
  }

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    contentHtml: post.contentHtml,
    coverImageUrl: post.coverImageUrl,
    publishedAt,
    createdAt,
    updatedAt,
  };
}

function buildBlogMediaPath(key: string): string {
  const encodedKey = key
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/api/blog-media/${encodedKey}`;
}

async function getPbAdminAuthenticated(): Promise<PocketBase> {
  const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
  const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "POCKET_BASE_ADMIN_EMAIL y POCKET_BASE_ADMIN_PASSWORD son requeridos para leer blog_posts."
    );
  }

  const pb = getPb();
  await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);
  return pb;
}

function normalizeBlogPost(
  record: RecordModel,
  now: Date
): CachedBlogPost | null {
  const parsed = blogPostRecordSchema.safeParse({
    id: record.id,
    title: (record as { title?: unknown }).title,
    slug: (record as { slug?: unknown }).slug,
    excerpt: (record as { excerpt?: unknown }).excerpt,
    content_html: (record as { content_html?: unknown }).content_html,
    cover_image_key: (record as { cover_image_key?: unknown }).cover_image_key,
    status: (record as { status?: unknown }).status,
    published_at: (record as { published_at?: unknown }).published_at,
    created: record.created,
    updated: record.updated,
  });

  if (!parsed.success) {
    console.error(
      "Registro de blog inválido:",
      parsed.error.issues
    );
    return null;
  }

  const post = parsed.data;
  if (post.status !== "published" || !post.published_at) {
    return null;
  }

  const publishedAt = toValidDate(post.published_at);
  if (!publishedAt) {
    return null;
  }

  if (publishedAt > now) {
    return null;
  }

  const coverImageUrl = post.cover_image_key
    ? buildBlogMediaPath(post.cover_image_key)
    : null;

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    contentHtml: post.content_html,
    coverImageUrl,
    publishedAt: post.published_at,
    createdAt: post.created,
    updatedAt: post.updated,
  };
}

const loadPublishedBlogPosts = unstable_cache(
  async (): Promise<CachedBlogPost[]> => {
    try {
      const pb = await getPbAdminAuthenticated();
      const now = new Date();

      const records = await pb.collection(BLOG_POSTS_COLLECTION).getFullList({
        filter: 'status = "published"',
        sort: "-published_at",
      });

      const posts: CachedBlogPost[] = [];
      for (const record of records) {
        const normalized = normalizeBlogPost(record, now);
        if (normalized) {
          posts.push(normalized);
        }
      }

      return posts;
    } catch (error) {
      console.error("No fue posible cargar blog_posts:", error);
      return [];
    }
  },
  ["blog-posts-published"],
  {
    revalidate: BLOG_CACHE_REVALIDATE_SECONDS,
  }
);

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const cachedPosts = await loadPublishedBlogPosts();
  const hydratedPosts: BlogPost[] = [];

  for (const post of cachedPosts) {
    const hydrated = hydrateBlogPost(post);
    if (hydrated) {
      hydratedPosts.push(hydrated);
    }
  }

  return hydratedPosts;
}

export async function getPublishedBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const cleanSlug = slug.trim();
  if (!cleanSlug) {
    return null;
  }

  const posts = await getPublishedBlogPosts();
  return posts.find((post) => post.slug === cleanSlug) ?? null;
}
