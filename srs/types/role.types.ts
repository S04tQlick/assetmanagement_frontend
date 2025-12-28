export type Role_Types = {
    id: string
    roleName: string 
}

export type Role_TypesInput = {
    roleName: string 
}

export type RolesApiResponse = {
    success: boolean;
    message: string;
    data: Role_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}