import {httpClient} from "@/srs/lib/apiClient/http-client";
import {Address_TypesInput, AddressesApiResponse } from "@/srs/types/address.types";
import {Image_Types, ImagesApiResponse} from "@/srs/types/image.types";

export const imagesApi = {
    getAll: () =>
        httpClient<ImagesApiResponse>("/Images"),

    getById: (id: string) =>
        httpClient<ImagesApiResponse>(`/Images/${id}`),

    create: (payload: Image_Types) =>
        httpClient<ImagesApiResponse>("/Images/upload-image", {
            method: "POST",
            body: JSON.stringify(payload)
        }),

    update: (id: string, payload: Image_Types) =>
        httpClient<ImagesApiResponse>(`/Images/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        }),

    delete: (id: string) =>
        httpClient<void>(`/Images/${id}`, {
            method: "DELETE"
        })
}
