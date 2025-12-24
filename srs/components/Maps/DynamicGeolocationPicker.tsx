'use client'

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { createInstitutionIcon } from "@/srs/utils/createInstitutionIcon"
import type { Icon } from "leaflet"

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false })

interface Props {
    logo: string
    lat: number
    lng: number
    readOnly?: boolean
    markerIcon?: Icon
    onLocationChange?: (lat: number, lng: number) => void
}

export const DynamicGeolocationPicker = ({logo, lat, lng, readOnly = true, onLocationChange}: Props) => {

    const [icon, setIcon] = useState<Icon | null>(null)
 
    useEffect(() => {
        const i = createInstitutionIcon(logo)
        setIcon(i)
    }, [logo])
 
    if (typeof window === "undefined" || !icon) return null

    return (
        <LeafletMap
            lat={lat}
            lng={lng}
            readOnly={readOnly}
            markerIcon={icon}
            onLocationChange={onLocationChange}
        />
    )
}

export default DynamicGeolocationPicker