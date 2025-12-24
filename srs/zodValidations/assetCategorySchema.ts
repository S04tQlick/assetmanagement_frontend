import {z} from 'zod'

export const assetCategorySchema = z.object({
    assetCategoryName: z.string()
        .trim()
        .min(1, "Name is required")
        .max(50, "Name must be at most 50 characters"),
    
    assetTypeId:  z.string()
        .uuid("AssetTypeId must be valid"),
    
    institutionId: z.string()
        .uuid("InstitutionId must be valid"),
})