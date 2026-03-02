"use client";

import AutoRotatingAccordion from "@/components/AutoRotatingAccordion";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    title: "Dashboard interactivo",
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

export default function HowIsolegalWorks() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="bg-white dark:bg-darkBlue py-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-center ">
        <h2 className="text-text text-center text-3xl font-bold mb-10 block md:hidden">
          Cómo Funciona Isolegal
        </h2>
        <div className="flex-5 flex flex-col order-2 md:order-1">
          <h2 className="text-text text-3xl font-bold tracking-[0.01em] mb-10 hidden md:block">
            Cómo Funciona Isolegal
          </h2>
          <AutoRotatingAccordion
            items={features}
            autoPlayIntervalMs={4500}
            onActiveChange={setActiveFeature}
            className="w-full"
          />
        </div>
        <div className="flex-7 order-1 md:order-2">
          <div className="relative md:ml-auto w-full max-w-[600px] aspect-square rounded-2xl bg-checkbox-bg overflow-hidden">
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
