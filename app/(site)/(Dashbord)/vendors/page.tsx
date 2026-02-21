import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin";
import {GenerateSlug} from "@/srs/utils/slug";
import VendorsPageClient from "@/srs/components/ClientPages/vendors-page";

const pageTitle = "Vendor";
const slug =  GenerateSlug(pageTitle); 

export default async function VendorsPage() {
    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" })
    const data = await res.json()

    return (
        <VendorsPageClient
            vendors={data?.vendors ?? null}
            pageTitle={pageTitle}
            slug={slug}
            baseUrl={baseUrl}
        />
    )
}