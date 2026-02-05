"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";

import SentimentVeryDissatisfiedIcon from "@/public/icons/sentiment-very-dissatisfied.svg";
import SentimentDissatisfiedIcon from "@/public/icons/sentiment-dissatisfied.svg";
import SentimentNeutralIcon from "@/public/icons/sentiment-neutral.svg";
import SentimentSatisfiedIcon from "@/public/icons/sentiment-satisfied.svg";
import SentimentVerySatisfiedIcon from "@/public/icons/sentiment-very-satisfied.svg";
import { opinionFormSchema, type OpinionFormData } from "@/lib/schemas/opinionForm";
import { cn } from "@/utils/cn";

const SATISFACTION_OPTIONS = [
  {
    value: "1",
    label: "Mal",
    Icon: SentimentVeryDissatisfiedIcon,
  },
  {
    value: "2",
    label: "Bajo",
    Icon: SentimentDissatisfiedIcon,
  },
  {
    value: "3",
    label: "Regular",
    Icon: SentimentNeutralIcon,
  },
  {
    value: "4",
    label: "Bien",
    Icon: SentimentSatisfiedIcon,
  },
  {
    value: "5",
    label: "Excelente",
    Icon: SentimentVerySatisfiedIcon,
  },
];

export const OpinionForm = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OpinionFormData>({
    resolver: zodResolver(opinionFormSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/submitOpinionForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error al enviar formulario");
      }

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl overflow-hidden"
    >
      <div className="space-y-2 bg-primary text-white p-4 md:p-8">
        <div className="flex items-center gap-2">
          <Image src="/icons/hands.svg" alt="Opinion" width={24} height={24} />
          <h3 className="text-lg font-bold">Tu opinión importa</h3>
        </div>
        <p className="text-sm">
          Ayúdanos a mejorar ISOLEGAL. Tus comentarios tienen un impacto directo
          en nuestras próximas actualizaciones.
        </p>
      </div>
      <div className="flex flex-col gap-6 p-4 md:p-8">
        <fieldset className="space-y-3">
          <legend className="text-text text-sm font-bold">
            ¿Qué tan satisfecho estás con el servicio?
          </legend>
          <div className="grid grid-cols-5 gap-0 md:gap-2.5 border border-disabled rounded-lg px-0 md:px-5 py-2.5 bg-input-bg">
            {SATISFACTION_OPTIONS.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  value={option.value}
                  className="peer sr-only"
                  {...register("satisfaction")}
                />
                <div className="flex flex-col items-center gap-2 text-disabled transition-colors peer-checked:text-primary">
                  <option.Icon
                    alt={option.label}
                    width={22}
                    height={22}
                    className={cn(
                      "fill-current transition-colors",
                    )}
                  />
                  <span className="text-center text-sm font-bold">
                    {option.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
          {errors.satisfaction?.message && (
            <span className="text-xs text-red-500">
              {errors.satisfaction.message}
            </span>
          )}
        </fieldset>

        <div className="space-y-1">
          <TextArea
            label="¿Cómo podemos ayudarte?"
            placeholder="Describe detalladamente lo que sucede..."
            {...register("details")}
          />
          {errors.details?.message && (
            <span className="text-xs text-red-500">
              {errors.details.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Button text="Enviar comentarios" fullWidth loading={isSubmitting} />
          {submitStatus === "success" && (
            <p className="text-xs text-emerald-600">
              Comentarios enviados correctamente.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-xs text-red-500">
              No se pudo enviar. Intenta nuevamente.
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
