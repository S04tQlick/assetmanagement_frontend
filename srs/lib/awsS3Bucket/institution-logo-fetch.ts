import {Institution_Types} from "@/srs/types/institution.types";


export const InstitutionLogoFetch = ( item: Institution_Types | undefined, logoSlug: string ) =>
    item?.fileUploads?.[0]?.id ? `/api/${logoSlug}/${item.fileUploads[0].id}` : "/holder.png";


