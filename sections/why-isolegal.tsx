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
    icon: <DatabaseIcon className="fill-primary"/>,
    title: "Base de datos normativa gestionada por abogados",
    descripcion:
      "Nos encargamos de la gestión completa de tu matriz legal: incorporamos, actualizamos o eliminamos normas según cambios legales y su aplicabilidad real a tu operación.",
  },
  {
    icon: <TableEditIcon className="fill-primary"/>,
    title: "Matriz legal personalizada y accionable",
    descripcion:
      "Visualiza solo lo que te aplica según tu rubro y actividad. Sin ruido ni duplicidades.",
  },
  {
    icon: <CheckListIcon className="fill-primary"/>,
    title: "Preguntas guía con interpretación normativa clara",
    descripcion:
      "Nos encargamos de la gestión completa de tu matriz legal: incorporamos, actualizamos o eliminamos normas según cambios legales y su aplicabilidad real a tu operación.",
  },
  {
    icon: <SupportIcon className="fill-primary"/>,
    title: "Revisión inteligente de evidencia con apoyo de IA",
    descripcion:
      "Nuestra IA valida que la evidencia sea pertinente y suficiente, reduciendo reprocesos permitiendo ahorrar auditorias internas de cumplimiento legal.",
  },
  {
    icon: <HandshakeIcon className="fill-primary"/>,
    title: "Gestión de cumplimiento y acompañamiento en auditorías",
    descripcion:
      "Alertas automáticas de cambios normativos, planes de acción trazables y apoyo experto durante auditorías internas, externas o de certificación.",
  },
];

export default function WhyIsolegal() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div id="nosotros" className="container mx-auto py-16">
      <div className="flex items-end justify-between">
        <div className="flex-6">
          <h1 className="text-3xl font-bold">¿Por qué Isolegal?</h1>
          <p className="text-md opacity-80 pt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
            magna eget tellus venenatis vestibulum.
          </p>
        </div>
        <div 
          className="flex-6 text-primary font-bold flex items-center justify-end cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          <span className="text-sm">
            {showAll ? "Ver menos características" : "Ver todas las características"}
          </span>
          <IconButton 
            icon="arrow-right" 
            iconClassName={`fill-primary w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-90" : ""}`} 
          />
        </div>
      </div>
      <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {caracteristics.slice(0, 3).map((characteristic) => (
          <Card
            key={characteristic.title}
            title={characteristic.title}
            description={characteristic.descripcion}
            icon={characteristic.icon}
          />
        ))}
      </div>
      
      {/* Características adicionales con animación */}
      <div 
        className={`grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden transition-all duration-500 ease-in-out ${
          showAll ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
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
    </div>
  );
}

type CardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

const Card = ({ title, description, icon }: CardProps) => {
  return (
    <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row lg:flex-col gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-green-bg shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold pb-3">{title}</h3>
        <p className="text-sm opacity-80 leading-5">{description}</p>
      </div>
    </div>
  );
};
