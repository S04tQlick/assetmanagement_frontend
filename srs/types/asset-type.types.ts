export type AssetType_Types = {
    id?: string
    assetTypeName: string
    description: string
};

export type AssetTypesApiResponse = {
    success: boolean;
    message?: string;
    data?: AssetType_Types | AssetType_Types[] | null;
    rowCount?: number;
    userCount?: number;
    branchCount?: number;
    assetCount?: number;
    errors?: unknown;
};