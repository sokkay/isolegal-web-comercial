import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from "@/lib/blogPosts";
import clsx from "clsx";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const publishedDateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "long",
});

function formatPublishedDate(date: Date): string {
  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return publishedDateFormatter.format(date);
}

export const revalidate = 3600;
export const dynamicParams = true;

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
          <div className="relative mt-10 mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-text/15">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        ) : null}

        <div
          className={clsx(
            "prose mt-10 mx-auto max-w-3xl text-text/90 leading-8",
            "[&_a]:text-primary [&_a:hover]:text-primary/80",
            "[&_img]:rounded-xl [&_p]:my-6 [&_p]:leading-8",
            "[&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:text-3xl",
            "[&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:leading-tight",
            "[&_h3]:mt-10 [&_h3]:mb-2 [&_h3]:text-2xl",
            "[&_h3]:font-bold [&_h3]:leading-snug",
            "[&_h4]:mt-10 [&_h4]:mb-2 [&_h4]:text-xl",
            "[&_h4]:font-semibold [&_h4]:leading-snug",
            "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-7",
            "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-7",
            "[&_li]:my-0 [&_li]:pl-1 [&_li]:leading-7",
            "[&_li_p]:my-0 [&_li_p]:leading-7",
            "[&_li>ul]:my-1 [&_li>ol]:my-1",
            "[&_li>ul]:list-[circle] [&_li>ul]:pl-6",
            "[&_li>ol]:list-[lower-alpha] [&_li>ol]:pl-6"
          )}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
