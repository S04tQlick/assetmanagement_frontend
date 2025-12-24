import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin"
import { GenerateSlug } from "@/srs/utils/slug" 
import AssetCategoriesPageClient from "@/srs/components/ClientPages/asset-categories-page";

const pageTitle = "Asset Category"
const slug = GenerateSlug(pageTitle)

export default async function AssetCategoriesPage() {
    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" })
    const data = await res.json()
    
    return (
        <AssetCategoriesPageClient
            assetCategories={data?.assetCategories ?? null}
            pageTitle={pageTitle}
            slug={slug}
            baseUrl={baseUrl}
        />
    )
}