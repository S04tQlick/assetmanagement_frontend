import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin"; 
import Link from "next/link"; 
import {GenerateSlug} from "@/srs/utils/slug";
import {Vendor_Types} from "@/srs/types/vendor-Types";
import { VendorList } from "@/srs/components/Forms/ListForms/VendorList";

const pageTitle = "Vendor";
const slug =  GenerateSlug(pageTitle);

export default async function VendorsPage() {
    const baseUrl = await getSiteOrigin();
    const res = await fetch(`${baseUrl}/api/${slug}`, {cache: "no-store"});
    const {success, vendors}: { success: boolean; vendors: Vendor_Types[] } = await res.json();

    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
                <Link href={`/${slug}/new`} className="text-blue-600 hover:underline">
                    Add New
                </Link>
            </div>

            {!success ? (<p className="text-red-600">Failed to load {pageTitle}.</p>) :
                (vendors.length === 0 ? (
                    <p>No {pageTitle} found.</p>
                ) : (
                    <VendorList vendors={vendors} slug={slug}/>
                ))
            }
        </>
    );
}