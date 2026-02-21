import {Institution_Types} from "@/srs/types/institution.types";
import {AssetType_Types} from "@/srs/types/asset-type.types";
import {Vendor_Types} from "@/srs/types/vendor.types";
import {Branch_Types} from "@/srs/types/branch.types";
import {AssetCategory_Types} from "@/srs/types/asset-category.types";
import {ApiResponse} from "@/srs/utils/api-response";

export type Asset_Types = {
    id?:string,
    assetName: string,
    institutions: Institution_Types,
    branches:Branch_Types ,
    assetCategories:AssetCategory_Types,
    assetTypes:AssetType_Types,
    vendors:Vendor_Types,
    serialNumber: string,
    purchaseDate: string,
    purchasePrice: Number,
    usefulLifeYears: Number,
    unitsTotal: Number,
    currentUnits: Number,
    sanityAssetId?: string,
    sanityUrl?: string,
    maintenanceDueDate: string,
    salvageValue: Number,
    depreciationMethod: string,
    currentValue: Number,
    accumulatedDepreciation: Number,
    nextMaintenanceDate: string
}

// export type Asset_TypesInput = {
//     assetName: string,
//     institutionId: string,
//     branchId:string ,
//     assetCategoryId:string ,
//     assetTypeId: string,
//     vendorId: string,
//     serialNumber: string,
//     purchaseDate: string,
//     purchasePrice: Number,
//     usefulLifeYears: Number,
//     unitsTotal: Number,
//     currentUnits: Number,
//     sanityAssetId: string,
//     sanityUrl: string,
//     maintenanceDueDate: string,
//     salvageValue: Number,
//     depreciationMethod: string,
//     currentValue: Number,
//     accumulatedDepreciation: Number,
//     nextMaintenanceDate: string
// }

export type AssetsApiResponse = ApiResponse<AssetCategory_Types>