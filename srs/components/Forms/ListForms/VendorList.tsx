import Link from 'next/link' 
import {Vendor_Types} from "@/srs/types/vendor-Types";

interface ListProps {
    slug: string;
    vendors: Vendor_Types[]
}

export const VendorList = ({slug, vendors }: ListProps) => {
    return (
        <ul className="space-y-6">
            {vendors.map((item) => (
                <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-medium">{item.vendorsName}</h2>
                            {item.emailAddress && (
                                <p className="text-sm text-gray-500">emailAddress: {item.emailAddress}</p>
                            )}
                            
                            {/*{item.contactInfo && (*/}
                            {/*    <p className="text-sm text-gray-500">contactInfo: {item.contactInfo}</p>*/}
                            {/*)}*/}
                            {/*{item.institutionId && (*/}
                            {/*    <p className="text-sm text-gray-500">institution: {item.institutions.institutionName}</p>*/}
                            {/*)}*/}
                            
                        </div>
                        <div className="flex gap-4">
                            <Link href={`/${slug}/${item.id}`} className="flex items-center text-green-700 border border-green-600 py-1 px-3 gap-2 rounded hover:text-pink-700 hover:border-pink-600">
                                <span>
                                    View →
                                </span> 
                            </Link> 
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}