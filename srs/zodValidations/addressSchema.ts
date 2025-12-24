import {z} from 'zod'

export const addressSchema = z.object({
    street: z.string()
        .trim()
        .min(1, "street is required")
        .max(50, "street must be at most 50 characters"),

    city: z.string()
        .trim()
        .min(1, "city is required")
        .max(50, "city must be at most 50 characters"),

    state: z.string()
        .trim()
        .min(1, "state is required")
        .max(50, "state must be at most 50 characters"),

    postalCode: z.string()
        .trim()
        .min(1, "postalCode is required")
        .max(10, "postalCode must be at most 50 characters"),

    region: z.string()
        .trim()
        .min(1, "region is required")
        .max(50, "region must be at most 50 characters"),

    country: z.string()
        .trim()
        .min(1, "country is required")
        .max(50, "country must be at most 50 characters"),

    queryId:  z.string()
        .uuid("queryId must be valid"),
})