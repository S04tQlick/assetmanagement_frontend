import {httpClient} from "@/srs/lib/apiClient/httpClient";
import {UserRolesApiResponse, UserRole_TypesInput} from "@/srs/types/userRole-Types";

export const userRolesApi = {
    getAll: () =>
        httpClient<UserRolesApiResponse>("/UserRoles"),

    getById: (id: string) =>
        httpClient<UserRolesApiResponse>(`/UserRoles/${id}`),

    create: (payload: UserRole_TypesInput) =>
        httpClient<UserRolesApiResponse>("/UserRoles", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: UserRole_TypesInput) =>
        httpClient<UserRolesApiResponse>(`/UserRoles/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/UserRoles/${id}`, {
            method: "DELETE"
        })
}