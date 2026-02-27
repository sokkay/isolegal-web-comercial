export function toStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function toRiskLevel(value: unknown): "bajo" | "alto" | "critico" {
  if (value === "bajo" || value === "alto" || value === "critico") return value;
  return "alto";
}

export function buildRiskCalculatorEmailParamsFromRecord(
  record: Record<string, unknown>,
) {
  const rawRubro = String(record.rubro ?? "");
  const rawRubroOtro = String(record.rubro_otro ?? "");
  const rubro =
    rawRubro === "otro" && rawRubroOtro.trim().length > 0
      ? rawRubroOtro
      : rawRubro;

  return {
    toEmail: String(record.correo_corporativo ?? ""),
    toName: String(record.nombre_completo ?? ""),
    empresa: String(record.empresa ?? ""),
    score: Number(record.score ?? 0),
    riskLevel: toRiskLevel(record.nivel_riesgo),
    rubro,
    normasISO: toStringArray(record.normas_iso),
    gestionMatriz: String(record.gestion_matriz ?? ""),
    ultimaActualizacion: String(record.ultima_actualizacion ?? ""),
    normasTratadas: toStringArray(record.normas_tratadas),
    cambioNormativo: String(record.cambio_normativo ?? ""),
    evidenciaTrazable: String(record.evidencia_trazable ?? ""),
    compromisosVoluntarios: String(record.compromisos_voluntarios ?? ""),
  };
}
