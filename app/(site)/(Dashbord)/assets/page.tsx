import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin"
import { GenerateSlug } from "@/srs/utils/slug"
import AssetsPageClient from "@/srs/components/ClientPages/assets-page";

const pageTitle = "Asset"
const slug = GenerateSlug(pageTitle)

export default async function AssetsPage() {
    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" })
    const data = await res.json()

    return (
        <AssetsPageClient
            assets={data?.assets ?? null}
            pageTitle={pageTitle}
            slug={slug}
            baseUrl={baseUrl}
        />
    )
}