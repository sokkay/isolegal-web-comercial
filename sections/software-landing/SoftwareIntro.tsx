import SectionHeading from "./SectionHeading";

type SoftwareIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SoftwareIntro({
  eyebrow,
  title,
  description,
}: SoftwareIntroProps) {
  return (
    <section className="container mx-auto py-16 sm:py-20">
      <SectionHeading
        eyebrow={eyebrow}
        eyebrowDarkColor="var(--color-primary-on-dark-gray)"
        title={title}
        description={description}
      />
    </section>
  );
}
