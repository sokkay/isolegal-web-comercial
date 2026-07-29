"use client";

import ArrowRightIcon from "@/public/icons/arrow-right-alt.svg";
import DatabaseV2Icon from "@/public/icons/database-v2.svg";
import GestionCumplimientoIcon from "@/public/icons/gestion-cumplimiento.svg";
import HeatmapIcon from "@/public/icons/heat-map.svg";
import MatrizLegalPersonalizadaIcon from "@/public/icons/matriz-legal-perzonalizada.svg";
import PreguntasGuiaIcon from "@/public/icons/preguntas-guia.svg";
import RevisionInteligenteIcon from "@/public/icons/revision-inteligente.svg";
import { cn } from "@/utils/cn";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ReactNode, useEffect, useRef, useState } from "react";

const characteristics = [
  {
    icon: <HeatmapIcon className="fill-primary h-9 w-9" />,
    title: "Análisis de riesgo con mapa de calor",
    description:
      "Identifica rápidamente las áreas con mayor exposición al incumplimiento normativo. Priorizamos brechas críticas según impacto y probabilidad, para enfocar la gestión donde existe mayor riesgo operacional, legal o reputacional.",
  },
  {
    icon: <MatrizLegalPersonalizadaIcon className="fill-primary h-9 w-9" />,
    title: "Matriz legal personalizada y accionable en Chile",
    description:
      "Administramos y mantenemos actualizada tu matriz legal, mostrando solo lo que te aplica según tu rubro y actividad. Sin ruido ni duplicidades.",
  },
  {
    icon: <PreguntasGuiaIcon className="fill-primary h-9 w-9" />,
    title: "Interpretación normativa clara y aplicable",
    description:
      "Convertimos requisitos legales complejos en preguntas guía y acciones concretas para facilitar el cumplimiento en terreno.",
  },
  {
    icon: <RevisionInteligenteIcon className="fill-primary h-9 w-9" />,
    title: "Revisión inteligente de evidencia con IA",
    description:
      "Nuestro sistema valida si la evidencia cargada es pertinente y suficiente antes de auditorías o fiscalizaciones, reduciendo reprocesos y tiempos de revisión.",
  },
  {
    icon: <GestionCumplimientoIcon className="fill-primary h-9 w-9" />,
    title: "Gestión de auditorías y fiscalizaciones",
    description:
      "Gestiona auditorías internas, externas o de certificación con información ordenada, trazable y disponible en tiempo real.",
  },
  {
    icon: <DatabaseV2Icon className="fill-primary h-9 w-9" />,
    title: "Base normativa administrada por abogados",
    description:
      "Nuestro equipo legal mantiene actualizada la matriz normativa incorporando cambios legales, derogaciones y nuevas obligaciones aplicables a tu operación.",
  },
];

const SIDE_SCALE = 0.86;
const CENTER_SCALE = 1.08;
const SIDE_OPACITY = 0.62;
const CENTER_OPACITY = 1;
const MODAL_TRANSITION_MS = 220;

export default function WhyIsolegalV2() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
      skipSnaps: false,
      slidesToScroll: 1,
      containScroll: false,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ]
  );

  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = (emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__grow") as HTMLElement;
    });
  };

  const applyScaleState = (emblaApi: EmblaCarouselType): void => {
    const selectedIndex = emblaApi.selectedScrollSnap();

    tweenNodes.current.forEach((node, index) => {
      if (!node) return;

      const isCenter = index === selectedIndex;
      const scale = isCenter ? CENTER_SCALE : SIDE_SCALE;
      const opacity = isCenter ? CENTER_OPACITY : SIDE_OPACITY;

      node.style.transform = `scale(${scale})`;
      node.style.opacity = `${opacity}`;
      node.style.zIndex = isCenter ? "2" : "1";
    });
  };

  useEffect(() => {
    if (!emblaApi) return;
    setTweenNodes(emblaApi);
    applyScaleState(emblaApi);

    const onReInit = (api: EmblaCarouselType) => {
      setTweenNodes(api);
      applyScaleState(api);
    };
    const onSelect = (api: EmblaCarouselType) => applyScaleState(api);
    const onSlideFocus = (api: EmblaCarouselType) => applyScaleState(api);

    emblaApi
      .on("reInit", onReInit)
      .on("select", onSelect)
      .on("slideFocus", onSlideFocus);

    return () => {
      emblaApi.off("reInit", onReInit);
      emblaApi.off("select", onSelect);
      emblaApi.off("slideFocus", onSlideFocus);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (activeCardIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalVisible(false);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = setTimeout(() => {
          setActiveCardIndex(null);
        }, MODAL_TRANSITION_MS);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    emblaApi?.plugins().autoplay?.stop?.();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      emblaApi?.plugins().autoplay?.play?.();
    };
  }, [activeCardIndex, emblaApi]);

  useEffect(() => {
    if (activeCardIndex === null) {
      setIsModalVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => setIsModalVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [activeCardIndex]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCardIndex(null);
    }, MODAL_TRANSITION_MS);
  };

  const handleOpenModal = (index: number) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveCardIndex(index);
  };

  return (
    <section id="soluciones" className="container mx-auto py-16">
      <h2 className="text-text mb-12 text-center text-3xl font-bold dark:text-white">
        ¿Por qué Isolegal es tu software de compliance?
      </h2>

      <p className="text-text mb-12 text-center text-xl font-bold dark:text-white">
        Convertimos requisitos legales en acciones concretas para controlar tu
        riesgo de cumplimiento
      </p>

      <div className="embla relative">
        <div
          className="embla__viewport overflow-x-hidden overflow-y-visible px-2 py-5 sm:px-4"
          ref={emblaRef}
        >
          <div className="embla__container">
            {characteristics.map((characteristic, index) => (
              <div
                key={characteristic.title}
                className="embla__slide min-w-0 flex-[0_0_78%] px-2 sm:flex-[0_0_56%] lg:flex-[0_0_33.333%]"
              >
                <Card
                  {...characteristic}
                  onClick={() => handleOpenModal(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {activeCardIndex !== null && (
        <CardModal
          isOpen={isModalVisible}
          title={characteristics[activeCardIndex].title}
          description={characteristics[activeCardIndex].description}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}

type CardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
};

const Card = ({ title, icon, className, onClick }: CardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "embla__slide__grow group bg-card-background dark:bg-surface-tonal-a10 flex h-full w-full origin-center cursor-pointer flex-col items-center gap-4 rounded-2xl p-5 text-left transition-all duration-300 will-change-transform hover:-translate-y-0.5 sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="bg-green-bg flex shrink-0 items-center justify-center rounded-full p-4">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-text pb-3 text-center text-lg font-bold dark:text-white">
          {title}
        </h3>
      </div>
      <span className="text-primary inline-flex items-center justify-center gap-1 text-sm font-medium dark:text-white">
        Ver más
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <ArrowRightIcon className="fill-primary h-4 w-4 dark:fill-white" />
        </span>
      </span>
    </button>
  );
};

type CardModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
};

const CardModal = ({ isOpen, title, description, onClose }: CardModalProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] transition-opacity duration-200",
        isOpen
          ? "pointer-events-auto bg-black/50 opacity-100"
          : "pointer-events-none bg-black/0 opacity-0"
      )}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(
          "bg-card-background dark:bg-surface-tonal-a10 w-full max-w-lg rounded-2xl p-6 shadow-2xl transition-all duration-200 sm:p-8",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-95 opacity-0"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-text text-xl font-bold dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-text-muted hover:text-text cursor-pointer transition-colors dark:text-neutral-300 dark:hover:text-white"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>
        <p className="text-text-muted mt-4 leading-relaxed dark:text-neutral-300">
          {description}
        </p>
      </div>
    </div>
  );
};
