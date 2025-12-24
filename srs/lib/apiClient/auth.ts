// auth.ts
// Utilities for managing JWT access + refresh tokens

// --- Storage Keys ---
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// --- Getters ---
export function getAccessToken(): string | null {
    if (typeof window === "undefined") return null; // SSR safety
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// --- Setters ---
export function setTokens(accessToken: string, refreshToken?: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
}

// --- Clear ---
export function clearTokens(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// --- Refresh Logic ---
export async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
        // Call your backend refresh endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
            throw new Error("Refresh request failed");
        }

        const data: { accessToken: string; refreshToken?: string } = await res.json();

        // Persist new tokens
        setTokens(data.accessToken, data.refreshToken);

        return data.accessToken;
    } catch (err) {
        console.error("Token refresh error:", err);
        clearTokens();
        return null;
    }
}
