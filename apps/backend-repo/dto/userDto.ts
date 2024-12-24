import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  displayName: z.string(),
});
