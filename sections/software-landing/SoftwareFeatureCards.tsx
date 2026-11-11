import FadeIn from "@/components/FadeIn";
import { cn } from "@/utils/cn";
import type { ComponentType, ReactNode, SVGProps } from "react";
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
  children?: ReactNode;
};

export default function SoftwareFeatureCards({
  eyebrow,
  title,
  description,
  items,
  className,
  children,
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
            (
              { title: itemTitle, description: itemDescription, badge, Icon },
              index
            ) => (
              <FadeIn key={itemTitle} delay={index * 0.12} className="h-full">
                <article className="bg-card-background group dark:bg-surface-tonal-a10 flex h-full flex-col items-center gap-4 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 lg:p-8">
                  <div className="bg-green-bg dark:bg-primary/35 flex size-16 shrink-0 items-center justify-center rounded-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 dark:ring-1 dark:ring-(--color-primary-on-dark)/30">
                    {Icon ? (
                      <Icon
                        className="fill-primary size-8 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-rotate-6 dark:fill-white"
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
                  {itemDescription ? (
                    <p className="text-text/70 max-w-sm leading-7 dark:text-white/70">
                      {itemDescription}
                    </p>
                  ) : null}
                </article>
              </FadeIn>
            )
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
