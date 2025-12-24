import {z} from 'zod'

export const assetTypeSchema = z.object({
    assetTypeName: z.string()
        .trim()
        .min(1, "Name is required")
        .max(50, "Name must be at most 50 characters"),

    description: z.string()
        .trim()
        .min(1, "Description is required")
        .max(500, "Description must be at most 500 characters"),
});