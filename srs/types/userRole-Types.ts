import {User_Types} from "@/srs/types/user-Types";
import {Role_Types} from "@/srs/types/role-Types";

export type UserRole_Types = {
    id: string  
    users: User_Types 
    roles: Role_Types
}

export type UserRole_TypesInput = { 
    userId: string
    roleId: string
}

export type UserRolesApiResponse = {
    success: boolean;
    message: string;
    data: UserRole_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}