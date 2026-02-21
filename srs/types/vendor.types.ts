import {Institution_Types} from "@/srs/types/institution.types";
import {ApiResponse} from "@/srs/utils/api-response";

export type Vendor_Types = {
    id?: string
    vendorsName: string
    emailAddress: string
    contactInfo: string
    //institutionId: string
    institutions: Institution_Types
}

// export type Vendor_TypesInput = {
//     vendorsName: string
//     emailAddress: string
//     contactInfo: string
//     institutionId: string
// }

export type VendorsApiResponse = ApiResponse<Vendor_Types>