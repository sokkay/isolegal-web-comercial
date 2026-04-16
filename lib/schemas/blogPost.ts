import { z } from "zod";

const pocketBaseDateStringSchema = z
  .string()
  .min(1)
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Fecha inválida",
  });

export const blogPostStatusSchema = z.enum(["draft", "published"]);

export const blogPostRecordSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  excerpt: z.string().trim().default(""),
  tags: z
    .array(z.string().trim())
    .optional()
    .nullable()
    .transform((value) =>
      (value ?? []).map((tag) => tag.trim()).filter(Boolean)
    ),
  content_html: z.string().trim().min(1),
  cover_image_key: z
    .string()
    .optional()
    .nullable()
    .transform((value) => {
      const normalized = value?.trim();
      return normalized ? normalized : null;
    }),
  status: blogPostStatusSchema,
  published_at: z
    .union([pocketBaseDateStringSchema, z.null()])
    .optional()
    .transform((value) => value ?? null),
  created: pocketBaseDateStringSchema,
  updated: pocketBaseDateStringSchema,
});

export type BlogPostRecord = z.infer<typeof blogPostRecordSchema>;
