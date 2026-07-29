"use client";

import IconButton from "@/components/ui/IconButton";
import CheckListIcon from "@/public/icons/checklist.svg";
import DatabaseIcon from "@/public/icons/database.svg";
import HandshakeIcon from "@/public/icons/handshake.svg";
import SupportIcon from "@/public/icons/support.svg";
import TableEditIcon from "@/public/icons/table-edit.svg";
import { ReactNode, useState } from "react";

const caracteristics = [
  {
    icon: <DatabaseIcon className="fill-primary" />,
    title: "Base de datos normativa gestionada por abogados",
    descripcion:
      "Nos encargamos de la gestión completa de tu matriz legal: incorporamos, actualizamos o eliminamos normas según cambios legales y su aplicabilidad real a tu operación.",
  },
  {
    icon: <TableEditIcon className="fill-primary" />,
    title: "Matriz legal personalizada y accionable",
    descripcion:
      "Visualiza solo lo que te aplica según tu rubro y actividad. Sin ruido ni duplicidades.",
  },
  {
    icon: <CheckListIcon className="fill-primary" />,
    title: "Preguntas guía con interpretación normativa clara",
    descripcion:
      "Nos encargamos de la gestión completa de tu matriz legal: incorporamos, actualizamos o eliminamos normas según cambios legales y su aplicabilidad real a tu operación.",
  },
  {
    icon: <SupportIcon className="fill-primary" />,
    title: "Revisión inteligente de evidencia con apoyo de IA",
    descripcion:
      "Nuestra IA valida que la evidencia sea pertinente y suficiente, reduciendo reprocesos permitiendo ahorrar auditorias internas de cumplimiento legal.",
  },
  {
    icon: <HandshakeIcon className="fill-primary" />,
    title: "Gestión de cumplimiento y acompañamiento en auditorías",
    descripcion:
      "Alertas automáticas de cambios normativos, planes de acción trazables y apoyo experto durante auditorías internas, externas o de certificación.",
  },
];

export default function WhyIsolegal() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="soluciones" className="container mx-auto py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <div className="flex-6">
          <h1 className="text-text text-center text-3xl font-bold md:text-left dark:text-white">
            ¿Por qué Isolegal?
          </h1>
        </div>
        {/* Botón solo visible en tablets y desktop */}
        <div
          className="text-primary hidden flex-6 cursor-pointer items-center justify-end font-bold md:flex dark:text-white"
          onClick={() => setShowAll(!showAll)}
        >
          <span className="text-sm">
            {showAll
              ? "Ver menos características"
              : "Ver todas las características"}
          </span>
          <IconButton
            icon="arrow-right"
            iconClassName={`fill-primary dark:fill-white w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-90" : ""}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 pt-16 lg:grid-cols-3">
        {caracteristics.slice(0, 3).map((characteristic) => (
          <Card
            key={characteristic.title}
            title={characteristic.title}
            description={characteristic.descripcion}
            icon={characteristic.icon}
          />
        ))}
      </div>

      {/* Características adicionales: siempre visibles en móvil, con animación en desktop */}
      <div
        className={`mt-4 grid grid-cols-1 gap-4 md:overflow-hidden md:transition-all md:duration-500 md:ease-in-out lg:grid-cols-3 ${
          showAll
            ? "md:mt-4 md:max-h-[1000px] md:opacity-100"
            : "md:mt-0 md:max-h-0 md:opacity-0"
        }`}
      >
        {caracteristics.slice(3).map((characteristic) => (
          <Card
            key={characteristic.title}
            title={characteristic.title}
            description={characteristic.descripcion}
            icon={characteristic.icon}
          />
        ))}
      </div>
    </section>
  );
}

type CardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

const Card = ({ title, description, icon }: CardProps) => {
  return (
    <div className="bg-card-background dark:bg-surface-tonal-a10 flex flex-col gap-4 rounded-2xl p-8 md:flex-row lg:flex-col">
      <div className="bg-green-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-sm">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-text pb-3 text-lg font-bold dark:text-white">
          {title}
        </h3>
        <p className="text-text text-sm leading-5 opacity-80 dark:text-white">
          {description}
        </p>
      </div>
    </div>
  );
};
