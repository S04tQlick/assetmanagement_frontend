// import { useState } from "react";
//
// export function useGeolocation(onSuccess: (lat: number, lng: number) => void,) {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//
//     const getLocation = () => {
//         setLoading(true);
//         setError(null);
//
//         if (!navigator.geolocation) {
//             setError("Geolocation not supported by this browser");
//             setLoading(false);
//             return;
//         }
//
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 onSuccess(latitude, longitude);
//                 setLoading(false);
//             },
//             () => {
//                 setError("Failed to retrieve location");
//                 setLoading(false);
//             }
//         );
//     };
//
//     return { getLocation, loading, error };
// }



import { useState } from 'react'

export function useGeolocation(onSuccess?: (lat: number, lng: number) => void) {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const getLocation = () => {
        setLoading(true)
        setError(null)

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.')
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                setCoords({ lat, lng })
                onSuccess?.(lat, lng)
                setLoading(false)
            },
            (err) => {
                console.error('Geolocation error:', err)
                setError('Unable to retrieve your location.')
                setLoading(false)
            }
        )
    }

    return { coords, error, loading, getLocation }
}
