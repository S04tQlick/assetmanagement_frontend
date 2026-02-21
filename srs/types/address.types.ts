import {ApiResponse} from "@/srs/utils/api-response";

export type Address_Types = {
    id?: string
    street: string
    city: string
    state: string
    postalCode: string
    region: string
    country: string
    queryId: string
}

export type AddressesApiResponse = ApiResponse<Address_Types>