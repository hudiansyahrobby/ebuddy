import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  displayName: z.string().nonempty("Display name is required"),
});

export type UpdateUserValues = z.infer<typeof updateUserSchema>;

export type TUser = {
  email: string;
  displayName: string;
  uid: string;
};
