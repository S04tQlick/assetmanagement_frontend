export type ApiResult<T> = | { success: true; data: T } | { success: false; error: string; status?: number }

export async function httpClient<T>(url: string, options: RequestInit = {}): Promise<ApiResult<T>> {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            cache: "no-store"
        })

        if (!res.ok) {
            return {
                success: false,
                error: `Request failed with status ${res.status}`,
                status: res.status
            }
        }

        const json = (await res.json()) as T

        return { success: true, data: json }
    } catch (err) {
        return { success: false, error: String(err) }
    }
}
