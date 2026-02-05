import CalendarIcon from "@/public/icons/calendar.svg";
import ReactMarkdown from "react-markdown";
import fs from "node:fs/promises";
import path from "node:path";

export default async function TerminosYCondiciones() {
  const markdownPath = path.join(
    process.cwd(),
    "docs",
    "terminos-y-condiciones.md"
  );
  const markdown = await fs.readFile(markdownPath, "utf8");

  return (
    <div className="bg-darkBlue text-white">
      <div className="container mx-auto py-16 flex flex-col">
        <h1 className="font-extrabold text-5xl md:text-6xl leading-[1.06] tracking-[-1.5px]">
          Términos y Condiciones
        </h1>
        <div className="flex items-center gap-2 mt-4">
          <CalendarIcon className="w-6 h-6 fill-white" />
          <span className="text-lg font-medium text-white">
            Última actualización: 4 de enero de 2026
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 pb-20">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.8px] mt-12">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.4px] mt-10">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-xl md:text-2xl font-semibold mt-8">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-base md:text-lg leading-7 md:leading-8 text-white/90">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2 text-white/90">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2 text-white/90">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-base md:text-lg leading-7 md:leading-8">
                {children}
              </li>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-white underline underline-offset-4 decoration-white/60 hover:decoration-white"
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
            hr: () => <hr className="border-white/10 my-10" />,
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
