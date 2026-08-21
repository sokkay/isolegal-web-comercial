import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

type SoftwareFaqProps = {
  id: string;
  titleId: string;
  title: string;
  items: FaqItem[];
};

export default function SoftwareFaq({
  id,
  titleId,
  title,
  items,
}: SoftwareFaqProps) {
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="bg-background relative isolate overflow-hidden py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-60 dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-primary) 20%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 20%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden opacity-70 dark:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-primary-on-dark) 34%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-primary-on-dark) 34%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_10%,var(--color-background)_78%)]"
      />

      <div className="container mx-auto">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span
              aria-hidden="true"
              className="bg-primary mx-auto mb-5 block size-9 mask-[url('/icons/psychiatry.svg')] mask-contain mask-center mask-no-repeat dark:bg-(--color-primary-on-dark-gray)"
            />
            <p className="text-primary mb-3 text-sm font-bold tracking-[0.18em] uppercase dark:text-(--color-primary-on-dark-gray)">
              Resolvemos tus dudas
            </p>
            <h2
              id={titleId}
              className="text-text text-3xl font-extrabold sm:text-4xl"
            >
              {title}
            </h2>
          </div>
          <FaqAccordion
            items={items}
            useThemeAccent
            className="bg-card-background rounded-2xl px-5 shadow-lg shadow-black/5 sm:px-8"
          />
        </div>
      </div>
    </section>
  );
}
