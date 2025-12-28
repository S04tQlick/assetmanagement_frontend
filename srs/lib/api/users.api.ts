import {httpClient} from "@/srs/lib/apiClient/http-client";
import {User_Types, UsersApiResponse} from "@/srs/types/user.types";

export const usersApi = {
    getAll: () =>
        httpClient<UsersApiResponse>("/Users"),

    getById: (id: string) =>
        httpClient<UsersApiResponse>(`/Users/${id}`),

    create: (payload: User_Types) =>
        httpClient<UsersApiResponse>("/Users", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: User_Types) =>
        httpClient<UsersApiResponse>(`/Users/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/Users/${id}`, {
            method: "DELETE"
        })
}