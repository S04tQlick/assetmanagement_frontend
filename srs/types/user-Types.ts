import {Institution_Types} from "@/srs/types/institution-Types";

export type User_Types = {
    id: string
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    displayName: string
    passwordHash: string 
    institutions: Institution_Types
}

export type User_TypesInput = {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string 
    passwordHash: string
    confirmPassword: string
    institutionId: string
}

export type UsersApiResponse = {
    success: boolean;
    message: string;
    data: User_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}





// Payload for creating a new user
export type UserCreatePayload = {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    institutionId: string
    passwordHash: string
    confirmPassword?: string
}

// Payload for updating an existing user
export type UserUpdatePayload = {
    firstName: string
    lastName: string
    phoneNumber: string
    institutionId: string
}

// Union type if you want to accept both
export type UserPayload = UserCreatePayload | UserUpdatePayload
