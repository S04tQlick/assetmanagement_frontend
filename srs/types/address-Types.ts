export type Address_Types = {
    id: string
    street: string
    city: string
    state: string
    postalCode: string
    region: string
    country: string
    queryId: string
}

export type Address_TypesInput = {
    street: string
    city: string
    state: string
    postalCode: string
    region: string
    country: string
    queryId: string
}

export type AddressesApiResponse = {
    success: boolean;
    message: string;
    data: Address_Types[];
    rowCount: number;
    userCount: number;
    branchCount: number;
    assetCount: number;
}