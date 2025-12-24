import {httpClient} from "@/srs/lib/apiClient/httpClient";
import {Branch_TypesInput, BranchesApiResponse } from "@/srs/types/branch-Types";

export const branchesApi = {
    getAll: () =>
        httpClient<BranchesApiResponse>("/Branches"),

    getById: (id: string) =>
        httpClient<BranchesApiResponse>(`/Branches/${id}`),

    create: (payload: Branch_TypesInput) =>
        httpClient<BranchesApiResponse>("/Branches", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: Branch_TypesInput) =>
        httpClient<BranchesApiResponse>(`/Branches/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/Branches/${id}`, {
            method: "DELETE"
        })
}
