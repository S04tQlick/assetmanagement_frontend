import {z} from 'zod'

export const branchSchema = z.object({
    branchName: z.string()
        .trim()
        .min(1, "Name is required")
        .max(50, "Name must be at most 50 characters"),

    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    
    institutionId: z.string()
        .uuid("InstitutionId must be valid"),
})