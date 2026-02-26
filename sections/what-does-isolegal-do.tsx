"use client";
import AnimatedCounter from "@/components/AnimatedCounter";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useRef } from "react";

const steps = [
  {
    title: "¿Qué hace Isolegal?",
    description: [
      "Isolegal es un software de gestión de cumplimiento normativo que permite a las organizaciones identificar, gestionar y demostrar el cumplimiento de la normativa chilena, las RCA y las exigencias de empresas mandantes en un solo sistema. Convierte requisitos legales complejos en acciones operativas claras, con responsables, plazos, evidencias trazables y alertas automáticas, eliminando la dependencia de planillas y criterios individuales.",
      "El sistema integra normativa pública y privada, muestra solo lo que realmente aplica a cada operación y mantiene la información actualizada frente a cambios regulatorios. Así, Isolegal permite pasar del cumplimiento en papel al control normativo real, auditable y sostenible en el tiempo.",
    ],
    href: "/#",
    button: "Conversemos",
    image: "",
    video: "/videos/que-hace-isolegal.mp4",
    isVideo: true,
  },
  {
    title: "Inteligencia Artificial aplicada al cumplimiento normativo",
    description: [
      "Isolegal incorpora una asistente de inteligencia artificial llamada Norma, impulsada por Google Gemini, diseñada para apoyar la gestión del cumplimiento normativo en Chile. Norma interpreta requisitos legales, explica su aplicación práctica y orienta la carga y revisión de evidencias, trabajando directamente sobre la matriz legal y el contexto operativo de cada organización. La IA de Isolegal no reemplaza el criterio experto, sino que lo complementa, ayudando a estandarizar la gestión del cumplimiento y a reducir errores en auditorías y fiscalizaciones.",
    ],
    href: "/#",
    button: "¡Ponla a prueba!",
    image: "/images/ai-web.png",
    video: "",
    isVideo: false,
  },
];

const roi = [
  {
    number: 30,
    type: "number",
    title: "Faenas mineras en Chile",
    description:
      "Isolegal ya opera donde el cumplimiento no es teórico, sino parte de la operación diaria y la exigencia regulatoria es permanente.",
  },
  {
    number: 100,
    type: "number",
    title: "Usuarios Activos",
    description:
      "Equipos legales, prevencionistas y áreas de gestión utilizan Isolegal para centralizar obligaciones, evidencias y reportes en un solo lugar.",
  },
  {
    number: 100,
    type: "porcentaje",
    title: "Clientes reducen o eliminan no conformidades",
    description:
      "Con Isolegal, cada requisito se gestiona con evidencia trazable, disminuyendo el riesgo de incumplimiento y fortaleciendo los resultados en auditorías.",
  },
];

export default function WhatDoesIsolegalDo() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.playbackRate = 0.5;
      }
    });
  }, [videoRefs]);

  return (
    <section className="bg-white dark:bg-darkBlue py-16">
      <div className="container mx-auto">
        {/* Nuevo ROI */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-text text-3xl font-bold mb-10 text-center">
            Los números nos avalan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {roi.map((item) => (
              <div
                key={item.title}
                className="p-5.5 bg-green-bg dark:bg-card-background rounded-2xl flex flex-col items-center gap-4 text-text"
              >
                <AnimatedCounter value={item.number} type={item.type} />
                <h3 className="text-lg font-bold text-center">{item.title}</h3>
                <p className="text-base text-center font-norma">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {steps.map((step, index) => (
          <div
            key={step.title}
            className={cn(
              "flex flex-col items-center gap-9",
              "md:flex-row",
              index % 2 === 0 ? "" : "md:flex-row-reverse",
              index % 2 === 0 ? "mb-24" : ""
            )}
          >
            {step.isVideo ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                autoPlay
                loop
                muted
                playsInline
                className="rounded-2xl max-w-80 xl:max-w-xl w-full h-auto order-2 md:order-0"
              >
                <source src={step.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={step.image}
                alt={step.title}
                width={800}
                height={800}
                className="rounded-2xl max-w-80 xl:max-w-xl order-2 md:order-0"
              />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-5 text-text dark:text-white">
                {step.title}
              </h2>
              {step.description.map((description, y) => (
                <p
                  key={step.title + y}
                  className="mb-5 font-normal text-text dark:text-white/80"
                >
                  {description}
                </p>
              ))}
              <Button
                text={step.button}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hidden md:block"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
