// 'use client'
//
// import { useState } from 'react'
// import dynamic from 'next/dynamic'
// import { Branch } from '@/sanity/types/branchType'
//
// const NearbyBranchesMap = dynamic(() => import('./NearbyBranchesMap'), { ssr: false })
//
// interface Props {
//     center: { lat: number; lng: number }
//     branches: Branch[]
// }
//
// export default function NearbyBranchesMapWrapper({ center, branches }: Props) {
//     const [showNearby, setShowNearby] = useState(true)
//
//     return (
//         <div className="space-y-4">
//             <button
//                 onClick={() => setShowNearby((prev) => !prev)}
//                 className="text-sm text-blue-600 underline"
//             >
//                 {showNearby ? 'Hide nearby branches' : 'Show nearby branches'}
//             </button>
//
//             {showNearby && <NearbyBranchesMap center={center} branches={branches} />}
//         </div>
//     )
// }
