import DatabaseV2Icon from "@/public/icons/database-v2.svg";
import GestionCumplimientoIcon from "@/public/icons/gestion-cumplimiento.svg";
import HeatmapIcon from "@/public/icons/heat-map.svg";
import MatrizLegalPersonalizadaIcon from "@/public/icons/matriz-legal-perzonalizada.svg";
import PreguntasGuiaIcon from "@/public/icons/preguntas-guia.svg";
import RevisionInteligenteIcon from "@/public/icons/revision-inteligente.svg";
import TableViewIcon from "@/public/icons/table-view.svg";
import VerifiedIcon from "@/public/icons/verified.svg";
import type { ComponentType, SVGProps } from "react";

export type ToolCard = {
  title: string;
  description: string;
  cta: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  accent: "green" | "blue" | "lime";
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const HOME_TOOLS: ToolCard[] = [
  {
    title: "Matriz Legal",
    description:
      "Convierte la normativa aplicable a tu empresa en Chile en requisitos claros y accionables. Actualizada continuamente por abogados especialistas y con evidencia auditable ante fiscalizaciones y certificaciones ISO.",
    cta: "Conoce Matriz Legal",
    href: "/soluciones/matriz-legal",
    imageSrc: "/images/features/dashboard-interactivo.png",
    imageAlt:
      "Dashboard de Matriz Legal con el cumplimiento general de proyectos",
    accent: "green",
    Icon: TableViewIcon,
  },
  {
    title: "PULSO",
    description:
      "Asigna actividades de cumplimiento a tus equipos y empresas contratistas, activa notificaciones automáticas y captura evidencia fotográfica y documental verificable en terreno, garantizando trazabilidad total para tus auditorías.",
    cta: "Conoce PULSO",
    href: "/soluciones/pulso",
    accent: "lime",
    Icon: VerifiedIcon,
  },
];

export type SolutionCard = {
  title: string;
  description: string;
  href: string;
  themeClassName?: string;
};

export const HOME_AREAS: SolutionCard[] = [
  {
    title: "SST y Medio Ambiente",
    description:
      "Sistema de gestión SST y medio ambiente: centraliza matriz legal, evidencia y alertas normativas para tus faenas.",
    href: "/areas/sst",
    themeClassName: "sst-page-theme",
  },
  {
    title: "RESSO (Contratistas Codelco)",
    description:
      "Gestiona tu matriz RESSO (SIGO) para contratistas de Codelco: cumplimiento, evidencia y alertas en una sola plataforma.",
    href: "/areas/resso",
    themeClassName: "resso-page-theme",
  },
  {
    title: "GRC (Gobierno, Riesgo y Cumplimiento)",
    description:
      "Gobierno corporativo, gestión de riesgos y cumplimiento (Ley 20.393, 21.595) centralizados en un solo lugar.",
    href: "/areas/grc",
    themeClassName: "grc-page-theme",
  },
  {
    title: "Modelo de Prevención del Delito (MPD)",
    description:
      "Actualiza tu MPD a la Ley 20.393 y la Ley 21.595: encargado, protocolos y evidencia lista para un tribunal.",
    href: "/soluciones/mdp",
  },
];

export const MATRIX_BENEFITS = [
  {
    Icon: HeatmapIcon,
    title: "Análisis de riesgo con mapa de calor",
    description:
      "Identifica rápidamente las áreas con mayor exposición al incumplimiento normativo. Priorizamos brechas críticas según impacto y probabilidad, para enfocar la gestión donde existe mayor riesgo operacional, legal o reputacional.",
  },
  {
    Icon: MatrizLegalPersonalizadaIcon,
    title: "Matriz legal personalizada y accionable en Chile",
    description:
      "Administramos y mantenemos actualizada tu matriz legal, mostrando solo lo que te aplica según tu rubro y actividad. Sin ruido ni duplicidades.",
  },
  {
    Icon: PreguntasGuiaIcon,
    title: "Interpretación normativa clara y aplicable",
    description:
      "Convertimos requisitos legales complejos en preguntas guía y acciones concretas para facilitar el cumplimiento en terreno.",
  },
  {
    Icon: RevisionInteligenteIcon,
    title: "Revisión inteligente de evidencia con IA",
    description:
      "Nuestro sistema valida si la evidencia cargada es pertinente y suficiente antes de auditorías o fiscalizaciones, reduciendo reprocesos y tiempos de revisión.",
  },
  {
    Icon: GestionCumplimientoIcon,
    title: "Gestión de auditorías y fiscalizaciones",
    description:
      "Gestiona auditorías internas, externas o de certificación con información ordenada, trazable y disponible en tiempo real.",
  },
  {
    Icon: DatabaseV2Icon,
    title: "Base normativa administrada por abogados",
    description:
      "Nuestro equipo legal mantiene actualizada la matriz normativa incorporando cambios legales, derogaciones y nuevas obligaciones aplicables a tu operación.",
  },
];
