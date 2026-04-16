"use client";

import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-background text-text">
      <section className="container mx-auto flex min-h-dvh items-center justify-center px-5 py-16 md:px-6">
        <div className="w-full max-w-2xl rounded-3xl border border-text/10 bg-white/70 p-8 text-center shadow-sm backdrop-blur md:p-12">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Error 404
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Esta pagina no pudo encontrarse
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text/75 md:text-lg">
            Es probable que el enlace haya cambiado o que la pagina ya no este
            disponible.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              text="Ir al inicio"
              href="/"
              className="w-full sm:w-auto px-8 py-3"
            />
          </div>

          <p className="mt-6 text-sm text-text/55">
            Si buscabas contenido especifico, tambien puedes volver al menu
            principal y retomar desde ahi.
          </p>
        </div>
      </section>
    </main>
  );
}
