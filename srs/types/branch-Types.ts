import {Institution_Types} from "@/srs/types/institution-Types";

export type Branch_Types = {
    id: string
    branchName: string
    latitude: number
    longitude: number
    institutions: Institution_Types
    isHeadOffice:boolean
}

export type Branch_TypesInput = {
    branchName: string
    latitude: number
    longitude: number
    institutionId: string  
}

export type BranchesApiResponse = {
    success: boolean;
    message: string;
    data: Branch_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}