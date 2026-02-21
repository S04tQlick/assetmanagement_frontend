import {FileUpload_Types} from "@/srs/types/file-upload.types";
import {ApiResponse} from "@/srs/utils/api-response";

export type Institution_Types = {
    id?: string,
    institutionName: string,
    institutionEmail: string,
    institutionContactNumber: string,
    primaryColor: string,
    secondaryColor: string,
    fileUploads?: FileUpload_Types[];
}

export type InstitutionsApiResponse = ApiResponse<Institution_Types>

// logoSanityId?: string,
// logoUrl?: string,