import IsolegalRoi, { type IsolegalRoiItem } from "@/sections/isolegal-roi";

const proofPoints: IsolegalRoiItem[] = [
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
    title: "Usuarios activos",
    description:
      "Equipos legales, prevencionistas y áreas de gestión utilizan Isolegal para centralizar obligaciones, evidencias y reportes en un solo lugar.",
  },
  {
    number: 100,
    type: "porcentaje",
    title: "Clientes reducen o eliminan no conformidades",
    description:
      "Con Isolegal, cada requisito se gestiona con evidencia trazable, disminuyendo el riesgo de incumplimiento y fortaleciendo los resultados en auditoría.",
  },
];

export default function SstMetrics() {
  return <IsolegalRoi items={proofPoints} />;
}
