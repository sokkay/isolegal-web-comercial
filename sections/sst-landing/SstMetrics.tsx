import IsolegalRoi, { type IsolegalRoiItem } from "@/sections/isolegal-roi";

const proofPoints: IsolegalRoiItem[] = [
  {
    number: 50,
    type: "number",
    title: "Faenas mineras con SST activo",
    description: "Operando bajo exigencia regulatoria permanente.",
  },
  {
    number: 200,
    type: "number",
    title: "Prevencionistas y equipos SSOMA/HSE",
    description: "Usando Isolegal para centralizar su gestión.",
  },
  {
    number: 100,
    type: "porcentaje",
    title: "Menos no conformidades SST",
    description: "Con evidencia trazable en SST, HSE y ambiental.",
  },
];

export default function SstMetrics() {
  return <IsolegalRoi items={proofPoints} />;
}
