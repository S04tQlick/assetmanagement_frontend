import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin"
import { GenerateSlug } from "@/srs/utils/slug"
import AssetTypesPageClient from "@/srs/components/ClientPages/asset-types-page"; 

const pageTitle = "Asset Type"
const slug = GenerateSlug(pageTitle)

export default async function AssetTypesPage() {
    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" })
    const data = await res.json()

    return (
        <AssetTypesPageClient
            assetTypes={data?.assetTypes ?? null}
            pageTitle={pageTitle}
            baseUrl={baseUrl}
            slug={slug}
        />
    )
}