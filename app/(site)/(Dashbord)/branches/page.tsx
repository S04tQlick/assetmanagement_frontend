import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin";
import {GenerateSlug} from "@/srs/utils/slug";
import BranchesPageClient from "@/srs/components/ClientPages/branches-page"; 

const pageTitle = "Branch";
const logoTitle = "File Upload";
const slug =  GenerateSlug(pageTitle);
const logoSlug =  GenerateSlug(logoTitle);

export default async function BranchesPage() {
    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" })
    const data = await res.json()

    return (
        <BranchesPageClient
            branches={data?.branches ?? null}
            pageTitle={pageTitle}
            baseUrl={baseUrl}
            slug={slug}
            logoSlug={logoSlug}
        />
    )
} 