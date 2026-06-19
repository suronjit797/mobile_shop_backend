import { z } from "zod";

const bodySchema = z.object({
  items: z.array(
    z.object({
      product: z.string(),
      quantity: z.number(),
    }),
  ),
  customer: z.string(),
  customerOrderInfo: z.object({
    city: z.string(),
    country: z.string(),
    name: z.string(),
    phone: z.string(),
    state: z.string(),
    street: z.string(),
    zipCode: z.string(),
    paymentMethod: z.string(),
  }),
  status: z.enum(["delivered", "processing", "shipped", "pending", "cancelled"]),
});

export const orderCreateZodSchema = z.object({
  body: bodySchema,
});

export const orderUpdateZodSchema = z.object({
  body: bodySchema.partial(),
});
