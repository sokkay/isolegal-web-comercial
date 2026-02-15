import { z } from "zod";

export const contactFormSchema = z.object({
  firstname: z.string().min(1, "Nombre y Apellido es requerido"),
  email: z.email({ message: "Email inválido" }),
  mobilephone: z
    .string()
    .regex(/^\+56\d{9}$/, "Formato: +56912345678 (12 dígitos)"),
  company: z.string().min(1, "Empresa es requerida"),
  message: z.string().min(1, "Mensaje es requerido"),
  consent: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar los términos"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
