import {httpClient} from "@/srs/lib/apiClient/http-client";
import {Institution_TypesInput, InstitutionsApiResponse} from "@/srs/types/institution.types";

export const institutionsApi = {
    getAll: () =>
        httpClient<InstitutionsApiResponse>("/Institutions"),

    getById: (id: string) =>
        httpClient<InstitutionsApiResponse>(`/Institutions/${id}`),

    create: (payload: Institution_TypesInput) =>
        httpClient<InstitutionsApiResponse>("/Institutions", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: Institution_TypesInput) =>
        httpClient<InstitutionsApiResponse>(`/Institutions/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/Institutions/${id}`, {
            method: "DELETE"
        })
}
