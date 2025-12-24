import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin"
import { AssetType_Types } from "@/srs/types/assetType-Types"
import { GenerateSlug } from "@/srs/utils/slug"
import EditAssetTypeClient from "../EditAssetTypeClient"

const pageTitle = "Asset Type"
const slug = GenerateSlug(pageTitle)

export default async function EditAssetTypePage({params}: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}/${id}`, { cache: "no-store" })

    if (!res.ok) {
        return <p className="text-red-600">{pageTitle} not found.</p>
    }

    const {
        success,
        assetType
    }: { success: boolean; assetType: AssetType_Types } = await res.json()

    if (!success || !assetType) {
        return <p className="text-red-600">{pageTitle} not found.</p>
    }

    return (
        <EditAssetTypeClient
            pageTitle={pageTitle}
            slug={slug}
            assetType={assetType}
        />
    )
}







// import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin";
// import {AssetType_Types} from "@/srs/types/assetType-Types";
// import {AssetTypeForm} from "@/srs/components/Forms/DataForms/AssetTypeForm";
// import {GenerateSlug} from "@/srs/utils/slug";
//
//
// const pageTitle = 'Asset Type';
// const slug =  GenerateSlug(pageTitle) 
// export default async function EditAssetTypePage({ params }: { params: Promise<{ id: string }> }) {
//     const { id } = await params
//    
//     const baseUrl = await getSiteOrigin();
//     const res = await fetch(`${baseUrl}/api/${slug}/${id}`, { cache: "no-store" });
//
//     if (!res.ok) {
//         return <p className="text-red-600">{pageTitle} not found.</p>;
//     }
//    
//     const { success, assetType }: { success: boolean; assetType: AssetType_Types } = await res.json();
//
//     if (!success || !assetType) {
//         return <p className="text-red-600">{pageTitle} not found.</p>;
//     }
//
//     return (
//         <div>
//             <h1>Edit {pageTitle}</h1>
//             {!success || !assetType ? (
//                 <p className="text-red-600">{pageTitle} not found.</p>
//                 ):(
//                 <AssetTypeForm 
//                     pageTitle={pageTitle} 
//                     slug={slug}  
//                     initialData={assetType} 
//                 />
//             )}
//         </div>
//     )
// }