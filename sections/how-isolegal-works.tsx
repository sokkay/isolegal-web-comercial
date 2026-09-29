"use client";

import AutoRotatingAccordion from "@/components/AutoRotatingAccordion";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    title: "Dashboard de cumplimiento legal en tiempo real",
    description:
      "Visualiza el nivel de cumplimiento de tus matrices con indicadores claros y actualizados en tiempo real.",
    image: "/images/features/dashboard-interactivo.png",
  },
  {
    title: "Notificaciones normativas",
    description:
      "Recibe la información de las actualizaciones legales integradas a tu matriz, con la interpretación de nuestro equipo de abogados.",
    image: "/images/features/notificaciones-normativas.png",
  },
  {
    title: "Informes personalizados",
    description:
      "Descarga en un clic un informe con el estado de cumplimiento de cada una de tus matrices, las veces que quieras.",
    image: "/images/features/informes-personalizados.png",
  },
  {
    title: "Gestión de riesgos normativos",
    description:
      "Visualiza un mapa de calor con los riesgos asociados a los requisitos normativos de tu matriz para una gestión más eficiente.",
    image: "/images/features/gestion-de-riesgos.png",
  },
  {
    title: "Gestión de normas",
    description:
      "Olvídate de interpretar, accede a las normas aplicables a tu matriz con el detalle de cada artículo, preguntas guía y referencias de cumplimiento.",
    image: "/images/features/gestion-de-normas.png",
  },
  {
    title: "Evidencia y cumplimiento",
    description:
      "Asocia evidencia y gestiona el cumplimiento en cada requisito, trabajando en equipo con todos los usuarios que tu empresa requiera.",
    image: "/images/features/evidencia-y-cumplimiento.png",
  },
  {
    title: "Planes de acción",
    description:
      "Crea y gestiona acciones correctivas directamente desde los incumplimientos detectados.",
    image: "/images/features/planes-de-accion.png",
  },
  {
    title: "Asistente normativo con IA",
    description:
      "Interpreta requisitos legales y valida si la evidencia que cargas cumple antes de una auditoría.",
    image: "/images/features/asistente-normativo-con-ia.png",
  },
];

export default function HowIsolegalWorks({
  className,
}: {
  className?: string;
} = {}) {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className={cn("dark:bg-darkBlue bg-white py-16", className)}>
      <div className="container mx-auto flex flex-col justify-center md:flex-row">
        <h2 className="text-text mb-10 block text-center text-3xl font-bold md:hidden">
          Cómo Funciona Isolegal
        </h2>
        <div className="order-2 flex flex-5 flex-col md:order-1">
          <h2 className="text-text mb-10 hidden text-3xl font-bold tracking-[0.01em] md:block">
            Cómo Funciona Isolegal
          </h2>
          <AutoRotatingAccordion
            items={features}
            autoPlayIntervalMs={4500}
            onActiveChange={setActiveFeature}
            className="w-full"
          />
        </div>
        <div className="order-1 flex-7 md:order-2">
          <div className="bg-checkbox-bg relative aspect-square w-full max-w-[600px] overflow-hidden rounded-2xl md:ml-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={features[activeFeature].image}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-6"
              >
                <Image
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  fill
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="object-contain p-6"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
