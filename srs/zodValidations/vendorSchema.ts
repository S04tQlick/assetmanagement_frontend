import {z} from 'zod'

export const vendorSchema = z.object({
    vendorsName: z.string()
        .trim()
        .min(1, "Name is required")
        .max(50, "Name must be at most 50 characters"),

    emailAddress: z.string()
        .trim()
        .min(1, "Email is required")
        .max(50, "Email must be at most 50 characters"),

    contactInfo: z.string()
        .trim()
        .min(1, "Contact is required")
        .max(50, "Contact must be at most 50 characters"),
    
    institutionId: z.string()
        .uuid("InstitutionId must be valid"),
})