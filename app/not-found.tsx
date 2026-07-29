"use client";

import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="bg-background text-text min-h-dvh">
      <section className="container mx-auto flex min-h-dvh items-center justify-center px-5 py-16 md:px-6">
        <div className="border-text/10 w-full max-w-2xl rounded-3xl border bg-white/70 p-8 text-center shadow-sm backdrop-blur md:p-12">
          <span className="border-primary/20 bg-primary/10 text-primary inline-flex rounded-full border px-4 py-1 text-sm font-semibold">
            Error 404
          </span>

          <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
            Esta pagina no pudo encontrarse
          </h1>

          <p className="text-text/75 mx-auto mt-4 max-w-xl text-base leading-7 md:text-lg">
            Es probable que el enlace haya cambiado o que la pagina ya no este
            disponible.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              text="Ir al inicio"
              href="/"
              className="w-full px-8 py-3 sm:w-auto"
            />
          </div>

          <p className="text-text/55 mt-6 text-sm">
            Si buscabas contenido especifico, tambien puedes volver al menu
            principal y retomar desde ahi.
          </p>
        </div>
      </section>
    </main>
  );
}
