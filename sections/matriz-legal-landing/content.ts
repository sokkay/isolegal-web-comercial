import type { FaqItem } from "@/components/FaqAccordion";
import type { RiskCalculatorInformationItem } from "@/sections/risk-calculator/risk-calculator-banner";
import type {
  SoftwareComparisonTableRow,
  SoftwarePlainColumnItem,
  SoftwareSanctionItem,
  SoftwareStep,
} from "@/sections/software-landing";

export const MATRIZ_LEGAL_COMPARISON_ROWS: SoftwareComparisonTableRow[] = [
  {
    criterion: "Actualización normativa",
    without:
      "Listado estático de normas, sin alertas automáticas ni responsables asignados.",
    with: "Matriz legal digital administrada permanentemente por Isolegal, con actualización continua frente a modificaciones y derogaciones.",
  },
  {
    criterion: "Aplicabilidad e interpretación",
    without:
      "Incertidumbre sobre qué leyes, decretos o resoluciones aplican efectivamente a cada faena o planta.",
    with: "Interpretación jurídica rigurosa de qué requisitos aplican a tu actividad específica, convertidos en tareas trazables.",
  },
  {
    criterion: "Evidencia y respaldo",
    without:
      "Evidencias dispersas en correos, discos compartidos o carpetas personales sin control.",
    with: "Evidencia centralizada y vinculada a cada requisito, lista para fiscalizaciones y auditorías de certificación.",
  },
  {
    criterion: "Integración de mandantes",
    without:
      "Exigencias de mandantes (RESSO, SIGO, RECSS) gestionadas por separado de la normativa legal nacional.",
    with: "Normativa chilena y requisitos contractuales de tus mandantes integrados en una misma matriz de aspectos legales.",
  },
];

export const MATRIZ_LEGAL_COLUMNS: SoftwarePlainColumnItem[] = [
  {
    title: "Seguridad y Salud Laboral",
    description:
      "Control riguroso de obligaciones de prevención de riesgos, estándares de mutualidades y comités paritarios.",
    href: "/blog/sst/matriz-legal-sst/",
    linkLabel: "Guía especializada de matriz legal SST",
  },
  {
    title: "Medio Ambiente y RCA (ISO 14001)",
    description:
      "Seguimiento de compromisos ambientales, resoluciones de calificación ambiental (RCA), manejo de residuos, emisiones y normativas de la SMA.",
  },
  {
    title: "Exigencias de Mandantes",
    description:
      "Incorporación y gestión de requisitos contractuales y sistemas de gestión de contratistas como RESSO (Codelco), SIGO y RECSS dentro de la misma matriz legal.",
  },
];

export const MATRIZ_LEGAL_STEPS: SoftwareStep[] = [
  {
    title: "Levantamiento del universo normativo",
    description:
      "Identificamos todas las leyes, decretos, resoluciones y exigencias de mandantes que aplican a tus actividades e instalaciones en Chile.",
  },
  {
    title: "Parametrización de requisitos",
    description:
      "Configuramos tu matriz legal estructurando cada obligación por área, faena o centro de trabajo, asignando responsables internos.",
  },
  {
    title: "Gestión de evidencia y alertas",
    description:
      "Tu equipo vincula evidencias documentales directamente en la plataforma y recibe alertas preventivas antes de cada vencimiento.",
  },
  {
    title: "Vigilancia y actualización permanente",
    description:
      "Ante cada cambio legislativo o nueva resolución, nuestro equipo legal actualiza primero tu matriz y te notifica las adecuaciones requeridas.",
  },
];

export const MATRIZ_LEGAL_SANCTIONS: SoftwareSanctionItem[] = [
  {
    title: "Multas y paralizaciones",
    description:
      "Sanciones económicas y suspensiones de obras o procesos por incumplimiento normativo vigente.",
  },
  {
    title: "Pérdida de contratos con mandantes",
    description:
      "Rechazo en auditorías de contratistas, bajas calificaciones de desempeño o pérdida de habilitación en faena.",
  },
  {
    title: "No conformidades en normas ISO",
    description:
      "Observaciones críticas o suspensión de certificaciones ISO 45001 e ISO 14001 por fallas en la cláusula 6.1.3.",
  },
];

export const MATRIZ_LEGAL_FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Para qué sirve una matriz legal?",
    answer:
      "Identifica todas las normas y requisitos aplicables a una organización según su actividad, permitiendo controlar y demostrar cumplimiento. En Chile, compila leyes, decretos, resoluciones y normas técnicas aplicables a cada área operativa de la empresa.",
  },
  {
    question:
      "¿Isolegal administra y mantiene actualizada la matriz legal de sus clientes?",
    answer:
      "Sí. En Isolegal administramos permanentemente la matriz legal de nuestros clientes, manteniéndola actualizada frente a cambios normativos, modificaciones de requisitos o derogaciones aplicables. Cuando identificamos un cambio en algún requisito normativo, primero actualizamos la matriz legal del cliente y luego informamos internamente las modificaciones realizadas a través de la plataforma.",
  },
  {
    question: "¿Puedo gestionar los requisitos de mis mandantes en Isolegal?",
    answer:
      "Sí. Isolegal permite incorporar y gestionar los requisitos específicos que exigen tus mandantes —como sistemas de gestión de contratistas u otras exigencias contractuales (por ejemplo, RESSO de Codelco, SIGO o RECSS)— dentro de la misma matriz legal, junto con la normativa nacional aplicable.",
  },
  {
    question: "¿Isolegal reemplaza las matrices legales en Excel?",
    answer:
      "Sí. Centraliza toda la gestión de cumplimiento en una plataforma más eficiente, colaborativa y auditable, eliminando el riesgo de planillas estáticas desfasadas frente a modificaciones normativas.",
  },
  {
    question: "¿La matriz legal de Isolegal cubre solo SST o es transversal?",
    answer:
      "Es transversal. Aunque la gestión de seguridad y salud en el trabajo (SST) es uno de los casos de uso más frecuentes en Chile, la plataforma cubre de forma integral requisitos ambientales (ISO 14001), laborales y de seguridad (ISO 45001), calidad, transporte, minería y exigencias corporativas.",
  },
];

export const MATRIZ_LEGAL_RISK_CTA_ITEMS: RiskCalculatorInformationItem[] = [
  {
    title: "Diagnóstico de requisitos aplicables",
    description:
      "Identificamos las normas, decretos y resoluciones vigentes que rigen tu operación.",
  },
  {
    title: "Migración desde planillas Excel",
    description:
      "Traspasamos tu información a una plataforma digital estructurada por áreas y responsables.",
  },
  {
    title: "Demostración con un especialista",
    description:
      "Conoce en vivo cómo gestionar evidencias y alertas preventivas antes de cada auditoría.",
  },
];
