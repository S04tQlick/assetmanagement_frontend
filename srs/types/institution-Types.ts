export type Institution_Types = {
    id: string,
    institutionName: string,
    institutionEmail: string,
    institutionContactNumber: string,
    primaryColor: string,
    secondaryColor: string,
    logoSanityId: string,
    logoUrl: string,
}

export type Institution_TypesInput = {
    institutionName: string,
    institutionEmail: string,
    institutionContactNumber: string,
    primaryColor: string,
    secondaryColor: string,
    logoSanityId?: string,
    logoUrl?: string,
}

export type InstitutionsApiResponse = {
    success: boolean;
    message: string;
    data: Institution_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}