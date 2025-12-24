import Link from 'next/link'
import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin"; 
import {GenerateSlug} from "@/srs/utils/slug";
import {Asset_Types} from "@/srs/types/asset-Types";

const pageTitle = 'Asset'
const slug =  GenerateSlug(pageTitle);

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
    const baseUrl = await getSiteOrigin();
    const res = await fetch(`${baseUrl}/api/${slug}/${id}`, {
        cache: 'no-cache',
    })
    
    if (!res.ok) {
        return <p className="text-red-600">{pageTitle} not found.</p>
    }

    const {success, asset}: { success: boolean; asset?: Asset_Types } = await res.json()

    if (!success || !asset) {
        return <p className="text-red-600">{pageTitle} not found.</p>
    }

    return (
        <div className="max-w-3xl mx-auto py-8 space-y-6">
            <nav className="text-sm text-gray-500 space-x-2">
                <Link href={`/${slug}`} className="hover:underline text-blue-600">{slug}</Link>
                <span>/</span>
                <span>{asset.assetName}</span>
            </nav>

            <Link
                href={`/${slug}`}
                className="inline-block text-sm text-blue-600 hover:text-pink-800"
            >
                ← Back to list
            </Link>

            <h1 className="text-3xl font-semibold">{asset.assetName}</h1>
            <div>
                <ul className="space-y-2 text-lg">
                    <li><strong>ID:</strong> {asset.id}</li>
                    {asset.assetName && (
                        <li>
                            <strong>Asset:</strong> {asset.assetName}
                        </li>
                    )}
                    {asset.assetTypes.id && (
                        <li>
                            <strong>Asset Type:</strong> {asset.assetTypes.assetTypeName}
                        </li>
                    )}
                    {asset.assetCategories.id && (
                        <li>
                            <strong>AssetCategory:</strong> {asset.assetCategories.assetCategoryName}
                        </li>
                    )}
                    {asset.serialNumber && (
                        <li>
                            <strong>serialNumber:</strong> {asset.serialNumber}
                        </li>
                    )}
                    {asset.purchaseDate && (
                        <li>
                            <strong>purchaseDate:</strong> {asset.purchaseDate.toLocaleString()}
                        </li>
                    )}
                    {asset.purchasePrice && (
                        <li>
                            <strong>purchasePrice:</strong> {Number(asset.purchasePrice)}
                        </li>
                    )}
                    {asset.usefulLifeYears && (
                        <li>
                            <strong>usefulLifeYears:</strong> {Number(asset.usefulLifeYears)}
                        </li>
                    )}
                    {asset.unitsTotal && (
                        <li>
                            <strong>unitsTotal:</strong> {Number(asset.unitsTotal)}
                        </li>
                    )}
                    {asset.currentUnits && (
                        <li>
                            <strong>currentUnits:</strong> {Number(asset.currentUnits)}
                        </li>
                    )}
                    {asset.maintenanceDueDate && (
                        <li>
                            <strong>maintenanceDueDate:</strong> {asset.maintenanceDueDate.toLocaleString()}
                        </li>
                    )}
                    {asset.salvageValue && (
                        <li>
                            <strong>salvageValue:</strong> {Number(asset.salvageValue)}
                        </li>
                    )}
                    {asset.depreciationMethod && (
                        <li>
                            <strong>depreciationMethod:</strong> {asset.depreciationMethod}
                        </li>
                    )}
                    {asset.currentValue && (
                        <li>
                            <strong>currentValue:</strong> {Number(asset.currentValue)}
                        </li>
                    )}
                    {asset.accumulatedDepreciation && (
                        <li>
                            <strong>accumulatedDepreciation:</strong> {Number(asset.accumulatedDepreciation)}
                        </li>
                    )}
                    {asset.nextMaintenanceDate && (
                        <li>
                            <strong>nextMaintenanceDate:</strong> {asset.nextMaintenanceDate.toLocaleString()}
                        </li>
                    )}
                    {asset.vendors.id && (
                        <li>
                            <strong>Vendor:</strong> {asset.vendors.vendorsName}
                        </li>
                    )}
                    {asset.branches.id && (
                        <li>
                            <strong>Branch:</strong> {asset.branches.branchName}
                        </li>
                    )}
                    {asset.institutions.id && (
                        <li>
                            <strong>Institution:</strong> {asset.institutions.institutionName}
                        </li>
                    )}
                </ul>
            </div>
            <div className="mt-6 flex gap-4">
                <Link href={`/${slug}/${asset.id}/edit`} className="text-blue-600 underline hover:text-pink-800">
                    Edit
                </Link>
            </div>

        </div>
    )
}

// <li className="text-sm text-gray-500">
//     <strong>Description:</strong> {assetType.description}
// </li>
// <div className="max-w-2xl mx-auto p-6">
//     <h1 className="text-2xl font-bold mb-4">{assetType.assetTypeName}</h1>
//
//     <ul className="space-y-2 text-lg">
//         <li><strong>ID:</strong> {assetType.id}</li>
//         {assetType.description && <li><strong>Description:</strong> {assetType.description}</li>}
//     </ul>
//
//     <div className="mt-6 flex gap-4">
//         <Link href={`/asset-types/${assetType.id}/edit`} className="text-blue-600 underline">
//             Edit
//         </Link>
//         <Link href="/asset-types" className="text-gray-600 underline">
//             Back to list
//         </Link>
//     </div>
// </div>