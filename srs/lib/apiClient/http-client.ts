export type ApiResult<T> = | { success: true; data: T } | { success: false; error: string; status?: number };

export async function httpClient<T>(url: string, options: RequestInit = {}): Promise<ApiResult<T>> {
    try {
        const isFormData = options.body instanceof FormData;

        const res = await fetch(`${process.env.API_BASE_URL}${url}`, {
            ...options,
            headers: isFormData
                ? undefined
                : {
                    "Content-Type": "application/json",
                    ...(options.headers || {})
                },
            cache: "no-store"
        });
 
        const text = await res.text(); 

        const tryParse = () => {
            try {
                return text ? JSON.parse(text) : null;
            } catch {
                return text || null;
            }
        };

        const parsed = tryParse();

        if (!res.ok) {
            return {
                success: false,
                error: parsed?.message || parsed || `Request failed with status ${res.status}`,
                status: res.status
            };
        }

        return {
            success: true,
            data: parsed as T
        };

    } catch (err) {
        return { success: false, error: String(err) };
    }
}