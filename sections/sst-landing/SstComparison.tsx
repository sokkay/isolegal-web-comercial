import CheckIcon from "@/public/icons/check.svg";
import CloseIcon from "@/public/icons/close.svg";
import SectionHeading from "./SectionHeading";

// TODO(copy-sst): confirmar estas frases reconstruidas desde la tabla truncada del PDF.
const comparison = {
  without: [
    "Matrices de SST y ambiental administradas en Excel.",
    "Vencimientos de exámenes y capacitaciones controlados manualmente.",
    "Evidencia dispersa en correos, carpetas y planillas.",
    "Fiscalizaciones que se enfrentan de forma reactiva.",
  ],
  with: [
    "Matriz legal SST, HSE y ambiental centralizada y actualizada.",
    "Alertas automáticas antes de cada vencimiento.",
    "Evidencia centralizada, trazable y lista para auditoría.",
    "Reportes de cumplimiento generados en minutos.",
  ],
};

export default function SstComparison() {
  return (
    <section className="dark:bg-darkBlue bg-white py-16 sm:py-20">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Antes y después"
          title="Del Excel reactivo al control real de tu SG-SST"
          description="Esto es lo que cambia cuando SST, HSE y medio ambiente dejan de vivir en Excel."
        />
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl shadow-sm lg:grid-cols-2">
          <ComparisonColumn
            title="Sin Isolegal"
            items={comparison.without}
            muted
          />
          <ComparisonColumn title="Con Isolegal" items={comparison.with} />
        </div>
      </div>
    </section>
  );
}

function ComparisonColumn({
  title,
  items,
  muted = false,
}: {
  title: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <article
      className={
        muted ? "bg-background p-6 sm:p-8" : "bg-card-background p-6 sm:p-8"
      }
    >
      <h3
        className={`text-xl font-extrabold ${
          muted ? "text-text/70" : "text-primary"
        }`}
      >
        {title}
      </h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="text-text/80 flex items-start gap-3.5 leading-7"
          >
            <span
              aria-hidden="true"
              className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${
                muted
                  ? "bg-red-500/10 text-red-500 dark:text-red-400"
                  : "bg-primary/12 text-primary"
              }`}
            >
              {muted ? (
                <CloseIcon className="size-4 fill-current" />
              ) : (
                <CheckIcon className="size-4 fill-current" />
              )}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
