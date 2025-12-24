// import { getSiteOrigin } from "@/srs/lib/siteProtocol/site-origin"
// import { AssetType_Types } from "@/srs/types/assetType-Types"
// import { GenerateSlug } from "@/srs/utils/slug"
// import EditAssetTypeClient from "./EditAssetTypeClient"
//
// const pageTitle = "Asset Type"
// const slug = GenerateSlug(pageTitle)
//
// export default async function EditAssetTypePage({params}: { params: Promise<{ id: string }> }) {
//     const { id } = await params
//
//     const baseUrl = await getSiteOrigin()
//     const res = await fetch(`${baseUrl}/api/${slug}/${id}`, { cache: "no-store" })
//
//     if (!res.ok) {
//         return <p className="text-red-600">{pageTitle} not found.</p>
//     }
//
//     const {
//         success,
//         assetType
//     }: { success: boolean; assetType: AssetType_Types } = await res.json()
//
//     if (!success || !assetType) {
//         return <p className="text-red-600">{pageTitle} not found.</p>
//     }
//
//     return (
//         <EditAssetTypeClient
//             pageTitle={pageTitle}
//             slug={slug}
//             assetType={assetType}
//         />
//     )
// }


















import Link from 'next/link'
import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin";
import {AssetType_Types} from "@/srs/types/assetType-Types";
import {GenerateSlug} from "@/srs/utils/slug";

const pageTitle = 'Asset Type'
const slug =  GenerateSlug(pageTitle);

export default async function AssetTypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
    const baseUrl = await getSiteOrigin();
    const res = await fetch(`${baseUrl}/api/${slug}/${id}`, {
        cache: 'no-cache',
    })

    if (!res.ok) {
        return <p className="text-red-600">{pageTitle} not found.</p>
    }

    const {success, assetType}: { success: boolean; assetType?: AssetType_Types } = await res.json()

    if (!success || !assetType) {
        return <p className="text-red-600">{pageTitle} not found.</p>
    }

    return (
        <div className="max-w-3xl mx-auto py-8 space-y-6">
            <nav className="text-sm text-gray-500 space-x-2">
                <Link href={`/${slug}`} className="hover:underline text-blue-600">{slug}</Link>
                <span>/</span>
                <span>{assetType.assetTypeName}</span>
            </nav>

            <Link
                href={`/${slug}`}
                className="inline-block text-sm text-blue-600 hover:text-pink-800"
            >
                ← Back to list
            </Link>

            <h1 className="text-3xl font-semibold">{assetType.assetTypeName}</h1>
            <div>
                <ul className="space-y-2 text-lg">
                    <li><strong>ID:</strong> {assetType.id}</li>
                    {assetType.description && (
                        <li>
                            <strong>Description:</strong> {assetType.description}
                        </li>
                    )}
                </ul>
            </div>
            <div className="mt-6 flex gap-4">
                <Link href={`/${slug}/${assetType.id}/edit`} className="text-blue-600 underline hover:text-pink-800">
                    Edit
                </Link>
            </div>

        </div>
    )
}