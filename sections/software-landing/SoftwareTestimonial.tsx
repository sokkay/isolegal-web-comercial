type SoftwareTestimonialProps = {
  title: string;
  quote: string;
  name: string;
  role: string;
};

export default function SoftwareTestimonial({
  title,
  quote,
  name,
  role,
}: SoftwareTestimonialProps) {
  return (
    <section className="dark:bg-darkBlue bg-white py-16 sm:py-20">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-primary mb-3 text-sm font-bold tracking-[0.18em] uppercase dark:text-(--color-primary-on-dark)">
            Testimonio
          </p>
          <h2 className="text-text text-3xl font-extrabold sm:text-4xl">
            {title}
          </h2>
        </div>
        <figure className="bg-card-background border-primary/15 mx-auto mt-10 max-w-5xl rounded-3xl border p-7 shadow-sm sm:p-10">
          <blockquote className="text-text text-lg leading-8 font-medium sm:text-xl sm:leading-9">
            “{quote}”
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-extrabold text-white"
            >
              {name.charAt(0)}
            </span>
            <span>
              <strong className="text-text block font-extrabold">{name}</strong>
              <span className="text-text/65 mt-1 block text-sm">{role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
