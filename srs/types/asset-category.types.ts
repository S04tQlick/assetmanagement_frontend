import {Institution_Types} from "@/srs/types/institution.types";
import {AssetType_Types} from "@/srs/types/asset-type.types";
import { ApiResponse } from "@/srs/utils/api-response";

export type AssetCategory_Types = {
    id: string
    assetCategoryName: string
    assetTypes: AssetType_Types
    institutions: Institution_Types
}

// export type AssetCategory_TypesInput = {
//     assetCategoryName: string
//     assetTypeId: string
//     institutionId: string
// }

export type AssetCategoriesApiResponse = ApiResponse<AssetCategory_Types>;