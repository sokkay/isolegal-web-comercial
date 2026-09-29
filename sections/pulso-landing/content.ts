import type { FaqItem } from "@/components/FaqAccordion";
import AnalyticsIcon from "@/public/icons/analytics.svg";
import ChecklistIcon from "@/public/icons/checklist.svg";
import DocsIcon from "@/public/icons/docs.svg";
import ElectricBoltIcon from "@/public/icons/electric-bolt.svg";
import HealthAndSafetyIcon from "@/public/icons/health-and-safety.svg";
import LockIcon from "@/public/icons/lock.svg";
import TableViewIcon from "@/public/icons/table-view.svg";
import VerifiedIcon from "@/public/icons/verified.svg";
import type { RiskCalculatorInformationItem } from "@/sections/risk-calculator/risk-calculator-banner";
import type { SoftwareFeatureItem } from "@/sections/software-landing";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const PULSO_WHAT_IS_STEPS = [
  "Asigna la actividad a cada persona",
  "Notifica automáticamente qué le toca",
  "Registra la evidencia exigida",
] as const;

export type PulsoHowItWorksStep = {
  number: string;
  title: string;
  description: string;
  imageAlt: string;
  // Rutas previstas cuando el cliente envíe capturas:
  // /images/pulso/paso-01.png … /images/pulso/paso-04.png
  imageSrc?: string;
};

export const PULSO_HOW_IT_WORKS_STEPS: PulsoHowItWorksStep[] = [
  {
    number: "01",
    title: "Asignas el programa",
    description:
      "Cada integrante del equipo recibe un programa de actividades de cumplimiento hecho para su rol.",
    imageAlt: "Programa de actividades asignado en PULSO",
  },
  {
    number: "02",
    title: "PULSO notifica",
    description:
      "La persona recibe la notificación de qué actividad le corresponde, sin que nadie tenga que recordárselo.",
    imageAlt: "Notificación de actividad en PULSO",
  },
  {
    number: "03",
    title: "Se registra evidencia",
    description:
      "Cada actividad define desde el inicio qué evidencia debe quedar: fotos, checklist, firma, entre otros. La evidencia se carga como cumplimiento en las matrices asociadas.",
    imageAlt: "Registro de evidencia requerida en PULSO",
  },
  {
    number: "04",
    title: "Queda lista para auditar",
    description:
      "Evidencia trazable y centralizada, disponible para revisar en cualquier momento.",
    imageAlt: "Evidencia lista para auditar en PULSO",
  },
];

export type PulsoAudienceItem = {
  text: string;
  Icon: IconComponent;
};

export type PulsoAudience = {
  title: string;
  items: PulsoAudienceItem[];
};

export const PULSO_AUDIENCES: PulsoAudience[] = [
  {
    title: "Para gerencia y equipos legales",
    items: [
      {
        Icon: DocsIcon,
        text: "Deja de perseguir evidencia dispersa entre correos y carpetas compartidas.",
      },
      {
        Icon: VerifiedIcon,
        text: "Demuestra ante cualquier auditoría o fiscalización que las obligaciones se ejecutaron.",
      },
      {
        Icon: AnalyticsIcon,
        text: "Visibilidad completa de qué se ha hecho y qué sigue pendiente, sin pedir reportes.",
      },
    ],
  },
  {
    title: "Para equipos SSOMA y de terreno",
    items: [
      {
        Icon: ElectricBoltIcon,
        text: "Sabes exactamente qué actividad te corresponde hoy, sin depender de que te avisen.",
      },
      {
        Icon: ChecklistIcon,
        text: "Registras la evidencia (foto, checklist, firma) directamente donde ocurre el trabajo.",
      },
      {
        Icon: HealthAndSafetyIcon,
        text: "Sin planillas paralelas que llenar después de terreno.",
      },
    ],
  },
];

export const PULSO_FEATURES: SoftwareFeatureItem[] = [
  {
    Icon: VerifiedIcon,
    title: "Trazabilidad real",
    description:
      "Cada actividad queda con su evidencia asociada, no en la memoria de alguien.",
  },
  {
    Icon: ElectricBoltIcon,
    title: "Menos seguimiento manual",
    description:
      "Las notificaciones reemplazan el “¿ya lo hiciste?” por correo o WhatsApp.",
  },
  {
    Icon: LockIcon,
    title: "Listo para auditar",
    description:
      "La evidencia queda centralizada y disponible antes de que la pidan.",
  },
  {
    Icon: TableViewIcon,
    title: "Complementa tu matriz",
    description:
      "Se apoya en tu Matriz Legal / Riesgo existente, no la reemplaza ni la duplica.",
  },
];

export const PULSO_FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es PULSO?",
    answer:
      "PULSO (Programa Unificado Legal de Seguimiento en la Operación) es el software de Isolegal para gestionar y hacer seguimiento de las actividades de cumplimiento normativo en terreno, con evidencia trazable y lista para auditar.",
  },
  {
    question: "¿PULSO reemplaza la Matriz Legal de Isolegal?",
    answer:
      "No. La Matriz Legal responde qué normas aplican y hay que cumplir; PULSO responde quién ejecuta esa obligación en terreno y cómo se demuestra que se cumplió. Son complementarios, no competidores.",
  },
  {
    question: "¿Qué tipo de evidencia registra PULSO?",
    answer:
      "Cada actividad define desde el inicio qué evidencia debe quedar registrada: fotos, checklist, firma, entre otros formatos, según lo que la actividad requiera demostrar.",
  },
  {
    question: "¿Cómo sabe cada persona qué actividad le corresponde?",
    answer:
      "PULSO asigna un programa de actividades a cada integrante del equipo y le notifica automáticamente qué actividad le corresponde, sin depender de que alguien la revise o se la recuerde manualmente.",
  },
];

export const PULSO_RISK_CTA_ITEMS: RiskCalculatorInformationItem[] = [
  {
    title: "Diagnóstico de seguimiento en terreno",
    description:
      "Identificamos cómo registras hoy las actividades de cumplimiento.",
  },
  {
    title: "Evidencia lista para auditar",
    description:
      "Conoce cómo PULSO centraliza fotos, checklists y firmas de tu operación.",
  },
  {
    title: "Agenda una reunión",
    description: "Conversa con un especialista sobre el programa de tu equipo.",
  },
];

export type PulsoTestimonial = {
  id: string;
  company: string;
  quote: string;
  personName: string;
  role: string;
  logoMatch: string;
};

export const PULSO_TESTIMONIALS: PulsoTestimonial[] = [
  {
    id: "orbit-garant",
    company: "Orbit Garant Chile S.A.",
    quote:
      "Desde que comenzamos a utilizar ISOLEGAL, hemos experimentado una mejora sustancial en la identificación, seguimiento y control de nuestros requisitos legales aplicables.",
    personName: "Rubén Medina",
    role: "Coordinador HSEQ",
    logoMatch: "Orbit",
  },
  {
    id: "avus",
    company: "AVUS",
    quote:
      "En AVUS, la experiencia de trabajo junto a ISOLEGAL ha sido altamente positiva. Destacamos especialmente su profesionalismo, flexibilidad y capacidad de análisis…",
    personName: "Rodrigo Bravo C.",
    role: "Socio Fundador & Risk Architect Lead",
    logoMatch: "AVUS",
  },
  {
    id: "esm-enex",
    company: "ESM · Filial ENEX",
    quote:
      "El trabajo realizado junto a Isolegal fue un factor clave para que ESM destacara en su auditoría de normas ISO, particularmente en el control y cumplimiento de sus obligaciones legales.",
    personName: "Alex Rivera T.",
    role: "Subgerente SSMA",
    logoMatch: "ESM",
  },
];
