import { SoftwareComparison } from "@/sections/software-landing";

export default function SstComparison() {
  return (
    <SoftwareComparison
      title="Del Excel reactivo al control real de tu SG-SST"
      description="Esto es lo que cambia cuando tu SST deja de vivir en Excel."
      withoutItems={[
        "Matrices de SST en Excel, desactualizadas y desconectadas de tu evidencia.",
        "Vencimientos de exámenes y capacitaciones que se descubren tarde.",
        "Evidencia dispersa en correos, carpetas y equipos distintos.",
        "Fiscalizaciones que se enfrentan de forma reactiva, sin preparación previa.",
      ]}
      withItems={[
        "Matriz legal SST con actualización permanente y profesional por nuestro equipo legal: no solo se agrega normativa nueva, se administra de forma integral.",
        "Alertas automáticas antes de cada vencimiento.",
        "Evidencia centralizada y trazable, lista para auditar en cualquier momento.",
        "Reportes de cumplimiento generados al instante, no en semanas.",
      ]}
    />
  );
}
