import { z } from "zod";

export const fileUploadSchema = z.object({ 
    institutionId: z.string().min(1), 
    isLogo: z.boolean(), 
    file: z.instanceof(File).optional(), 
});