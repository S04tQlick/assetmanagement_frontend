import {ApiResponse} from "@/srs/utils/api-response";

export type Image_Types = {
    logoSanityId: string,
    logoUrl: string,
}

export type ImagesApiResponse = ApiResponse<Image_Types> 