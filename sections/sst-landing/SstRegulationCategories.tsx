import { SoftwareRequirements } from "@/sections/software-landing";

const regulationCategories = [
  {
    title: "Seguridad y Salud Laboral",
    tags: ["Ley 16.744", "DS N°44", "DS N°594", "Protocolos MINSAL"],
  },
  {
    title: "Quién fiscaliza",
    tags: ["Dirección del Trabajo", "SEREMI de Salud", "SERNAGEOMIN (minería)"],
  },
  {
    title: "Estándares Internacionales",
    note: "Voluntarios",
    tags: ["ISO 45001", "ISO 9001", "Modelos de gestión SIG"],
  },
  {
    title: "Exigencias de Mandantes",
    tags: ["SIGO", "RESSO", "RECSS", "Auditorías de contratistas"],
  },
];

export default function SstRegulationCategories() {
  return (
    <SoftwareRequirements
      eyebrow="Cobertura integral"
      title="Toda la normativa SST y exigencias de mandantes en un solo lugar"
      description="Nuestro equipo legal mantiene la matriz actualizada en las dimensiones que más le importan a tu operación."
      items={regulationCategories}
    />
  );
}
