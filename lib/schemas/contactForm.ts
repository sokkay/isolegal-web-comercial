import { z } from "zod";
import {
  hasBusinessEmailDomain,
  isBusinessEmailValidationEnabled,
} from "@/lib/config/businessEmailValidation";

export const CONTACT_CARGO_OPTIONS = [
  "SSOMA/HSE",
  "Compliance/Legal",
  "Gerencia/Operaciones",
  "Calidad",
  "Otro",
] as const;

export const CONTACT_COMPANY_SIZE_OPTIONS = [
  "1–50",
  "51–200",
  "201–500",
  "+500 colaboradores",
] as const;

export const CONTACT_RUBRO_OPTIONS = [
  "Minería",
  "Construcción",
  "Energía",
  "Transporte",
  "Manufactura",
  "Servicios",
  "Otro",
] as const;

export const contactFormSchema = z.object({
  firstname: z.string().min(1, "Nombre y Apellido es requerido"),
  email: z
    .email({ message: "Email inválido" })
    .min(1, "Debes ingresar tu correo corporativo")
    .refine((val) => {
      if (!isBusinessEmailValidationEnabled()) {
        return true;
      }

      return hasBusinessEmailDomain(val);
    }, {
      message: "Debes usar un correo corporativo",
    }),
  mobilephone: z
    .string()
    .regex(/^\+56\d{9}$/, "Formato: +56912345678 (12 dígitos)"),
  company: z.string().min(1, "Empresa es requerida"),
  cargo: z.enum(CONTACT_CARGO_OPTIONS, {
    message: "Debes seleccionar un cargo",
  }),
  companySize: z.enum(CONTACT_COMPANY_SIZE_OPTIONS, {
    message: "Debes seleccionar el tamaño de la empresa",
  }),
  rubro: z.enum(CONTACT_RUBRO_OPTIONS, {
    message: "Debes seleccionar un rubro",
  }),
  message: z.string().min(1, "Este campo es requerido"),
  consent: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar los términos"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
