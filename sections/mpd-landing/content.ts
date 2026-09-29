import type { FaqItem } from "@/components/FaqAccordion";
import ChecklistIcon from "@/public/icons/checklist.svg";
import DocsIcon from "@/public/icons/docs.svg";
import GroupsIcon from "@/public/icons/groups.svg";
import VerifiedIcon from "@/public/icons/verified.svg";
import type { RiskCalculatorInformationItem } from "@/sections/risk-calculator/risk-calculator-banner";
import type {
  SoftwareFeatureItem,
  SoftwareRequirementItem,
  SoftwareSanctionItem,
  SoftwareStep,
} from "@/sections/software-landing";

export const MPD_FEATURES: SoftwareFeatureItem[] = [
  {
    Icon: GroupsIcon,
    title: "Cultura de cumplimiento y ética corporativa",
    description:
      "Instalamos lineamientos claros que promueven la integridad, la toma de decisiones éticas y las buenas prácticas en todos los niveles de la organización.",
  },
  {
    Icon: ChecklistIcon,
    title: "Identificación de riesgos a la medida",
    description:
      "Levantamiento riguroso de las actividades y procesos específicos de tu empresa con exposición a delitos económicos y corporativos, evitando plantillas genéricas.",
  },
  {
    Icon: DocsIcon,
    title: "Protocolos operativos claros",
    description:
      "Diseño de directrices y mecanismos de control interno aplicables al flujo real de trabajo de tu equipo, totalmente comprensibles y ejecutables.",
  },
  {
    Icon: VerifiedIcon,
    title: "Trazabilidad de evidencia con PULSO",
    description:
      "Respaldamos la evidencia de los controles y su difusión a través de PULSO, la herramienta online de Isolegal, asegurando registros ordenados ante cualquier requerimiento.",
  },
];

export const MPD_REQUIREMENTS: SoftwareRequirementItem[] = [
  {
    title: "Identificación de riesgos",
    description:
      "Mapeo de las actividades o procesos con mayor riesgo de que se cometa alguno de los delitos de la ley.",
  },
  {
    title: "Protocolos y canal de denuncias",
    description:
      "Procedimientos, sistema de sanciones internas y canal de denuncias seguro, comunicados a los trabajadores.",
  },
  {
    title: "Encargado de prevención",
    description:
      "Persona designada con independencia, facultades y acceso directo a la administración.",
  },
  {
    title: "Evaluación por tercero independiente",
    description:
      "Revisión al menos anual, ajena a la empresa, para perfeccionar y actualizar el modelo.",
  },
];

export const MPD_STEPS: SoftwareStep[] = [
  {
    title: "Diagnosticamos tu exposición",
    description:
      "Revisamos tu modelo actual contra el catálogo de delitos ampliado por la Ley 21.595.",
  },
  {
    title: "Actualizamos el modelo",
    description:
      "Identificación de riesgos, protocolos, canal de denuncias y designación del encargado de prevención.",
  },
  {
    title: "Documentamos evidencia con PULSO",
    description:
      "Cada elemento del artículo 4° queda respaldado y se hace trazable por medio de PULSO, la herramienta online de gestión de Isolegal, listo para una evaluación por tercero independiente.",
  },
  {
    title: "Preparas tu defensa",
    description:
      "Si la empresa es investigada, cuentas con evidencia de que el modelo estaba efectivamente implementado.",
  },
];

export const MPD_SANCTIONS: SoftwareSanctionItem[] = [
  {
    title: "Multas de 10 a 2.000.000 UTM",
    description: "Según la gravedad del delito.",
  },
  {
    title: "Prohibición de contratar con el Estado",
    description: "Incluye licitaciones públicas.",
  },
  {
    title: "Publicación de la sentencia",
    description: "Más comiso de las ganancias del delito.",
  },
];

export const MPD_FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es el Modelo de Prevención de Delitos?",
    answer:
      "El Modelo de Prevención de Delitos (MPD) es el sistema de control interno que exige la Ley N°20.393 para que una empresa pueda eximirse de responsabilidad penal cuando alguien dentro de la organización comete uno de los delitos que la ley contempla. Desde la reforma de la Ley N°21.595 (Ley de Delitos Económicos), vigente desde el 1 de septiembre de 2024, es la única vía para eximirse.",
  },
  {
    question:
      "¿Qué empresas están obligadas a tener un Modelo de Prevención de Delitos?",
    answer:
      "No es una obligación legal previa como un permiso, pero es la única forma de eximirse de responsabilidad penal si la empresa es investigada. Aplica a cualquier persona jurídica, sin importar el rubro, a diferencia de normativas sectoriales como RESSO o SST.",
  },
  {
    question: "¿Es obligatorio certificar el modelo?",
    answer:
      "No. La certificación por una entidad registrada ante la Comisión para el Mercado Financiero (CMF) no es obligatoria, pero, según la Ley 21.595 debe ser evaluada por un tercero independiente.",
  },
  {
    question: "¿Qué pasó con el plazo para adecuar el modelo a la nueva ley?",
    answer:
      "Venció el 1 de septiembre de 2025. Las empresas que no actualizaron su modelo desde entonces están expuestas al catálogo de delitos ampliado por la Ley 21.595.",
  },
  {
    question:
      "¿En qué se diferencia el MPD de otras normativas que gestiona Isolegal, como SST o RESSO?",
    answer:
      "El MPD es una defensa penal transversal a cualquier empresa; RECSS de Antofagasta Minerals y RESSO son obligaciones normativas de un sector o mandante específico. Isolegal administra ambos frentes con el mismo estándar de evidencia auditable.",
  },
];

export const MPD_RISK_CTA_ITEMS: RiskCalculatorInformationItem[] = [
  {
    title: "Diagnóstico de tu modelo actual",
    description: "Revisión contra el catálogo de delitos vigente.",
  },
  {
    title: "Plan de actualización",
    description: "Qué elementos del artículo 4° te faltan por documentar.",
  },
  {
    title: "Agenda una reunión",
    description: "Conversa con un especialista sobre tu caso específico.",
  },
];
