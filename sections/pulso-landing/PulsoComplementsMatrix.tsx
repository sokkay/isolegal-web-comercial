import { cn } from "@/utils/cn";

type PulsoComplementsMatrixProps = {
  className?: string;
};

export default function PulsoComplementsMatrix({
  className,
}: PulsoComplementsMatrixProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-text text-3xl leading-tight font-extrabold sm:text-4xl">
            PULSO no reemplaza tu Matriz Legal, la completa
          </h2>
          <p className="text-text/75 mt-4 text-base leading-7 sm:text-lg">
            Son complementarios, no competidores.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          <article className="bg-background dark:bg-surface-tonal-a10 flex flex-col items-center rounded-[20px] p-8 text-center shadow-sm lg:p-10">
            <span className="bg-primary/12 text-primary mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.08em] uppercase">
              Matriz Legal
            </span>
            <h3 className="text-text text-xl font-extrabold">
              ¿Qué normas aplican?
            </h3>
            <p className="text-text/70 mt-3 max-w-sm leading-7">
              Identifica y mantiene actualizadas las obligaciones legales que tu
              empresa debe cumplir.
            </p>
          </article>

          <div
            aria-hidden="true"
            className="text-primary flex items-center justify-center px-4 text-3xl font-extrabold lg:px-6"
          >
            +
          </div>

          <article className="bg-darkBlue flex flex-col items-center rounded-[20px] p-8 text-center text-white shadow-sm lg:p-10">
            <span className="bg-primary text-darkBlue mb-4 inline-block rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.08em] uppercase">
              PULSO
            </span>
            <h3 className="text-xl font-extrabold">
              ¿Quién lo ejecuta y cómo se demuestra?
            </h3>
            <p className="mt-3 max-w-sm leading-7 text-white/75">
              Asigna la ejecución en terreno de esa obligación y registra la
              evidencia de que se cumplió.
            </p>
          </article>
        </div>

        <p className="text-text/65 mx-auto mt-8 max-w-2xl text-center text-sm leading-7 sm:text-base">
          PULSO genera la evidencia de la gestión VIVA de tu cumplimiento: es la
          capa de ejecución que se apoya sobre tu matriz de requisitos legales.
        </p>
      </div>
    </section>
  );
}
