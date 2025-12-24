import {httpClient} from "@/srs/lib/apiClient/httpClient";
import {VendorsApiResponse, Vendor_TypesInput} from "@/srs/types/vendor-Types";

export const vendorsApi = {
    getAll: () =>
        httpClient<VendorsApiResponse>("/Vendors"),

    getById: (id: string) =>
        httpClient<VendorsApiResponse>(`/Vendors/${id}`),

    create: (payload: Vendor_TypesInput) =>
        httpClient<VendorsApiResponse>("/Vendors", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: Vendor_TypesInput) =>
        httpClient<VendorsApiResponse>(`/Vendors/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/Vendors/${id}`, {
            method: "DELETE"
        })
}