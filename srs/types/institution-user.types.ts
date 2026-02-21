import {ApiResponse} from "@/srs/utils/api-response";

export type InstitutionUser_Types = {
    id?: string
    userId: string
    DisplayName?: string
    InstitutionId: string
    InstitutionName?: string
}

// export type InstitutionUser_TypesInput = {
//     userId: string
//     InstitutionId: string
// }

export type InstitutionUsersApiResponse = ApiResponse<InstitutionUser_Types> 