import {GenerateSlug} from "@/srs/utils/slug";
import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin";
import {Asset_Types} from "@/srs/types/asset-Types";
import Link from "next/link";
import {AssetsList} from "@/srs/components/Forms/ListForms/AssetsList";

const pageTitle = 'Asset'
const slug = GenerateSlug(pageTitle)

export default async function AssetsPage()
{
    const baseUrl = await getSiteOrigin();
    const res = await fetch(`${baseUrl}/api/${slug}`, {cache: "no-store"});
    const {success, assets}: { success: boolean; assets: Asset_Types[] } = await res.json();
    
    
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
                <Link href={`/${slug}/new`} className="text-blue-600 hover:underline">
                    Add New
                </Link>
            </div>

            {!success ? (<p className="text-red-600">Failed to load {pageTitle}.</p>) :
                (assets.length === 0 ? (
                    <p>No {pageTitle} found.</p>
                ) : (
                    <AssetsList assets={assets} slug={slug}/>
                ))
            }
        </>
    )
}