'use client'

import { useEffect, useState } from "react";

export function useDropdowns<T extends Record<string, any>>(
    endpoints: string[],
    mapResponse: (responses: any[]) => T
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        const load = async () => {
            try {
                const res = await Promise.all(endpoints.map(e => fetch(`/api/${e}`)));
                const json = await Promise.all(res.map(r => r.json()));
                setData(mapResponse(json));
            } catch (err) {
                setError("Failed to load dropdowns");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return { data, loading, error };
}
