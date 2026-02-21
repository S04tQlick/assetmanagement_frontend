import { z } from "zod";

// export const fileUploadSchema = z.object({
//     s3Key: z.string().min(1),
//     institutionId: z.string().uuid(),
//     isLogo: z.boolean().optional()
// });



// export const fileUploadSchema = z.object({ 
//     institutionId: z .string() .min(1, "InstitutionId is required"), 
//     isLogo: z .boolean() .optional() 
// });




// export const fileUploadSchema = z.object({
//     institutionId: z
//         .string()
//         .min(1, "Institution ID is required"),
//
//     isLogo: z
//         .boolean(), 
//     file: z
//         .any()
//         .optional()
// });



export const fileUploadSchema = z.object({ 
    institutionId: z.string().min(1), 
    isLogo: z.boolean(), 
    file: z.instanceof(File).optional(), 
});