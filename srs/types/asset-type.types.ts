import {ApiResponse} from "@/srs/utils/api-response";

export type AssetType_Types = {
    id?: string
    assetTypeName: string
    description: string
};

export type AssetTypesApiResponse = ApiResponse<AssetType_Types>