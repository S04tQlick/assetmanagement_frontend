import {ApiResponse} from "@/srs/utils/api-response";

export type FileUpload_Types = {
    id?: string;
    s3Key?: string;
    institutionId: string;
    isLogo?: boolean; 
};

export type FileUploadCreatePayload = { 
    institutionId: string; 
    isLogo: boolean; 
    file: File; 
};

export type FileUploadUpdatePayload = {
    institutionId: string; 
    isLogo: boolean; 
    file?: File | null;
}

export type FileUploadsApiResponse = ApiResponse<FileUpload_Types>
