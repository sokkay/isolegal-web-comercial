"use client";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import Image from "next/image";

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

export default function WhatDoesIsolegalDo() {
  return (
    <div id="soluciones" className="bg-white py-16">
      <div className="container mx-auto">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={cn(
              "flex items-center gap-9",
              index % 2 === 0 ? "flex-row" : "flex-row-reverse",
              index % 2 === 0 ? "mb-24" : ""
            )}
          >
            {step.isVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-2xl hidden md:block max-w-80 xl:max-w-xl w-full h-auto"
              >
                <source src={step.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={step.image}
                alt={step.title}
                width={800}
                height={800}
                className="rounded-2xl hidden md:block max-w-80 xl:max-w-xl"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-5">{step.title}</h2>
              {step.description.map((description, y) => (
                <p key={step.title + y} className="mb-5 font-normal">
                  {description}
                </p>
              ))}
              <Button
                text={step.button}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
