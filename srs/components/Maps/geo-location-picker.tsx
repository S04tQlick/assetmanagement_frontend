'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

interface GeolocationPickerProps {
    lat: number
    lng: number
    readOnly?: boolean
}

export default function GeolocationPicker({ lat, lng, readOnly = true }: GeolocationPickerProps) {
    const position: [number, number] = [lat, lng]
    const [L, setL] = useState<{ icon: typeof import('leaflet').icon } | null>(null)
    
    useEffect(() => {
        import('leaflet').then((leaflet) => {
            setL(leaflet)
        })
    }, [])

    if (!L) return null

    return (
        <MapContainer center={position} zoom={13} style={{ height: '250px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
                position={position}
                draggable={!readOnly}
                icon={L.icon({ iconUrl: '/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
            />
        </MapContainer>
    )
}