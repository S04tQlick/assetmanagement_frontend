import {Institution_Types} from "@/srs/types/institution-Types";

export type Vendor_Types = {
    id: string
    vendorsName: string
    emailAddress: string
    contactInfo: string
    institutionId: string
    institutions: Institution_Types
}

export type Vendor_TypesInput = {
    vendorsName: string
    emailAddress: string
    contactInfo: string
    institutionId: string
}

export type VendorsApiResponse = {
    success: boolean;
    message: string;
    data: Vendor_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}