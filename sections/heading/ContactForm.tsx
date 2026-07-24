"use client";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import { captureClientEvent } from "@/lib/posthog/client";
import { POSTHOG_EVENTS } from "@/lib/posthog/events";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  CONTACT_CARGO_OPTIONS,
  CONTACT_COMPANY_SIZE_OPTIONS,
  CONTACT_RUBRO_OPTIONS,
  ContactFormData,
  contactFormSchema,
} from "@/lib/schemas/contactForm";

type ContactFormProps = {
  onSuccess?: (data: ContactFormData) => void;
};

const cargoOptions = CONTACT_CARGO_OPTIONS.map((value) => ({
  value,

  label: value,
}));

const companySizeOptions = CONTACT_COMPANY_SIZE_OPTIONS.map((value) => ({
  value,

  label: value,
}));

const rubroOptions = CONTACT_RUBRO_OPTIONS.map((value) => ({
  value,

  label: value,
}));

export default function ContactForm({ onSuccess }: ContactFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      cargo: undefined,
      companySize: undefined,
      rubro: undefined,
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submitContactForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar el formulario");
      }

      setSubmitStatus("success");

      captureClientEvent(POSTHOG_EVENTS.contactFormCompleted, {
        consent: data.consent,
        has_company: Boolean(data.company.trim()),
        cargo: data.cargo,
        company_size: data.companySize,
        rubro: data.rubro,
      });

      reset();

      onSuccess?.(data);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error al enviar el formulario"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card-background space-y-6 rounded-2xl p-4 md:p-8 xl:p-16"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
        <div>
          <Input
            label="Nombre y Apellido"
            placeholder="Nombre Apellido"
            {...register("firstname")}
          />

          {errors.firstname && (
            <p className="mt-1 text-xs text-red-500">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Correo corporativo"
            type="email"
            placeholder="ejemplo@empresa.com"
            {...register("email")}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
        <div>
          <Input
            label="Teléfono"
            type="tel"
            placeholder="+56912345678"
            {...register("mobilephone")}
          />

          {errors.mobilephone && (
            <p className="mt-1 text-xs text-red-500">
              {errors.mobilephone.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Empresa"
            placeholder="Empresa"
            {...register("company")}
          />

          {errors.company && (
            <p className="mt-1 text-xs text-red-500">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
        <div>
          <Select
            label="Cargo"
            placeholder="Selecciona tu cargo"
            options={cargoOptions}
            {...register("cargo")}
          />

          {errors.cargo && (
            <p className="mt-1 text-xs text-red-500">{errors.cargo.message}</p>
          )}
        </div>

        <div>
          <Select
            label="Tamaño de la empresa"
            placeholder="Selecciona el tamaño"
            options={companySizeOptions}
            {...register("companySize")}
          />

          {errors.companySize && (
            <p className="mt-1 text-xs text-red-500">
              {errors.companySize.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Select
          label="Rubro/Industria"
          placeholder="Selecciona el rubro"
          options={rubroOptions}
          {...register("rubro")}
        />

        {errors.rubro && (
          <p className="mt-1 text-xs text-red-500">{errors.rubro.message}</p>
        )}
      </div>

      <div>
        <TextArea
          label="¿Qué necesita resolver tu empresa?"
          placeholder="Describe el desafío o necesidad de tu empresa..."
          {...register("message")}
        />

        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div>
        <Checkbox
          label="Acepto recibir comunicaciones de Isolegal"
          {...register("consent")}
        />

        {errors.consent && (
          <p className="mt-1 text-xs text-red-500">{errors.consent.message}</p>
        )}
      </div>

      {submitStatus === "success" && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300">
          ¡Gracias! Tu mensaje ha sido enviado exitosamente. Nos pondremos en
          contacto contigo pronto.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300">
          {errorMessage}
        </div>
      )}

      <Button
        text={isSubmitting ? "Enviando..." : "Cotiza aquí"}
        fullWidth
        disabled={isSubmitting}
      />
    </form>
  );
}
