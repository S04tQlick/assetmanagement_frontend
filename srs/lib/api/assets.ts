import {httpClient} from "@/srs/lib/apiClient/httpClient";
import {Asset_TypesInput, AssetsApiResponse } from "@/srs/types/asset-Types"; 

export const assetsApi = {
    getAll: () =>
        httpClient<AssetsApiResponse>("/Assets"),

    getById: (id: string) =>
        httpClient<AssetsApiResponse>(`/Assets/${id}`),

    create: (payload: Asset_TypesInput) =>
        httpClient<AssetsApiResponse>("/Assets", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: Asset_TypesInput) =>
        httpClient<AssetsApiResponse>(`/Assets/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/Assets/${id}`, {
            method: "DELETE"
        })
}
