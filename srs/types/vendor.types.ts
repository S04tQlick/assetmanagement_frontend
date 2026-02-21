import {Institution_Types} from "@/srs/types/institution.types";
import { ApiResponse } from "@/srs/utils/api-response";

export type Vendor_Types = {
    id: string
    vendorsName: string
    emailAddress: string
    contactInfo: string 
    institutions: Institution_Types
}

export type VendorsApiResponse = ApiResponse<Vendor_Types>;