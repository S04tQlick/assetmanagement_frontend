import {httpClient} from "@/srs/lib/apiClient/httpClient";
import {AssetCategoriesApiResponse, AssetCategory_TypesInput} from "@/srs/types/assetCategory-Types";

export const assetCategoriesApi = {
    getAll: () =>
        httpClient<AssetCategoriesApiResponse>("/AssetCategories"),

    getById: (id: string) =>
        httpClient<AssetCategoriesApiResponse>(`/AssetCategories/${id}`),

    create: (payload: AssetCategory_TypesInput) =>
        httpClient<AssetCategoriesApiResponse>("/AssetCategories", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: AssetCategory_TypesInput) =>
        httpClient<AssetCategoriesApiResponse>(`/AssetCategories/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/AssetCategories/${id}`, {
            method: "DELETE"
        })
}