"use client";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface TabContentProps {
  title: string;
  description: string;
  button: string;
  video: string;
  tabKey: number;
}

function TabContent({
  title,
  description,
  button,
  video,
  tabKey,
}: TabContentProps) {
  return (
    <motion.div
      key={tabKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-6 md:flex-row md:gap-10"
    >
      <div className="order-1 flex-1">
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-4 text-sm"
        >
          {description}
        </motion.p>

        <Button
          text={button}
          color="secondary"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-darkBlue hidden md:block"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="order-2 flex w-full items-start justify-center md:order-2 md:w-1/3"
      >
        <video
          key={video}
          autoPlay
          muted
          playsInline
          className="h-auto w-full rounded-2xl"
        >
          <source src={video} type="video/mp4" />
        </video>
      </motion.div>
    </motion.div>
  );
}

export default function TabsBanner() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: "Conocimiento",
      description:
        "Isolegal se construye sobre una base normativa creada y mantenida por abogados durante más de 10 años. No partimos desde interpretaciones genéricas: trabajamos con una biblioteca legal robusta —más de 1.300 normas y más de 4.500 artículos— estructurada para reflejar aplicabilidad real en operación. Ese conocimiento se traduce en matrices claras, preguntas guía y criterios consistentes, para que el cumplimiento se gestione con evidencia y no con supuestos. Sobre esta base, nuestro asistente de inteligencia artificial, impulsado por Google Gemini, permite interpretar requisitos, orientar la carga de evidencia y resolver dudas en tiempo real, aplicando el mismo criterio experto de la plataforma en el contexto operativo de cada organización.",
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
    <section id="nosotros" className="container mx-auto py-16">
      <div className="bg-darkBlue flex min-h-[950px] flex-col items-center gap-7 rounded-2xl px-6 py-10 text-white md:min-h-[510px] md:px-20">
        <Logo />
        <div className="relative flex w-full flex-col items-center justify-center rounded-lg bg-[#1E293B] p-1 md:h-12 md:w-4/5 md:flex-row xl:w-2/3">
          {tabs.map((tab, index) => (
            <button
              key={`tab-${index}`}
              onClick={() => setActiveTab(index)}
              className={cn(
                "relative z-10 flex w-full flex-1 cursor-pointer items-center justify-center rounded-lg py-3 font-bold transition-colors md:h-full md:w-auto md:py-0",
                activeTab === index ? "text-darkBlue" : "text-white"
              )}
            >
              {activeTab === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-white"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{tab.title}</span>
            </button>
          ))}
        </div>
        {/* Contenido de los tabs */}
        <motion.div
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex w-full flex-col gap-6 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <TabContent
              key={activeTab}
              tabKey={activeTab}
              title={tabs[activeTab].title}
              description={tabs[activeTab].description}
              button={tabs[activeTab].button}
              video={tabs[activeTab].video}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
