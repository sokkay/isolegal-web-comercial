import freeEmailDomains from "free-email-domains";
import { z } from "zod";
import { isBusinessEmailValidationEnabled } from "@/lib/config/businessEmailValidation";

export const contactFormSchema = z.object({
  firstname: z.string().min(1, "Nombre y Apellido es requerido"),
  email: z
    .email({ message: "Email inválido" })
    .min(1, "Debes ingresar tu correo corporativo")
    .refine((val) => {
      if (!isBusinessEmailValidationEnabled()) {
        return true;
      }

      const domain = val.split("@")[1]?.toLowerCase();
      return !!domain && !freeEmailDomains.includes(domain);
    }, {
      message: "Debes usar un correo corporativo",
    }),
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
