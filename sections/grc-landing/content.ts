import type { FaqItem } from "@/components/FaqAccordion";
import type { IsolegalRoiItem } from "@/sections/isolegal-roi";
import type {
  SoftwareFeatureItem,
  SoftwareRequirementItem,
  SoftwareStep,
} from "@/sections/software-landing";

export const GRC_FEATURES: SoftwareFeatureItem[] = [
  {
    badge: "G",
    title: "Governance",
    description:
      "Gobierno corporativo: políticas, roles y responsabilidades a nivel de directorio y alta administración.",
  },
  {
    badge: "R",
    title: "Risk",
    description:
      "Gestión de riesgos: identificación, evaluación y control de riesgos operacionales, legales y regulatorios.",
  },
  {
    badge: "C",
    title: "Compliance",
    description:
      "Cumplimiento normativo: obligaciones, auditorías y evidencia trazable frente a reguladores.",
  },
];

export const GRC_COMPARISON = {
  withoutItems: [
    "Matrices de riesgo y cumplimiento en Excel, desconectadas entre áreas.",
    "Modelo de prevención de delitos desactualizado frente a cambios como la Ley 21.595.",
    "Evidencia dispersa entre correos, carpetas y responsables distintos.",
    "Preparación reactiva antes de cada auditoría o fiscalización.",
  ],
  withItems: [
    "Matriz de riesgo y cumplimiento administrada de forma integral y permanente por nuestro equipo legal.",
    "Alertas automáticas ante cada cambio normativo relevante.",
    "Evidencia centralizada y trazable, lista para cualquier auditoría.",
    "Reportes de cumplimiento generados al instante, no en semanas.",
  ],
};

export const GRC_FRAMEWORKS: SoftwareRequirementItem[] = [
  {
    title: "Ley 20.393",
    description:
      "Responsabilidad penal de las personas jurídicas: exige implementar efectivamente un modelo adecuado de prevención de delitos.",
  },
  {
    title: "Ley 21.595",
    description:
      "Sistematiza los delitos económicos y amplía el alcance de la Ley 20.393, reforzando la exigencia de un modelo de prevención efectivamente implementado.",
  },
  {
    title: "ISO 31000",
    description:
      "Estándar internacional voluntario para la gestión de riesgos y marco de referencia para la dimensión Risk de GRC.",
  },
];

export const GRC_STEPS: SoftwareStep[] = [
  {
    title: "Definimos tu matriz",
    description:
      "Identificamos los riesgos y obligaciones aplicables a tu empresa.",
  },
  {
    title: "Centralizas evidencia",
    description:
      "Protocolos, controles e indicadores quedan asociados a cada requisito.",
  },
  {
    title: "Recibes alertas",
    description:
      "Te avisamos de manera automática sobre los cambios normativos relevantes.",
  },
  {
    title: "Demuestras cumplimiento",
    description:
      "Genera reportes listos para directorio, auditoría o fiscalización.",
  },
];

export const GRC_CONSEQUENCES = [
  "Multas a beneficio fiscal.",
  "Inhabilitación para contratar con el Estado.",
  "Pérdida de beneficios fiscales.",
  "Supervisión de la persona jurídica y publicación de un extracto de la sentencia.",
  "En los casos previstos por la ley, extinción de la persona jurídica.",
];

export const GRC_METRICS: IsolegalRoiItem[] = [
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
      "Equipos legales y de riesgo centralizan obligaciones y evidencias en un solo lugar.",
  },
  {
    number: 100,
    type: "porcentaje",
    title: "Reducen no conformidades",
    description:
      "Cada requisito se gestiona con evidencia trazable, lista para auditoría.",
  },
];

export const GRC_FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es un software GRC?",
    answer:
      "Es una plataforma que centraliza gobierno corporativo, gestión de riesgos y cumplimiento normativo en un solo lugar.",
  },
  {
    question: "¿Qué es el modelo de prevención de delitos de la Ley 20.393?",
    answer:
      "Es el conjunto de protocolos, controles y canales de denuncia que una empresa implementa efectivamente para prevenir delitos y reducir su exposición a responsabilidad penal.",
  },
  {
    question: "¿Qué cambia la Ley 21.595 respecto de la Ley 20.393?",
    answer:
      "Amplía el catálogo de delitos económicos que pueden generar responsabilidad penal para las personas jurídicas y exige que el modelo de prevención se encuentre efectivamente implementado.",
  },
  {
    question: "¿Isolegal es compatible con ISO 31000?",
    answer:
      "Sí, en el ámbito legal: la plataforma organiza la gestión del riesgo legal y del cumplimiento normativo de manera alineada con los principios de ISO 31000.",
  },
  {
    question: "¿Qué empresas necesitan un software GRC?",
    answer:
      "Cualquier empresa con personalidad jurídica expuesta a riesgos legales y regulatorios, no solo organizaciones grandes o pertenecientes a sectores especialmente regulados.",
  },
  {
    question:
      "¿Isolegal reemplaza las matrices de riesgo legal y cumplimiento en Excel?",
    answer:
      "Sí. Centraliza matrices, evidencia y planes de acción en una plataforma colaborativa y auditable.",
  },
];

export const GRC_TESTIMONIAL = {
  quote:
    "En AVUS, tanto la plataforma como el acompañamiento del equipo de ISOLEGAL han aportado un valor tangible a nuestra gestión de cumplimiento, permitiéndonos abordar los requerimientos normativos con mayor claridad, orden y consistencia, y consolidar un enfoque más sólido en el control de nuestras obligaciones legales.",
  name: "Rodrigo Bravo C.",
  role: "Socio Fundador & Risk Architect Lead, AVUS",
};
