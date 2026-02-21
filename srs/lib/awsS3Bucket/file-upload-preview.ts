import {FileUpload_Types} from "@/srs/types/file-upload.types";

export const FileUploadPreview = ( item: FileUpload_Types | undefined, slug: string ) => 
    item?.id ? `/api/${slug}/${item.id}` : "/holder.png";