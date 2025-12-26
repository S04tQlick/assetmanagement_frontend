import {httpClient} from "@/srs/lib/apiClient/httpClient";
import {Branch_TypesInput, BranchesApiResponse } from "@/srs/types/branch-Types";

export const branchesApi = {
    getAll: async () =>
        await httpClient<BranchesApiResponse>("/Branches"),

    getById: async (id: string) =>
        await httpClient<BranchesApiResponse>(`/Branches/${id}`),

    create: async (payload: Branch_TypesInput) =>
        await httpClient<BranchesApiResponse>("/Branches", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: async (id: string, payload: Branch_TypesInput) =>
        await httpClient<BranchesApiResponse>(`/Branches/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: async (id: string) =>
        await httpClient<void>(`/Branches/${id}`, {
            method: "DELETE"
        })
}
