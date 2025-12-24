import { httpClient } from "@/srs/lib/apiClient/httpClient";
import {AssetType_TypesInput, AssetTypesApiResponse} from "@/srs/types/assetType-Types";

export const assetTypesApi = {
    getAll: () =>
        httpClient<AssetTypesApiResponse>("AssetTypes"),

    getById: (id: string) =>
        httpClient<AssetTypesApiResponse>(`AssetTypes/${id}`),

    create: (payload: AssetType_TypesInput) =>
        httpClient<AssetTypesApiResponse>("AssetTypes", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: AssetType_TypesInput) =>
        httpClient<AssetTypesApiResponse>(`AssetTypes/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`AssetTypes/${id}`, {
            method: "DELETE"
        })
}