import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin"; 
import {GenerateSlug} from "@/srs/utils/slug";
import UsersPageClient from "@/srs/components/ClientPages/users-page"; 

const pageTitle = "User";
const slug =  GenerateSlug(pageTitle);

export default async function UsersPage() {
    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" })
    const data = await res.json()

    return (
        <UsersPageClient
            users={data.users}
            pageTitle={pageTitle}
            baseUrl={baseUrl}
            slug={slug}
        />
    )
}