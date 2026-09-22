import IsolegalSolutionsCarousel from "@/sections/isolegal-solutions-carousel";

export default function IsolegalSolutions() {
  return (
    <section className="dark:bg-darkBlue bg-white pt-16">
      <div className="container mx-auto">
        <h2 className="text-text mb-4 text-center text-3xl font-bold dark:text-white">
          Descubre las soluciones que ofrece Isolegal
        </h2>
        <p className="text-text/75 mx-auto max-w-2xl text-center text-base leading-7">
          Áreas de cumplimiento que ya resolvemos con matriz legal, evidencia y
          alertas normativas adaptadas a cada industria.
        </p>
        <IsolegalSolutionsCarousel />
      </div>
    </section>
  );
}
