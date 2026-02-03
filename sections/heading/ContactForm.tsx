"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import {
  ContactFormData,
  contactFormSchema,
} from "@/lib/schemas/contactForm";

export default function ContactForm() {
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
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Error al enviar el formulario",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-4 md:p-8 xl:p-16 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Nombre"
            {...register("firstname")}
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Empresa"
            {...register("company")}
          />
          {errors.company && (
            <p className="text-red-500 text-xs mt-1">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Telefono"
            type="tel"
            {...register("mobilephone")}
          />
          {errors.mobilephone && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mobilephone.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <TextArea
          label="Mensaje"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <Checkbox
          label="Acepto recibir comunicaciones de Isolegal"
          {...register("consent")}
        />
        {errors.consent && (
          <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>
        )}
      </div>

      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          ¡Gracias! Tu mensaje ha sido enviado exitosamente. Nos pondremos en
          contacto contigo pronto.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <Button
        text={isSubmitting ? "Enviando..." : "Enviar"}
        fullWidth
        disabled={isSubmitting}
      />
    </form>
  );
}
