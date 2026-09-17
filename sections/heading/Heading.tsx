"use client";

import type { ContactFormData } from "@/lib/schemas/contactForm";
import ContactForm from "./ContactForm";

type HeadingProps = {
  onContactSuccess?: (data: ContactFormData) => void;
};

export default function Heading({ onContactSuccess }: HeadingProps = {}) {
  return (
    <div className="bg-darkBlue text-white">
      <div className="container mx-auto flex flex-col items-center gap-8 py-16 lg:flex-row xl:gap-12">
        <div className="flex-1 space-y-6">
          <p className="text-lg font-bold tracking-wide opacity-90">
            Si te fiscalizan, necesitas evidencia, no explicaciones.
          </p>
          <h1 className="text-4xl leading-[1.06] font-extrabold tracking-[-1.5px] sm:text-5xl xl:text-6xl">
            Software de Compliance <br />
            y Cumplimiento Normativo <br />
            para Empresas en Chile
          </h1>
          <p className="text-lg opacity-90">
            Isolegal resuelve tu cumplimiento normativo con un ecosistema de
            tecnologías propias: administra y actualiza continuamente tu
            <span className="font-bold"> Matriz Legal en Chile</span> con
            respaldo de abogados expertos, y opera con{" "}
            <span className="font-bold">PULSO </span>
            para asignar tareas a tus equipos y contratistas, capturando
            evidencia verificable directamente en terreno. De la obligación
            legal a la prueba auditable, todo en una sola plataforma.
          </p>
          <ul className="space-y-3 opacity-80">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              Matriz legal actualizada
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              PULSO Legal
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              Evidencia auditable
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              Alertas en tiempo real
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              RESSO, SIGO y RECSS
            </li>
          </ul>
        </div>
        <div className="w-full flex-1">
          <ContactForm onSuccess={onContactSuccess} />
        </div>
      </div>
    </div>
  );
}
