import type { CSSProperties } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  eyebrowDarkColor?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  eyebrowDarkColor = "var(--color-primary-on-dark)",
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? (
        <p
          className="text-primary mb-3 text-sm font-bold tracking-[0.18em] uppercase dark:text-(--eyebrow-dark-color)"
          style={
            {
              "--eyebrow-dark-color": eyebrowDarkColor,
            } as CSSProperties
          }
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-text text-3xl leading-tight font-extrabold sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-text/75 mt-4 text-base leading-7 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
