export const createInstitutionIcon = (logoUrl: string) => {
    if (typeof window === "undefined") return null

    const L = require("leaflet")

    return L.icon({
        iconUrl: logoUrl,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: "institution-marker-icon",
    })
}