import {ApiResponse} from "@/srs/utils/api-response";

export type Role_Types = {
    id?: string
    roleName: string 
}

// export type Role_TypesInput = {
//     roleName: string 
// }

export type RolesApiResponse = ApiResponse<Role_Types>