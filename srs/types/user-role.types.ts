import {User_Types} from "@/srs/types/user.types";
import {Role_Types} from "@/srs/types/role.types";
import {ApiResponse} from "@/srs/utils/api-response";

export type UserRole_Types = {
    id?: string  
    users: User_Types 
    roles: Role_Types
}

export type UserRolesApiResponse = ApiResponse<UserRole_Types> 