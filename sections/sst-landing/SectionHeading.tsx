type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="text-primary mb-3 text-sm font-bold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-text text-3xl leading-tight font-extrabold sm:text-4xl">
        {title}
      </h2>
      <p className="text-text/75 mt-4 text-base leading-7 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
