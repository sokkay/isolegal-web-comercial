"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import {
  technicalSupportFormSchema,
  type TechnicalSupportFormData,
} from "@/lib/schemas/technicalSupportForm";

export const TechnicalSupportForm = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TechnicalSupportFormData>({
    resolver: zodResolver(technicalSupportFormSchema),
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/submitTechnicalSupportForm", {
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
      className="bg-card-background dark:bg-surface-tonal-a10 rounded-2xl p-4 md:p-8 xl:p-10 space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-bg">
          <Image
            src="/icons/support-agent.svg"
            alt="Soporte técnico"
            width={22}
            height={22}
          />
        </div>
        <h3 className="text-text dark:text-white text-2xl font-bold">
          Formulario Soporte Técnico
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Input label="Nombre" {...register("name")} />
          {errors.name?.message && (
            <span className="text-xs text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <Input label="Empresa" {...register("company")} />
          {errors.company?.message && (
            <span className="text-xs text-red-500">
              {errors.company.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Input label="Telefono" type="tel" {...register("phone")} />
          {errors.phone?.message && (
            <span className="text-xs text-red-500">
              {errors.phone.message}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <Input label="Email" type="email" {...register("email")} />
          {errors.email?.message && (
            <span className="text-xs text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <TextArea
          label="Descripción del problema"
          placeholder="Describe detalladamente lo que sucede..."
          {...register("problem")}
        />
        {errors.problem?.message && (
          <span className="text-xs text-red-500">
            {errors.problem.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <Checkbox label="Términos y condiciones" {...register("terms")} />
        {errors.terms?.message && (
          <span className="text-xs text-red-500">
            {errors.terms.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Button text="Enviar solicitud" fullWidth loading={isSubmitting} />
        {submitStatus === "success" && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Solicitud enviada correctamente.
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-xs text-red-500 dark:text-red-400">
            No se pudo enviar. Intenta nuevamente.
          </p>
        )}
      </div>
    </form>
  );
};