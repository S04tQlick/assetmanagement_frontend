import {Institution_Types} from "@/srs/types/institution.types";
import {ApiResponse} from "@/srs/utils/api-response";

export type Branch_Types = {
    id: string
    branchName: string
    latitude: number
    longitude: number
    institutionId: string
    institutions: Institution_Types
    isHeadOffice:boolean
}

export type BranchesApiResponse = ApiResponse<Branch_Types> 