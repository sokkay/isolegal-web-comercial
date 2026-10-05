import AnimatedCounter from "@/components/AnimatedCounter";

export type IsolegalRoiItem = {
  number: number;
  type: "number" | "hours" | "porcentaje";
  title: string;
  description: string;
};

const roi: IsolegalRoiItem[] = [
  {
    number: 50,
    type: "number",
    title: "Faenas mineras en Chile",
    description:
      "Isolegal ya opera donde el cumplimiento no es teórico, sino parte de la operación diaria y la exigencia regulatoria es permanente.",
  },
  {
    number: 200,
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

type IsolegalRoiProps = {
  items?: IsolegalRoiItem[];
  title?: string;
};

export default function IsolegalRoi({
  items = roi,
  title = "Los números nos avalan",
}: IsolegalRoiProps = {}) {
  return (
    <section className="dark:bg-darkBlue bg-white pt-16">
      <div className="container mx-auto">
        <div className="flex w-full flex-col items-center">
          <h2 className="text-text mb-10 text-center text-3xl font-bold">
            {title}
          </h2>
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.title}
                className="bg-green-bg dark:bg-card-background text-text flex flex-col items-center gap-4 rounded-2xl p-5.5"
              >
                <AnimatedCounter value={item.number} type={item.type} />
                <h3 className="text-center text-lg font-bold">{item.title}</h3>
                <p className="font-norma text-center text-base">
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
