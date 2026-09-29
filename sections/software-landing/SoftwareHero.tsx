import type { ContactFormData } from "@/lib/schemas/contactForm";
import ContactForm from "@/sections/heading/ContactForm";

type SoftwareHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  description: string;
  coverageTitle?: string;
  coverageItems?: string[];
  coverageVariant?: "chips" | "list";
  formTitle?: string;
  formDescription?: string;
  defaultCargo?: ContactFormData["cargo"];
  messageLabel: string;
  messagePlaceholder: string;
  submitText?: string;
};

export default function SoftwareHero({
  eyebrow,
  title,
  lead,
  description,
  coverageTitle,
  coverageItems,
  coverageVariant = "chips",
  formTitle,
  formDescription,
  defaultCargo,
  messageLabel,
  messagePlaceholder,
  submitText,
}: SoftwareHeroProps) {
  return (
    <section className="bg-darkBlue text-white">
      <div className="container mx-auto grid items-start gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(480px,0.95fr)] lg:py-20 xl:gap-14">
        <div className="space-y-6 lg:sticky lg:top-28">
          {eyebrow ? (
            <p className="text-sm font-extrabold tracking-[0.18em] text-(--color-primary-on-dark) uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl leading-[1.06] font-extrabold tracking-[-1.5px] sm:text-5xl xl:text-6xl">
            {title}
          </h1>
          {lead ? (
            <p className="text-xl leading-8 font-semibold text-white/95">
              {lead}
            </p>
          ) : null}
          <p className="max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            {description}
          </p>

          {coverageTitle && coverageItems && coverageItems.length > 0 ? (
            <div>
              <p className="mb-3 text-sm font-bold text-white/90">
                {coverageTitle}
              </p>
              {coverageVariant === "list" ? (
                <ul
                  className="space-y-3 text-white/80"
                  aria-label={coverageTitle}
                >
                  {coverageItems.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="size-1.5 shrink-0 rounded-full bg-white" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="flex flex-wrap gap-2" aria-label={coverageTitle}>
                  {coverageItems.map((item) => (
                    <li
                      key={item}
                      className="border-primary/45 bg-primary/15 rounded-full border px-3 py-1.5 text-sm font-semibold text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>

        <ContactForm
          title={formTitle}
          description={formDescription}
          defaultCargo={defaultCargo}
          messageLabel={messageLabel}
          messagePlaceholder={messagePlaceholder}
          submitText={submitText}
        />
      </div>
    </section>
  );
}
