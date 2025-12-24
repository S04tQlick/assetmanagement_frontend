// 'use client'
//
// import { useEffect } from 'react'
// import {MapContainer, TileLayer, Popup, Tooltip, Marker} from 'react-leaflet'
// // import 'leaflet/dist/leaflet.css'
// // import 'leaflet.markercluster/dist/MarkerCluster.css'
// // import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// import { Branch } from '@/sanity/types/branchType'
// import MarkerClusterGroup from "react-leaflet-markercluster";
//
//
// interface Props {
//     center: { lat: number; lng: number }
//     branches: Branch[]
// }
//
// export default function NearbyBranchesMap({ center, branches }: Props) {
//     useEffect(() => {
//         // Dynamically import marker clustering only on client
//         import('leaflet')
//         import('leaflet.markercluster')
//     }, [])
//
//     return (
//         <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: '300px', width: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//
//             <MarkerClusterGroup>
//                 {branches.map((b) => (
//                     <Marker
//                         key={b._id}
//                         position={[b.location.lat, b.location.lng]}
//                         title={b.name}
//                     >
//                         <Popup>
//                             <strong>{b.name}</strong><br />
//                             {b.institution?.name}
//                         </Popup>
//                         <Tooltip>{b.name}</Tooltip>
//                     </Marker>
//                 ))}
//             </MarkerClusterGroup>
//         </MapContainer>
//     )
// }
