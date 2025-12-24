import { z } from "zod";


const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

export const institutionSchema = z.object({
    institutionName: z.string()
        .trim()
        .min(1, "Institution name is required")
        .max(200, "Institution name must be at most 200 characters"),

    institutionEmail: z.string()
        .trim()
        .email("Invalid email format")
        .min(1, "Email is required")
        .max(50, "Email must be at most 200 characters"),

    institutionContactNumber: z.string()
        .trim()
        .min(1, "Contact number is required")
        .max(20, "Contact number must be at most 50 characters"),

    primaryColor: z.string()
        .trim()
        .regex(hexColorRegex, "Primary color must be a valid hex code (e.g. #RRGGBB)"),

    secondaryColor: z.string()
        .trim()
        .regex(hexColorRegex, "Secondary color must be a valid hex code (e.g. #RRGGBB)"),

    logoSanityId: z.string()
        .regex(/^[a-zA-Z0-9_-]+$/, "Logo Sanity ID must be alphanumeric")
        .max(100, "Logo Sanity ID must be at most 100 characters")
        .optional(),

    logoUrl: z.string()
        .url("Invalid URL format")
        .max(200, "Logo URL must be at most 200 characters")
        .optional()
});
