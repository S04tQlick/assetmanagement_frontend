import { httpClient } from "@/srs/lib/apiClient/http-client";
import {
    FileUpload_Types,
    FileUploadCreatePayload,
    FileUploadsApiResponse,
    FileUploadUpdatePayload
} from "@/srs/types/file-upload.types";
import {httpClientBinary} from "@/srs/lib/apiClient/http-client-binary";

export const fileUploadsApi = {
    getAll: () =>
        httpClient<FileUploadsApiResponse>("/FileUpload"),

    preview: (id: string) =>
        httpClientBinary(`/FileUpload/preview/${id}`),

    getById: (id: string) =>
        httpClient<FileUploadsApiResponse>(`/FileUpload/${id}`),

    create: (payload: FileUploadCreatePayload) => {
        const formData = new FormData();
        formData.append("institutionId", payload.institutionId);
        formData.append("isLogo", String(payload.isLogo));
        formData.append("file", payload.file);

        return httpClient<FileUploadsApiResponse>("/FileUpload", {
            method: "POST",
            body: formData
        });
    },

    update: (id: string, payload: FileUploadUpdatePayload) => {
        const formData = new FormData();
        formData.append("institutionId", payload.institutionId);
        formData.append("isLogo", String(payload.isLogo));
        if (payload.file) {
            formData.append("file", payload.file);
        }
        return httpClient<FileUploadsApiResponse>(`/FileUpload/${id}`, {
            method: "PUT", 
            body: formData,
        });
    },

    delete: (id: string) =>
        httpClient<void>(`/FileUpload/${id}`, {
            method: "DELETE"
        })
}
