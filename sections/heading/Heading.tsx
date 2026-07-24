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
          <h1 className="text-5xl leading-[1.06] font-extrabold tracking-[-1.5px] md:text-6xl">
            Software de Compliance <br />
            y Cumplimiento Normativo <br />
            para Empresas en Chile
          </h1>
          <p className="text-lg opacity-90">
            Si te fiscalizan, necesitas evidencia, no explicaciones.
          </p>
          <p className="text-lg opacity-90">
            Isolegal centraliza tu matriz legal, evidencias y alertas en una
            sola plataforma de compliance. Traducimos obligaciones normativas en
            acciones simples y demostrables en terreno, para eliminar el riesgo
            de incumplimiento.
          </p>
          <ul className="space-y-3 opacity-80">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              Plataforma de compliance con matriz legal actualizada y
              personalizada.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              Evidencia ordenada y auditable, lista para fiscalizaciones.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              Alertas y vencimientos en tiempo real.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
              Incorporamos normativa, RCA y exigencias de mandantes (RESSO,
              SIGO, RECSS, etc.) en un solo sistema.
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
