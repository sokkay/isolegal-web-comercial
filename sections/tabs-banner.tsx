"use client";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useState } from "react";

export default function TabsBanner() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: "Conocimiento",
      description:
        "Isolegal incorpora una asistente de inteligencia artificial llamada Norma, impulsada por Google Gemini, diseñada para apoyar la gestión del cumplimiento normativo en Chile. Norma interpreta requisitos legales, explica su aplicación práctica y orienta la carga y revisión de evidencias, trabajando directamente sobre la matriz legal y el contexto operativo de cada organización. La IA de Isolegal no reemplaza el criterio experto, sino que lo complementa, ayudando a estandarizar la gestión del cumplimiento y a reducir errores en auditorías y fiscalizaciones.",
      button: "Inicia hoy",
      video: "/videos/conocimiento.mp4",
    },
    {
      title: "Cercania",
      description:
        "Creemos que el cumplimiento normativo no se gestiona desde la distancia ni solo con software. Se gestiona en la operación diaria, con personas que toman decisiones bajo presión y necesitan apoyo real. Por eso, nuestra visión es acompañar a organizaciones que operan bajo alta exigencia normativa en Chile y Latinoamérica, integrando tecnología, conocimiento especializado y apoyo continuo. Nos involucramos como socios estratégicos, trabajando codo a codo con quienes tienen la responsabilidad de cumplir. Cuando existe cercanía, el cumplimiento deja de ser una carga impuesta y se transforma en un activo estratégico, capaz de generar confianza, continuidad operativa y decisiones más seguras.",
      button: "Conversemos",
      video: "/videos/cercania.mp4",
    },
    {
      title: "Simplicidad",
      description:
        "Nuestra misión es ayudar a las organizaciones a cumplir y demostrar el cumplimiento normativo de forma simple, trazable y confiable. Creemos que la complejidad no agrega valor: lo que agrega valor es entender qué aplica, qué hacer y cómo demostrarlo. Por eso, traducimos requisitos legales y ESG en acciones operativas claras, apoyadas por tecnología y acompañamiento experto. Así, el cumplimiento deja de ser un proceso confuso y reactivo, y se convierte en una práctica ordenada que genera confianza, sostenibilidad y mejores decisiones. Porque cuando el cumplimiento es simple, se puede sostener en el tiempo.",
      button: "¡Empecemos!",
      video: "/videos/simplicidad.mp4",
    },
  ];

  return (
    <div className="py-16 container mx-auto">
      <div className="flex flex-col items-center justify-center bg-darkBlue rounded-2xl py-10 px-6 md:px-20 gap-7 text-white">
        <Logo />
        <div className="bg-[#1E293B] flex flex-col md:flex-row items-center justify-center w-full md:w-4/5 xl:w-2/3 rounded-lg md:h-12 p-1">
          {tabs.map((tab, index) => (
            <button
              key={`tab-${index}`}
              onClick={() => setActiveTab(index)}
              className={cn(
                activeTab === index && "bg-white text-text",
                "font-bold flex-1 w-full md:w-auto flex items-center justify-center rounded-lg transition-colors cursor-pointer py-3 md:py-0 md:h-full"
              )}
            >
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-1 order-1">
              <h2 className="text-lg font-bold mb-2">
                {tabs[activeTab].title}
              </h2>
              <p className="text-sm opacity-80 mb-4">
                {tabs[activeTab].description}
              </p>
              <Button
                text={tabs[activeTab].button}
                color="secondary"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
            <div className="w-full md:w-1/3 order-2 md:order-2 flex items-start justify-center">
              <video
                key={tabs[activeTab].video}
                autoPlay
                loop
                muted
                playsInline
                className="rounded-2xl w-full h-auto"
              >
                <source src={tabs[activeTab].video} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
