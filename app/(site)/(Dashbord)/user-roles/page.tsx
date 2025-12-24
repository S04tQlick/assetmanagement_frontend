import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin"; 
import {GenerateSlug} from "@/srs/utils/slug";  
import UserRolesPageClient from "@/srs/components/ClientPages/user-roles-page";

const pageTitle = "User Role";
const slug =  GenerateSlug(pageTitle);

export default async function UserRolesPage() {
    const baseUrl = await getSiteOrigin()
    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" })
    const data = await res.json()

    return (
        <UserRolesPageClient
            userRoles={data?.userRoles ?? null}
            pageTitle={pageTitle}
            baseUrl={baseUrl}
            slug={slug}
        />
    )
} 