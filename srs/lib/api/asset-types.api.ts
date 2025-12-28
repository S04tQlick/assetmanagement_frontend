import {AssetType_Types, AssetTypesApiResponse} from "@/srs/types/asset-type.types";
import {httpClient} from "@/srs/lib/apiClient/http-client";

export const assetTypesApi = {
    getAll: () =>
        httpClient<AssetTypesApiResponse>("/AssetTypes"),

    getById: (id: string) =>
        httpClient<AssetTypesApiResponse>(`/AssetTypes/${id}`),

    create: (payload: AssetType_Types) =>
        httpClient<AssetTypesApiResponse>("/AssetTypes", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: AssetType_Types) =>
        httpClient<AssetTypesApiResponse>(`/AssetTypes/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/AssetTypes/${id}`, {
            method: "DELETE"
        })
}