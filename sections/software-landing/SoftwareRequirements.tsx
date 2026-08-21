import SectionHeading from "./SectionHeading";

export type SoftwareRequirementItem = {
  title: string;
  description?: string;
  tags?: string[];
  note?: string;
};

type SoftwareRequirementsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: SoftwareRequirementItem[];
};

export default function SoftwareRequirements({
  eyebrow,
  title,
  description,
  items,
}: SoftwareRequirementsProps) {
  return (
    <section className="container mx-auto py-16 sm:py-20">
      <SectionHeading
        eyebrow={eyebrow}
        eyebrowDarkColor="var(--color-primary-on-dark-gray)"
        title={title}
        description={description}
      />
      <div className="bg-card-background mx-auto max-w-6xl overflow-hidden rounded-3xl shadow-sm">
        <div className="divide-border divide-y">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="group hover:bg-primary/5 grid gap-5 px-5 py-6 transition-colors sm:px-7 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.7fr)] lg:items-center lg:gap-10 lg:px-9"
            >
              <div className="flex items-center gap-4">
                <span className="border-primary/25 bg-primary/10 text-primary group-hover:bg-primary flex size-11 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold transition-colors group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-text text-lg leading-6 font-extrabold">
                    {item.title}
                  </h3>
                  {item.note ? (
                    <p className="text-text/55 mt-1 text-xs font-semibold tracking-wider uppercase">
                      {item.note}
                    </p>
                  ) : null}
                </div>
              </div>

              {item.tags ? (
                <ul className="flex flex-wrap gap-2.5">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-border bg-background text-text/80 rounded-full border px-3.5 py-2 text-sm leading-5 font-semibold"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text/75 leading-7">{item.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
