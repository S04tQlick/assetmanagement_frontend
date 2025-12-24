import Link from 'next/link'
import {getSiteOrigin} from "@/srs/lib/siteProtocol/site-origin"; 
import {GenerateSlug} from "@/srs/utils/slug";
import {AssetCategory_Types} from "@/srs/types/assetCategory-Types";
import { Vendor_Types } from "@/srs/types/vendor-Types";

const pageTitle = 'Vendor'
const slug =  GenerateSlug(pageTitle);

export default async function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
    const baseUrl = await getSiteOrigin();
    const res = await fetch(`${baseUrl}/api/${slug}/${id}`, {
        cache: 'no-cache',
    })
    
    if (!res.ok) {
        return <p className="text-red-600">{pageTitle} not found.</p>
    }

    const {success, vendor}: { success: boolean; vendor?: Vendor_Types } = await res.json()

    if (!success || !vendor) {
        return <p className="text-red-600">{pageTitle} not found.</p>
    }

    return (
        <div className="max-w-3xl mx-auto py-8 space-y-6">
            <nav className="text-sm text-gray-500 space-x-2">
                <Link href={`/${slug}`} className="hover:underline text-blue-600">{slug}</Link>
                <span>/</span>
                <span>{vendor.vendorsName}</span>
            </nav>

            <Link
                href={`/${slug}`}
                className="inline-block text-sm text-blue-600 hover:text-pink-800"
            >
                ← Back to list
            </Link>

            <h1 className="text-3xl font-semibold">{vendor.vendorsName}</h1>
            <div>
                <ul className="space-y-2 text-lg">
                    <li><strong>ID:</strong> {vendor.id}</li>
                    {vendor.emailAddress && (
                        <li>
                            <strong>Email:</strong> {vendor.emailAddress}
                        </li>
                    )}
                    {vendor.contactInfo && (
                        <li>
                            <strong>contactInfo:</strong> {vendor.contactInfo}
                        </li>
                    )} 
                    {vendor.institutionId && (
                        <li>
                            <strong>Institutions:</strong> {vendor.institutions.institutionName}
                        </li>
                    )}
                </ul>
            </div>
            <div className="mt-6 flex gap-4">
                <Link href={`/${slug}/${vendor.id}/edit`} className="text-blue-600 underline hover:text-pink-800">
                    Edit
                </Link>
            </div>

        </div>
    )
}