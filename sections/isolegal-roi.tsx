"use client";

import AnimatedCounter from "@/components/AnimatedCounter";

const roi = [
  {
    number: 30,
    type: "number",
    title: "Faenas mineras en Chile",
    description:
      "Isolegal ya opera donde el cumplimiento no es teórico, sino parte de la operación diaria y la exigencia regulatoria es permanente.",
  },
  {
    number: 100,
    type: "number",
    title: "Usuarios Activos",
    description:
      "Equipos legales, prevencionistas y áreas de gestión utilizan Isolegal para centralizar obligaciones, evidencias y reportes en un solo lugar.",
  },
  {
    number: 100,
    type: "porcentaje",
    title: "Clientes reducen o eliminan no conformidades",
    description:
      "Con Isolegal, cada requisito se gestiona con evidencia trazable, disminuyendo el riesgo de incumplimiento y fortaleciendo los resultados en auditorías.",
  },
];

export default function IsolegalRoi() {
  return (
    <section className="bg-white dark:bg-darkBlue pt-16">
      <div className="container mx-auto">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-text text-3xl font-bold mb-10 text-center">
            Los números nos avalan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {roi.map((item) => (
              <div
                key={item.title}
                className="p-5.5 bg-green-bg dark:bg-card-background rounded-2xl flex flex-col items-center gap-4 text-text"
              >
                <AnimatedCounter value={item.number} type={item.type} />
                <h3 className="text-lg font-bold text-center">{item.title}</h3>
                <p className="text-base text-center font-norma">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
