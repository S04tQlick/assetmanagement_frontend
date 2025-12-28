import {z} from 'zod' 

export const userRoleSchema = z.object({
    userId:  z.string()
        .uuid("UserId must be valid"),

    roleId: z.string()
        .uuid("RoleId must be valid"),
})

// Type inference
export type UserRoleInput = z.infer<typeof userRoleSchema>;