import { z } from "zod";

export const opinionFormSchema = z.object({
  satisfaction: z.enum(["1", "2", "3", "4", "5"], {
    message: "Selecciona una opción",
  }),
  details: z.string().min(1, "Comentario es requerido"),
});

export type OpinionFormData = z.infer<typeof opinionFormSchema>;
