import CalendarIcon from "@/public/icons/calendar.svg";
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";

export default async function TerminosYCondiciones() {
  const markdownPath = path.join(
    process.cwd(),
    "docs",
    "terminos-y-condiciones.md"
  );
  const markdown = await fs.readFile(markdownPath, "utf8");

  return (
    <div className="bg-darkBlue text-white">
      <div className="container mx-auto flex flex-col py-16">
        <h1 className="text-5xl leading-[1.06] font-extrabold tracking-[-1.5px] md:text-6xl">
          Términos y Condiciones
        </h1>
        <div className="mt-4 flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 fill-white" />
          <span className="text-lg font-medium text-white">
            Última actualización: 4 de enero de 2026
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20 md:px-8">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="mt-12 text-3xl font-extrabold tracking-[-0.8px] md:text-4xl">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-10 text-2xl font-bold tracking-[-0.4px] md:text-3xl">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="mt-8 text-xl font-semibold md:text-2xl">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="text-base leading-7 text-white/90 md:text-lg md:leading-8">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc space-y-2 pl-6 text-white/90">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal space-y-2 pl-6 text-white/90">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-base leading-7 md:text-lg md:leading-8">
                  {children}
                </li>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-white underline decoration-white/60 underline-offset-4 hover:decoration-white"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-white">{children}</strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-white/30 pl-4 text-white/80">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="my-10 border-white/10" />,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>

      {/* <div className="container mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          <TechnicalSupportForm />
          <OpinionForm />
        </div>
      </div> */}
    </div>
  );
}
