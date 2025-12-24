import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin";
import {GenerateSlug} from "@/srs/utils/slug";
import {Asset_Types} from "@/srs/types/asset-Types";
import {AssetForm} from "@/srs/components/Forms/DataForms/AssetForm";


const pageTitle = 'Asset';
const slug =  GenerateSlug(pageTitle) 
export default async function EditAssetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    
    const baseUrl = await getSiteOrigin();
    const res = await fetch(`${baseUrl}/api/${slug}/${id}`, { cache: "no-store" });

    if (!res.ok) {
        return <p className="text-red-600">{pageTitle} not found.</p>;
    }

    const { success, asset }: { success: boolean; asset: Asset_Types } = await res.json();

    if (!success || !asset) {
        return <p className="text-red-600">{pageTitle} not found.</p>;
    }

    return (
        <div>
            <h1>Edit {pageTitle}</h1>
            {!success || !asset ? (
                <p className="text-red-600">{pageTitle} not found.</p>
                ):(
                <AssetForm 
                    pageTitle={pageTitle} 
                    slug={slug}  
                    initialData={asset} 
                />
            )}
        </div>
    )
}