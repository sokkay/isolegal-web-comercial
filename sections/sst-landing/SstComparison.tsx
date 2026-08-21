import { SoftwareComparison } from "@/sections/software-landing";

export default function SstComparison() {
  return (
    <SoftwareComparison
      title="Del Excel reactivo al control real de tu SG-SST"
      description="Esto es lo que cambia cuando SST, HSE y medio ambiente dejan de vivir en Excel."
      withoutItems={[
        "Matrices de SST y ambiental administradas en Excel.",
        "Vencimientos de exámenes y capacitaciones controlados manualmente.",
        "Evidencia dispersa en correos, carpetas y planillas.",
        "Fiscalizaciones que se enfrentan de forma reactiva.",
      ]}
      withItems={[
        "Matriz legal SST, HSE y ambiental centralizada y actualizada.",
        "Alertas automáticas antes de cada vencimiento.",
        "Evidencia centralizada, trazable y lista para auditoría.",
        "Reportes de cumplimiento generados en minutos.",
      ]}
    />
  );
}
