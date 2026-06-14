import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["superAdmin", "admin", "user"]),
});

export const userCreateZodSchema = z.object({
  body: bodySchema,
});

export const userUpdateZodSchema = z.object({
  body: bodySchema.omit({ password: true }).partial(),
});
