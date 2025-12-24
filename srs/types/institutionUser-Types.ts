
export type InstitutionUser_Types = {
    id?: string
    userId: string
    DisplayName?: string
    InstitutionId: string
    InstitutionName?: string
}

export type InstitutionUser_TypesInput = {
    userId: string
    InstitutionId: string
}

export type InstitutionUsersApiResponse = {
    success: boolean;
    message: string;
    data: InstitutionUser_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}