import {ApiResponse} from "@/srs/utils/api-response";

export type AssetType_Types = {
    id?: string
    assetTypeName: string
    description: string,
    //isActive?:boolean,
};

export type AssetTypesApiResponse = ApiResponse<AssetType_Types>