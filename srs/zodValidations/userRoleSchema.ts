import {z} from 'zod'
import {UserRole_Types} from "@/srs/types/userRole-Types";

export const userRoleSchema = z.object({
    userId:  z.string()
        .uuid("UserId must be valid"),

    roleId: z.string()
        .uuid("RoleId must be valid"),
})