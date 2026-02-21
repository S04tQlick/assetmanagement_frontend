import { z } from "zod";

export const userCreateSchema = z.object({
    mode: z.literal("create"),
    firstName: z.string().trim().min(1, "First name is required").max(50),
    lastName: z.string().trim().min(1, "Last name is required").max(50),
    emailAddress: z.string().trim().email("Invalid email format").min(1).max(200),
    phoneNumber: z.string().min(1).max(50),
    passwordHash: z.string().min(1, "Password is required").max(50),
    confirmPassword: z.string().trim().min(1, "Confirm password is required").max(50),
    institutionId: z.string().uuid("InstitutionId must be valid"),
});

export const userUpdateSchema = z.object({
    mode: z.literal("update"),
    firstName: z.string().trim().min(1, "First name is required").max(50),
    lastName: z.string().trim().min(1, "Last name is required").max(50),
    phoneNumber: z.string().trim().min(1).max(50),
    institutionId: z.string().uuid("InstitutionId must be valid"),
});

export const userSchema = z.discriminatedUnion("mode", [
    userCreateSchema,
    userUpdateSchema,
]);

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserRequestInput = z.infer<typeof userSchema>;
