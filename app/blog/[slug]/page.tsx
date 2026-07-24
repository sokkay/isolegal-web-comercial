import ProtectedImage from "@/components/ProtectedImage";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
  getRelatedPublishedBlogPosts,
} from "@/lib/blogPosts";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostContent from "./BlogPostContent";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const publishedDateFormatter = new Intl.DateTimeFormat("es-CL", {
  month: "long",
  year: "numeric",
});

function formatPublishedDate(date: Date): string {
  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return publishedDateFormatter.format(date);
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/blog/${post.slug}`;
  const description =
    post.excerpt ||
    "Artículo del blog de Isolegal sobre cumplimiento normativo y control operativo.";

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: `https://isolegal.cl${canonicalPath}`,
      title: post.title,
      description,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.coverImageUrl
        ? [
            {
              url: post.coverImageUrl,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPublishedBlogPosts(post, 3);

  return (
    <main className="bg-background text-text min-h-dvh">
      <article className="container mx-auto px-5 py-16 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* <Link
            href="/blog"
            className="inline-flex text-sm font-semibold text-text/80 hover:text-text"
          >
            Volver al blog
          </Link> */}

          <header className="mt-6 space-y-4">
            <p className="text-sm uppercase tracking-wide text-text/70">
              {formatPublishedDate(post.publishedAt)}
            </p>
            <h1 className="font-extrabold text-4xl md:text-5xl leading-tight tracking-[-1.2px]">
              {post.title}
            </h1>
            {/* {post.excerpt ? (
              <p className="text-lg text-text/85">{post.excerpt}</p>
            ) : null} */}
          </header>
        </div>

        {post.coverImageUrl ? (
          <div className="relative mt-10 mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-text/15 select-none">
            <ProtectedImage
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        ) : null}

        <BlogPostContent contentHtml={post.contentHtml} />

        {relatedPosts.length > 0 ? (
          <section className="mx-auto mt-16 max-w-5xl border-t border-text/10 pt-12">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Blogs recomendados
              </h2>
              <p className="mt-3 text-text/70">
                Sigue leyendo contenido relacionado con este tema.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="overflow-hidden rounded-2xl border border-text/10 bg-background/60"
                >
                  <Link href={`/blog/${relatedPost.slug}`} className="block h-full">
                    {relatedPost.coverImageUrl ? (
                      <div className="relative aspect-video w-full select-none">
                        <ProtectedImage
                          src={relatedPost.coverImageUrl}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-text/5" />
                    )}

                    <div className="space-y-3 p-5">
                      <p className="text-sm uppercase tracking-wide text-text/60">
                        {formatPublishedDate(relatedPost.publishedAt)}
                      </p>
                      <h3 className="text-xl font-bold leading-tight">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm leading-6 text-text/75">
                        {relatedPost.excerpt ||
                          "Sin resumen disponible para esta publicación."}
                      </p>
                      <span className="inline-flex text-sm font-semibold text-primary">
                        Leer artículo
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
