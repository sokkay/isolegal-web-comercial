"use client";

import type { ContactFormData } from "@/lib/schemas/contactForm";
import ContactForm from "./ContactForm";

type HeadingProps = {
  onContactSuccess?: (data: ContactFormData) => void;
};

export default function Heading({ onContactSuccess }: HeadingProps = {}) {
  return (
    <div className="bg-darkBlue text-white ">
      <div className="container mx-auto py-16 flex items-center flex-col lg:flex-row gap-8 xl:gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="font-extrabold text-5xl md:text-6xl leading-[1.06] tracking-[-1.5px]">
            Si te auditan, <br />
            necesitas evidencia. <br />
            No Explicaciones
          </h1>
          <p className="text-lg opacity-90">
            Centraliza tu matriz legal, evidencias y alertas en un solo lugar.
            Isolegal traduce obligaciones en acciones simples y demostrables en
            terreno, para eliminar el riesgo de incumplimiento
          </p>
          <ul className="space-y-3 opacity-80">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              Evidencia ordenada y auditable.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              Alertas y vencimientos en tiempo real.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" />
              Incorporamos normativa, RCA y exigencias de mandantes (RESSO,
              SIGO, RECSS, etc.) en un solo sistema.
            </li>
          </ul>
        </div>
        <div className="flex-1 w-full">
          <ContactForm onSuccess={onContactSuccess} />
        </div>
      </div>
    </div>
  );
}
