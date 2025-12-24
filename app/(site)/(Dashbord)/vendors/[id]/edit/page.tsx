import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin";
import {GenerateSlug} from "@/srs/utils/slug";
import {AssetCategory_Types} from "@/srs/types/assetCategory-Types";
import {AssetCategoryForm} from "@/srs/components/Forms/DataForms/AssetCategoryForm";
import { Vendor_Types } from "@/srs/types/vendor-Types";
import {VendorForm} from "@/srs/components/Forms/DataForms/VendorForm";


const pageTitle = 'Vendor';
const slug =  GenerateSlug(pageTitle) 
export default async function EditVendorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    
    const baseUrl = await getSiteOrigin();
    const res = await fetch(`${baseUrl}/api/${slug}/${id}`, { cache: "no-store" });

    if (!res.ok) {
        return <p className="text-red-600">{pageTitle} not found.</p>;
    }
    
    const { success, vendor }: { success: boolean; vendor: Vendor_Types } = await res.json();

    if (!success || !vendor) {
        return <p className="text-red-600">{pageTitle} not found.</p>;
    }

    return (
        <div>
            <h1>Edit {pageTitle}</h1>
            {!success || !vendor ? (
                <p className="text-red-600">{pageTitle} not found.</p>
                ):(
                <VendorForm 
                    pageTitle={pageTitle} 
                    slug={slug}  
                    initialData={vendor} 
                />
            )}
        </div>
    )
}