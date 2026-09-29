import { cn } from "@/utils/cn";
import SectionHeading from "./SectionHeading";

export type SoftwareSanctionItem = {
  title: string;
  description: string;
};

type SoftwareSanctionsStripProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: SoftwareSanctionItem[];
  className?: string;
};

export default function SoftwareSanctionsStrip({
  eyebrow,
  title,
  description,
  items,
  className,
}: SoftwareSanctionsStripProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowDarkColor="var(--color-primary-on-dark-gray)"
          title={title}
          description={description}
        />
        <div className="border-primary/20 bg-card-background mx-auto grid max-w-6xl rounded-3xl border shadow-sm sm:grid-cols-3">
          {items.map((item, index) => (
            <div key={item.title} className="relative space-y-2 p-6 sm:p-9">
              {index > 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="bg-primary/25 absolute top-8 bottom-8 left-0 hidden w-px sm:block"
                  />
                  <span
                    aria-hidden="true"
                    className="bg-primary/25 absolute inset-x-6 top-0 h-px sm:hidden"
                  />
                </>
              ) : null}
              <strong className="text-text block text-lg font-extrabold">
                {item.title}
              </strong>
              <p className="text-text/70 leading-7">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
