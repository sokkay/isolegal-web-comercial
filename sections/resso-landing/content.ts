import type { FaqItem } from "@/components/FaqAccordion";
import type { IsolegalRoiItem } from "@/sections/isolegal-roi";
import type {
  SoftwareRequirementItem,
  SoftwareStep,
} from "@/sections/software-landing";

export const RESSO_COMPARISON = {
  withoutItems: [
    "Matriz RESSO armada manualmente en Excel, desactualizada frente a cada cambio normativo.",
    "Riesgo de restricción de ingreso a faena por documentación incompleta o vencida.",
    "Evidencia dispersa entre correos, carpetas compartidas y equipos distintos.",
    "Preparación reactiva antes de cada reunión con el administrador de contrato.",
  ],
  withItems: [
    "Matriz legal RESSO administrada de forma integral y permanente por nuestro equipo legal.",
    "Alertas automáticas antes de cada vencimiento o cambio normativo.",
    "Evidencia centralizada y trazable, lista para cualquier fiscalización o auditoría de Codelco.",
    "Reportes de cumplimiento generados al instante, no en semanas.",
  ],
};

export const RESSO_REQUIREMENTS: SoftwareRequirementItem[] = [
  {
    title: "SGSST",
    description:
      "Sistema de Gestión de Seguridad y Salud en el Trabajo propio de la empresa contratista.",
  },
  {
    title: "Programa de Trabajo",
    description:
      "Se entrega a Codelco antes del inicio de la obra, faena o servicio.",
  },
  {
    title: "Matriz de cumplimiento legal",
    description:
      "Incluye la Ley 16.744, el DS N°76, el DS N°44 y el propio RESSO.",
  },
  {
    title: "Identificación de peligros y evaluación de riesgos",
    description: "Considera controles específicos para cada actividad.",
  },
  {
    title: "Indicadores de control",
    description:
      "Permiten respaldar las reuniones periódicas con el administrador de contrato.",
  },
];

export const RESSO_STEPS: SoftwareStep[] = [
  {
    title: "Definimos tu matriz",
    description:
      "Identificamos junto a tu equipo los requisitos del RESSO aplicables a tu contrato con Codelco.",
  },
  {
    title: "Centralizas evidencia",
    description:
      "Programa de trabajo, matriz de riesgos e indicadores quedan asociados a cada requisito.",
  },
  {
    title: "Recibes alertas",
    description:
      "Te avisamos automáticamente sobre los cambios normativos ya incorporados en tu matriz.",
  },
  {
    title: "Demuestras cumplimiento",
    description:
      "Genera reportes listos para tu próxima reunión con el administrador de contrato de Codelco.",
  },
];

export const RESSO_CONSEQUENCES = [
  "Restricción o no ingreso a faena.",
  "Multas o sanciones contractuales.",
  "Suspensión de trabajos.",
  "Afectación de la evaluación de cumplimiento del contrato.",
];

export const RESSO_METRICS: IsolegalRoiItem[] = [
  {
    number: 30,
    type: "number",
    title: "Faenas mineras en Chile",
    description:
      "Isolegal ya opera donde el cumplimiento no es teórico, sino parte de la operación diaria.",
  },
  {
    number: 100,
    type: "number",
    title: "Usuarios activos",
    description:
      "Equipos legales y prevencionistas centralizan obligaciones y evidencias en un solo lugar.",
  },
  {
    number: 100,
    type: "porcentaje",
    title: "Reducen no conformidades",
    description:
      "Cada requisito se gestiona con evidencia trazable, lista para auditoría.",
  },
];

export const RESSO_FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es el RESSO?",
    answer:
      "Es el Reglamento Especial de Seguridad y Salud Ocupacional que Codelco exige a sus empresas contratistas y subcontratistas.",
  },
  {
    question: "¿Qué diferencia hay entre el RESSO y el SIGO?",
    answer:
      "El SIGO corresponde al sistema integral de gestión de Codelco y el RESSO es el reglamento especial aplicable a sus empresas contratistas y subcontratistas.",
  },
  {
    question: "¿Isolegal reemplaza la matriz RESSO que llevamos en Excel?",
    answer:
      "Sí. Centraliza tu matriz legal, evidencia y programa de trabajo en una plataforma colaborativa y auditable, eliminando el manejo manual en planillas.",
  },
  {
    question: "¿Qué pasa si mi RESSO no está vigente o tiene errores?",
    answer:
      "Puede significar restricciones de ingreso a faena, multas o sanciones contractuales, suspensión de trabajos o una evaluación de cumplimiento desfavorable.",
  },
  {
    question: "¿El RESSO aplica solo a Codelco o también a otras mineras?",
    answer:
      "El RESSO es específico de Codelco. Otras compañías mineras cuentan con estándares o reglamentos equivalentes con nombres diferentes, como el RECSS de Antofagasta Minerals.",
  },
  {
    question:
      "¿Cómo ayuda Isolegal a preparar la reunión con el administrador de contrato?",
    answer:
      "Genera reportes de cumplimiento con indicadores de control listos para presentar y evidencia trazable para cada requisito.",
  },
];

export const RESSO_TESTIMONIAL = {
  quote:
    "Desde que comenzamos a utilizar ISOLEGAL en Orbit Garant Chile S.A., hemos experimentado una mejora sustancial en la identificación, seguimiento y control de nuestros requisitos legales aplicables, tanto a nivel ambiental, como en materia de seguridad, salud ocupacional y normativa laboral.",
  name: "Rubén Medina",
  role: "Coordinador HSEQ, Orbit Garant Chile S.A.",
};
