import { cn } from "@/utils/cn";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

export type SoftwarePlainColumnItem = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

type SoftwarePlainColumnsProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: SoftwarePlainColumnItem[];
  className?: string;
};

export default function SoftwarePlainColumns({
  eyebrow,
  title,
  description,
  items,
  className,
}: SoftwarePlainColumnsProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowDarkColor="var(--color-primary-on-dark-gray)"
          title={title}
          description={description}
        />
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3 md:gap-12">
          {items.map((item) => (
            <article key={item.title} className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="bg-primary mb-1 block h-1 w-10 rounded-full"
              />
              <h3 className="text-text text-xl font-extrabold">{item.title}</h3>
              <p className="text-text/70 leading-7">{item.description}</p>
              {item.href && item.linkLabel ? (
                <Link
                  href={item.href}
                  className="text-primary hover:text-primary/80 w-fit text-sm font-bold underline-offset-4 hover:underline"
                >
                  {item.linkLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
