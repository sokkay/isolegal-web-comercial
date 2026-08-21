import { SoftwareHero } from "@/sections/software-landing";

export default function SstHero() {
  return (
    <SoftwareHero
      eyebrow="SST · HSE · Medio Ambiente"
      title="Sistema de Gestión de Seguridad y Salud en el Trabajo para Empresas en Chile"
      lead="Isolegal unifica SST y HSE en una sola plataforma."
      description="Centraliza tu matriz legal, evidencia auditable y alertas normativas, sin planillas paralelas."
      coverageTitle="Cobertura normativa incluida"
      coverageItems={[
        "Ley 16.744",
        "DS N°44",
        "DS N°594",
        "ISO 45001",
        "ISO 14001",
        "SIGO / RESSO",
        "RECSS",
      ]}
      messageLabel="¿Qué necesita resolver tu equipo SSOMA?"
      messagePlaceholder="Cuéntanos el desafío SST, HSE o ambiental de tu equipo..."
    />
  );
}
