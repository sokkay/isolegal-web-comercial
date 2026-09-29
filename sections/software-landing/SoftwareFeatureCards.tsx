import { cn } from "@/utils/cn";
import type { ComponentType, SVGProps } from "react";
import SectionHeading from "./SectionHeading";

export type SoftwareFeatureItem = {
  title: string;
  description: string;
  badge?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type SoftwareFeatureCardsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: SoftwareFeatureItem[];
  className?: string;
};

export default function SoftwareFeatureCards({
  eyebrow,
  title,
  description,
  items,
  className,
}: SoftwareFeatureCardsProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowDarkColor="var(--color-primary-on-dark-gray)"
          title={title}
          description={description}
        />
        <div
          className={cn(
            "grid gap-5",
            items.length === 4
              ? "md:grid-cols-2 xl:grid-cols-4"
              : "md:grid-cols-3"
          )}
        >
          {items.map(
            ({
              title: itemTitle,
              description: itemDescription,
              badge,
              Icon,
            }) => (
              <article
                key={itemTitle}
                className="bg-card-background group dark:bg-surface-tonal-a10 flex h-full flex-col items-center gap-4 rounded-2xl p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8"
              >
                <div className="bg-green-bg dark:bg-primary/35 flex size-16 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 dark:ring-1 dark:ring-(--color-primary-on-dark)/30">
                  {Icon ? (
                    <Icon
                      className="fill-primary size-8 dark:fill-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="text-primary text-2xl font-extrabold dark:text-white">
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="text-text text-xl font-extrabold dark:text-white">
                  {itemTitle}
                </h3>
                <p className="text-text/70 max-w-sm leading-7 dark:text-white/70">
                  {itemDescription}
                </p>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
