import {httpClient} from "@/srs/lib/apiClient/httpClient";
import {Address_TypesInput, AddressesApiResponse } from "@/srs/types/address-Types";

export const addressesApi = {
    getAll: () =>
        httpClient<AddressesApiResponse>("/Addresses"),

    getById: (id: string) =>
        httpClient<AddressesApiResponse>(`/Addresses/${id}`),

    create: (payload: Address_TypesInput) =>
        httpClient<AddressesApiResponse>("/Addresses", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: Address_TypesInput) =>
        httpClient<AddressesApiResponse>(`/Addresses/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/Addresses/${id}`, {
            method: "DELETE"
        })
}
