import OurToolsCarousel from "./our-tools-carousel";

export const OurTools = () => {
  return (
    <section className="dark:bg-darkBlue bg-white pt-16">
      <div className="container mx-auto">
        <p className="text-primary mb-4 text-center text-sm font-bold tracking-wider dark:text-white">
          TECNOLOGÍA PROPIA
        </p>
        <h2 className="text-text mb-4 text-center text-3xl font-bold dark:text-white">
          Nuestras Herramientas
        </h2>
        <p className="text-text/75 mx-auto max-w-2xl text-center text-base leading-7">
          Plataformas tecnológicas desarrolladas por Isolegal en Chile para
          automatizar el cumplimiento normativo, asignar responsabilidades
          operativas y consolidar evidencia auditable.
        </p>
        <OurToolsCarousel />
      </div>
    </section>
  );
};
