import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type UserAuthValues = z.infer<typeof userAuthSchema>;

export type TLoginResponse = {
  accessToken: string;
};
