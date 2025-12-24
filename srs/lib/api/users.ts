import {httpClient} from "@/srs/lib/apiClient/httpClient";
import {User_TypesInput, UsersApiResponse } from "@/srs/types/user-Types";

export const usersApi = {
    getAll: () =>
        httpClient<UsersApiResponse>("/Users"),

    getById: (id: string) =>
        httpClient<UsersApiResponse>(`/Users/${id}`),

    create: (payload: User_TypesInput) =>
        httpClient<UsersApiResponse>("/Users", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: User_TypesInput) =>
        httpClient<UsersApiResponse>(`/Users/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/Users/${id}`, {
            method: "DELETE"
        })
}