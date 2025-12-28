import {Institution_Types} from "@/srs/types/institution.types";
import {AssetType_Types} from "@/srs/types/asset-type.types";

export type AssetCategory_Types = {
    id: string
    assetCategoryName: string
    assetTypes: AssetType_Types
    institutions: Institution_Types
}

export type AssetCategory_TypesInput = {
    assetCategoryName: string
    assetTypeId: string
    institutionId: string
}

export type AssetCategoriesApiResponse = {
    success: boolean;
    message: string;
    data: AssetCategory_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}