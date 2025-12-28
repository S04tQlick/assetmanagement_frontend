export type UploadImageResponse_Types = {
    success: boolean;
    message: string;
    data: {
        document: SanityImageDocument;
    };
    error?: string;
}


export interface SanityImageDocument {
    _id: string;
    _type: string;
    url: string;
    originalFilename: string;
    size: number;
    mimeType: string;
}