import { getPublishedBlogPosts } from "@/lib/blogPosts";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Noticias, guías y análisis de cumplimiento normativo, gestión legal y control operativo en Chile.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "https://isolegal.cl/blog",
    title: "Blog | Isolegal",
    description:
      "Contenido para fortalecer la gestión de cumplimiento normativo y la trazabilidad legal de tu operación.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Isolegal",
    description:
      "Guías y análisis para mejorar el cumplimiento normativo y la evidencia operativa.",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="bg-darkBlue text-white min-h-dvh">
      <section className="container mx-auto py-16">
        <div className="max-w-3xl space-y-4">
          <h1 className="font-extrabold text-5xl md:text-6xl leading-[1.06] tracking-[-1.5px]">
            Blog Isolegal
          </h1>
          <p className="text-lg text-white/85">
            Recursos prácticos sobre cumplimiento normativo, evidencia auditable
            y operación legal en terreno.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-white/15 bg-white/5 p-8">
            <p className="text-white/80">Aún no hay publicaciones disponibles.</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-2xl border border-white/15 bg-white/5"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.coverImageUrl ? (
                    <div className="relative aspect-video w-full">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-white/10" />
                  )}
                  <div className="space-y-3 p-6">
                    <p className="text-sm uppercase tracking-wide text-white/70">
                      {formatPublishedDate(post.publishedAt)}
                    </p>
                    <h2 className="text-2xl font-bold leading-tight">{post.title}</h2>
                    <p className="text-white/80">
                      {post.excerpt || "Sin resumen disponible para esta publicación."}
                    </p>
                    <span className="inline-flex text-sm font-semibold text-white">
                      Leer artículo
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
