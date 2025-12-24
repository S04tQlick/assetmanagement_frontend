import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin"
import { GenerateSlug } from "@/srs/utils/slug"
import InstitutionsPageClient from "@/srs/components/ClientPages/institutions-page";

const pageTitle = "Institution";
const slug =  GenerateSlug(pageTitle);

export default async function InstitutionsPage() {
    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" })
    const data = await res.json()

    return (
        <InstitutionsPageClient
            institutions={data.institutions}
            pageTitle={pageTitle}
            baseUrl={baseUrl}
            slug={slug}
        />
    )
}