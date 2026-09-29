import { cn } from "@/utils/cn";
import type { PulsoAudience } from "./content";

type PulsoAudiencesProps = {
  title: string;
  audiences: PulsoAudience[];
  className?: string;
};

export default function PulsoAudiences({
  title,
  audiences,
  className,
}: PulsoAudiencesProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto">
        <h2 className="text-text mx-auto mb-10 max-w-3xl text-center text-3xl leading-tight font-extrabold sm:text-4xl">
          {title}
        </h2>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {audiences.map((audience) => (
            <article
              key={audience.title}
              className="border-border bg-card-background rounded-[18px] border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <h3 className="text-text mb-6 text-center text-xl font-extrabold">
                {audience.title}
              </h3>
              <ul className="space-y-5">
                {audience.items.map(({ text, Icon }) => (
                  <li
                    key={text}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <span className="bg-primary/15 flex size-10 shrink-0 items-center justify-center rounded-full">
                      <Icon
                        className="fill-primary size-5 dark:fill-white"
                        aria-hidden="true"
                      />
                    </span>
                    <p className="text-text/75 max-w-sm text-[0.95rem] leading-6">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
