'use client'

import { useEffect, useRef } from 'react'
import type L from "leaflet"
import 'leaflet/dist/leaflet.css'

interface LeafletMapProps {
    lat: number
    lng: number
    readOnly?: boolean
    markerIcon?: L.Icon
    onLocationChange?: (lat: number, lng: number) => void
}

const LeafletMap = ({ lat, lng, readOnly = true, markerIcon, onLocationChange }: LeafletMapProps) => {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const mapInstance = useRef<any>(null)

    useEffect(() => {
        if (typeof window === "undefined") return

        // Dynamically require Leaflet to prevent SSR crash
        const L = require("leaflet") as typeof import("leaflet")

        // Prevent re-initialization
        if (mapInstance.current) return

        mapInstance.current = L.map(mapRef.current!, {
            center: [lat, lng],
            zoom: 13,
            zoomControl: true,
            attributionControl: false,
        })

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapInstance.current)

        const marker = L.marker([lat, lng], {
            icon: markerIcon,
            draggable: !readOnly,
        }).addTo(mapInstance.current)

        if (!readOnly && onLocationChange) {
            marker.on("dragend", () => {
                const { lat, lng } = marker.getLatLng()
                onLocationChange(lat, lng)
            })
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove()  // <-- cleanup is a void
                mapInstance.current = null
            }
        }
    }, [lat, lng, readOnly, markerIcon, onLocationChange])

    return <div ref={mapRef} id="map" className="h-96 w-full rounded border"/>
}

export default LeafletMap
















// 'use client'
//
// import { useEffect } from 'react'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
//
// interface LeafletMapProps {
//     lat: number
//     lng: number
//     readOnly?: boolean
//     markerIcon?: L.Icon
//     onLocationChange?: (lat: number, lng: number) => void
// }
//
// const LeafletMap = ({ lat, lng, readOnly = true, markerIcon, onLocationChange }: LeafletMapProps ) => {
//     useEffect(() => {
//         const map = L.map('map', {
//             center: [lat, lng],
//             zoom: 13,
//             zoomControl: true,
//             attributionControl: false,
//         })
//
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; OpenStreetMap contributors',
//         }).addTo(map)
//
//         const marker = L.marker([lat, lng], {
//             icon: markerIcon,
//             draggable: !readOnly,
//         }).addTo(map)
//
//         if (!readOnly && onLocationChange) {
//             marker.on('dragend', () => {
//                 const {lat, lng} = marker.getLatLng()
//                 onLocationChange(lat, lng)
//             })
//         }
//
//         return () => {
//             map.remove()
//         }
//     }, [lat, lng, readOnly, markerIcon, onLocationChange])
//
//     return <div id="map" className="h-96 w-full rounded border"/>
// }
//
// export default LeafletMap