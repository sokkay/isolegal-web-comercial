"use client";

import CheckListIcon from "@/public/icons/checklist.svg";
import DatabaseIcon from "@/public/icons/database.svg";
import HandshakeIcon from "@/public/icons/handshake.svg";
import SupportIcon from "@/public/icons/support.svg";
import TableEditIcon from "@/public/icons/table-edit.svg";
import { cn } from "@/utils/cn";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

const characteristics = [
  {
    icon: <DatabaseIcon className="fill-primary w-8 h-8" />,
    title: "Base de datos normativa gestionada por abogados",
    description:
      "Nos encargamos de la gestión completa de tu matriz legal: incorporamos, actualizamos o eliminamos normas según cambios legales y su aplicabilidad real a tu operación.",
  },
  {
    icon: <TableEditIcon className="fill-primary w-8 h-8" />,
    title: "Matriz legal personalizada y accionable",
    description:
      "Visualiza solo lo que te aplica según tu rubro y actividad. Sin ruido ni duplicidades.",
  },
  {
    icon: <CheckListIcon className="fill-primary w-8 h-8" />,
    title: "Preguntas guía con interpretación normativa clara",
    description:
      "Nos encargamos de la gestión completa de tu matriz legal: incorporamos, actualizamos o eliminamos normas según cambios legales y su aplicabilidad real a tu operación.",
  },
  {
    icon: <SupportIcon className="fill-primary w-8 h-8" />,
    title: "Revisión inteligente de evidencia con apoyo de IA",
    description:
      "Nuestra IA valida que la evidencia sea pertinente y suficiente, reduciendo reprocesos permitiendo ahorrar auditorias internas de cumplimiento legal.",
  },
  {
    icon: <HandshakeIcon className="fill-primary w-8 h-8" />,
    title: "Gestión de cumplimiento y acompañamiento en auditorías",
    description:
      "Alertas automáticas de cambios normativos, planes de acción trazables y apoyo experto durante auditorías internas, externas o de certificación.",
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
        delay: 5000,
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
      <h1 className="text-3xl font-bold text-center text-text dark:text-white mb-12">
        ¿Por qué Isolegal?
      </h1>

      <div className="embla relative">
        <div
          className="embla__viewport overflow-x-hidden overflow-y-visible py-5 px-2 sm:px-4"
          ref={emblaRef}
        >
          <div className="embla__container">
            {characteristics.map((characteristic, index) => (
              <div
                key={characteristic.title}
                className="embla__slide flex-[0_0_78%] sm:flex-[0_0_56%] lg:flex-[0_0_33.333%] min-w-0 px-2"
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
        "embla__slide__grow origin-center bg-card-background h-full dark:bg-surface-tonal-a10 rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col items-center gap-4 transition-all duration-300 will-change-transform cursor-pointer text-left w-full",
        className
      )}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-bg shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg text-center font-bold pb-3 text-text dark:text-white">
          {title}
        </h3>
      </div>
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
          ? "bg-black/50 opacity-100 pointer-events-auto"
          : "bg-black/0 opacity-0 pointer-events-none"
      )}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(
          "w-full max-w-lg bg-card-background dark:bg-surface-tonal-a10 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-200",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-text dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-text-muted dark:text-neutral-300 hover:text-text dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-text-muted dark:text-neutral-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
