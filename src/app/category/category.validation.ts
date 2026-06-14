
import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  slug: z.string(),
  image: z.string(),
});

export const categoryCreateZodSchema = z.object({
  body: bodySchema,
});

export const categoryUpdateZodSchema = z.object({
  body: bodySchema.partial(),
});
