import { z } from "zod";

export const contactFormSchema = z.object({
  firstname: z.string().min(1, "Nombre es requerido"),
  email: z
    .string()
    .email("Email inválido")
    .refine((email) => {
      const blockedDomains = [
        "gmail.com",
        "hotmail.com",
        "outlook.com",
        "yahoo.com",
        "icloud.com",
        "live.com",
        "msn.com",
        "aol.com",
        "protonmail.com",
      ];
      const domain = email.split("@")[1];
      return !blockedDomains.includes(domain);
    }, "Debes usar un email corporativo"),
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
