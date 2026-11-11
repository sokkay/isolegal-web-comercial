import type { FaqItem } from "@/components/FaqAccordion";
import EcoIcon from "@/public/icons/eco.svg";
import SupportIcon from "@/public/icons/support.svg";
import VerifiedIcon from "@/public/icons/verified.svg";
import type {
  SoftwareFeatureItem,
  SoftwareRequirementItem,
  SoftwareStep,
} from "@/sections/software-landing";

export const ENVIRONMENT_PILLARS: SoftwareFeatureItem[] = [
  {
    Icon: VerifiedIcon,
    title: "La RCA",
    description:
      "La Resolución de Calificación Ambiental establece las condiciones, medidas y compromisos ambientales que debe cumplir un proyecto aprobado. Su cumplimiento exige seguimiento, gestión de actividades y evidencia verificable ante fiscalizaciones de la SMA.",
  },
  {
    Icon: SupportIcon,
    title: "Las consultas de pertinencia",
    description:
      "Permiten consultar al Servicio de Evaluación Ambiental (SEA) si un proyecto o modificación debe ingresar al SEIA. Sus pronunciamientos deben considerarse en la gestión ambiental de la empresa.",
  },
  {
    Icon: EcoIcon,
    title: "La normativa ambiental",
    description:
      "Comprende la Ley N°19.300 sobre Bases Generales del Medio Ambiente, sus reglamentos y otras exigencias sobre residuos, emisiones, permisos y obligaciones ambientales. Mantener una matriz legal ambiental actualizada permite identificar, gestionar y demostrar su cumplimiento.",
  },
];

export const ENVIRONMENT_COMPARISON = {
  withoutItems: [
    "Normativa ambiental en planillas, difícil de mantener al día.",
    "Compromisos de la RCA y evidencia dispersos entre áreas y carpetas.",
    "Te enteras de los cambios normativos cuando ya te afectan.",
    "Sistemas paralelos para SST y medio ambiente.",
  ],
  withItems: [
    "Matriz legal ambiental administrada de forma integral y permanente por nuestro equipo legal.",
    "Compromisos y condiciones de tu RCA con evidencia centralizada, trazable y lista para fiscalización.",
    "Alertas normativas cuando cambia una norma que te aplica.",
    "Una sola plataforma: si también gestionas SST, ambas conviven en la misma matriz.",
  ],
};

export const ENVIRONMENT_REGULATIONS: SoftwareRequirementItem[] = [
  {
    title: "Evaluación ambiental",
    tags: [
      "RCA y sus compromisos",
      "Pertinencias",
      "DS N°40 (act. DS N°17/2025)",
      "SEIA",
    ],
  },
  {
    title: "Fiscalización y sanción",
    tags: ["Normas SMA", "Ley N°20.417 (LOSMA)", "Permisos sectoriales"],
  },
  { title: "Reporte y residuos", tags: ["RETC", "Ley N°20.920 (REP)"] },
  { title: "Estándares", tags: ["ISO 14001"] },
];

export const ENVIRONMENT_STEPS: SoftwareStep[] = [
  {
    title: "Definimos tu matriz",
    description:
      "Identificamos junto a tu equipo la normativa ambiental aplicable a tu operación y rubro (RCA, normas SMA, RETC y Ley REP cuando corresponde).",
  },
  {
    title: "Gestionas tus compromisos",
    description:
      "Cargas los compromisos y condiciones de tu RCA y tus pertinencias, y registras su evidencia en un solo lugar.",
  },
  {
    title: "Programas y recibes alertas",
    description:
      "Asignas las actividades en Pulso y te avisamos cuando cambia una norma que te aplica o vence un requisito.",
  },
  {
    title: "Demuestras cumplimiento",
    description:
      "Tienes la trazabilidad lista para fiscalizaciones y auditorías.",
  },
];

export const ENVIRONMENT_INDUSTRIES = [
  "Minería",
  "Tratamiento de residuos",
  "Construcción",
  "Combustibles",
  "Energía",
  "Químicos",
  "Universidades",
];

export const ENVIRONMENT_TESTIMONIAL = {
  quote:
    "Desde que comenzamos a utilizar ISOLEGAL en Orbit Garant Chile S.A., hemos experimentado una mejora sustancial en la identificación, seguimiento y control de nuestros requisitos legales aplicables, tanto a nivel ambiental, como en materia de seguridad, salud ocupacional y normativa laboral.",
  name: "Rubén Medina",
  role: "Coordinador HSEQ, Orbit Garant Chile S.A.",
};

export const ENVIRONMENT_FAQ_ITEMS: FaqItem[] = [
  {
    question:
      "¿Qué es una RCA y por qué importa para el cumplimiento ambiental?",
    answer:
      "La Resolución de Calificación Ambiental (RCA) es el acto administrativo que califica ambientalmente un proyecto sometido al SEIA. Cuando es favorable, establece las condiciones, medidas y compromisos ambientales que debe cumplir su titular. Su cumplimiento requiere seguimiento, control y evidencia verificable, y está sujeto a la fiscalización de la Superintendencia del Medio Ambiente (SMA).",
  },
  {
    question: "¿Qué ofrece Isolegal para el cumplimiento ambiental?",
    answer:
      "Incorpora la normativa ambiental aplicable, incluyendo RCA y exigencias de la Superintendencia del Medio Ambiente, dentro de la matriz legal, con evidencia trazable y alertas normativas.",
  },
  {
    question: "¿Puedo gestionar los compromisos de mi RCA en Isolegal?",
    answer:
      "Sí. En la plataforma gestionas los compromisos y condiciones de tu RCA y tus pertinencias, con evidencia trazable, y programas las actividades derivadas en Pulso.",
  },
  {
    question: "¿Qué diferencia hay entre cumplimiento ambiental y SST?",
    answer:
      "SST se centra en la seguridad y salud de las personas (Ley 16.744, DS N°44); el cumplimiento ambiental, en la normativa de protección del medio ambiente (RCA, normas SMA, permisos). Ambos se pueden gestionar en una misma matriz legal en Isolegal; SST tiene su propia página.",
  },
  {
    question: "¿Isolegal es compatible con ISO 14001?",
    answer:
      "Sí. La plataforma organiza evidencia y requisitos alineados al estándar de gestión ambiental ISO 14001.",
  },
  {
    question:
      "¿Isolegal ayuda ante fiscalizaciones de la Superintendencia del Medio Ambiente?",
    answer:
      "Centraliza evidencia y trazabilidad para responder con respaldo documental.",
  },
  {
    question: "¿HSE y SSOMA incluyen medio ambiente?",
    answer:
      "Sí; HSE (Health, Safety, Environment) y SSOMA integran seguridad, salud y medio ambiente. En Isolegal, la parte de seguridad y salud está en SST y HSE y la ambiental, aquí; se pueden trabajar por separado o en una misma matriz.",
  },
  {
    question: "¿Para qué industrias sirve?",
    answer:
      "Para empresas de cualquier rubro con obligaciones ambientales: minería, tratamiento de residuos, construcción, combustibles, energía, químicos y universidades, entre otras.",
  },
];
