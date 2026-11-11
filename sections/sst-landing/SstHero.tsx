import { SoftwareHero } from "@/sections/software-landing";

export default function SstHero() {
  return (
    <SoftwareHero
      eyebrow="SST"
      title="Sistema de Gestión de Seguridad y Salud en el Trabajo para empresas en Chile"
      description="Isolegal centraliza tu cumplimiento de seguridad y salud en el trabajo en una sola plataforma: matriz legal, evidencia auditable y alertas normativas, sin planillas paralelas."
      coverageTitle="Cobertura normativa incluida"
      coverageItems={[
        "Ley 16.744",
        "DS N°44",
        "ISO 45001",
        "SIGO/RESSO",
        "RECSS",
      ]}
      messageLabel="¿Qué necesita resolver tu equipo SSOMA?"
      messagePlaceholder="Cuéntanos el desafío SST, HSE o ambiental de tu equipo..."
    />
  );
}
