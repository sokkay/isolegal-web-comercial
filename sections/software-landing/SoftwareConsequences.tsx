import WarningIcon from "@/public/icons/warning.svg";
import SectionHeading from "./SectionHeading";

type SoftwareConsequencesProps = {
  eyebrow: string;
  title: string;
  description: string;
  listTitle?: string;
  items: string[];
};

export default function SoftwareConsequences({
  eyebrow,
  title,
  description,
  listTitle,
  items,
}: SoftwareConsequencesProps) {
  return (
    <section className="container mx-auto py-16 sm:py-20">
      <SectionHeading
        eyebrow={eyebrow}
        eyebrowDarkColor="var(--color-primary-on-dark-gray)"
        title={title}
        description={description}
      />
      <div className="border-primary/20 bg-card-background mx-auto max-w-5xl rounded-3xl border p-6 shadow-sm sm:p-9">
        {listTitle ? (
          <h3 className="text-text mb-6 text-xl font-extrabold">{listTitle}</h3>
        ) : null}
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="bg-background text-text/80 flex items-start gap-3 rounded-2xl p-4 leading-7"
            >
              <span
                aria-hidden="true"
                className="bg-primary/12 text-primary mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full"
              >
                <WarningIcon className="size-5 fill-current" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
