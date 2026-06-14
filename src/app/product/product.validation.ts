import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  images: z.array(z.string()),
  category: z.string(),
  brand: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  seller: z.string(),
});

export const productCreateZodSchema = z.object({
  body: bodySchema,
});

export const productUpdateZodSchema = z.object({
  body: bodySchema.partial(),
});
