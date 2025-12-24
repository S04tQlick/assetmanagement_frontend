import Link from 'next/link'
import {Asset_Types} from "@/srs/types/asset-Types";

interface ListProps {
    slug: string;
    assets: Asset_Types[]
}

export const AssetsList = ({slug, assets }: ListProps) => {
    return (
        <ul className="space-y-6">
            {assets.map((item) => (
                <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-medium">{item.assetName}</h2>
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
