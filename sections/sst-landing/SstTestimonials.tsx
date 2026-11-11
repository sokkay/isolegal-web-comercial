import { SoftwareTestimonial } from "@/sections/software-landing";

export default function SstTestimonials() {
  return (
    <SoftwareTestimonial
      title="Equipos SST y HSE que ya confiaron en Isolegal"
      items={[
        {
          quote:
            "La plataforma ha representado un gran avance en la gestión del cumplimiento normativo, facilitando el trabajo de contratos y asesores al proporcionar una herramienta más dinámica y amigable frente al uso tradicional de matrices en Excel.",
          name: "Patricia A. Gavilán",
          role: "Jefe de Calidad y Seguridad Ocupacional",
        },
        {
          quote:
            "ISOLEGAL ha sido un antes y un después en cómo manejamos el cumplimiento normativo. Lo que más valoramos es poder anticiparnos a los cambios, en vez de estar siempre reaccionando.",
          name: "Alex Rivera T.",
          role: "Subgerente SSMA, Empresa de Soluciones Mineras (filial ENEX)",
        },
      ]}
    />
  );
}
