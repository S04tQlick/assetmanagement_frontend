"use client";

import { useState, useCallback } from "react";
import { HandleApiResponse } from "@/srs/utils/handle-api-response";

export interface UseCrudDeleteOptions {
    slug: string;
    pageTitle: string;
    showError: (msg: string) => void;
    showSuccess: (msg: string) => void;

    softDelete?: boolean; 
    customEndpoint?: (id: string | number) => string;
}

interface DeleteOptions {
    silent?: boolean; 
}

export function useCrudDelete(
    {
        slug,
        pageTitle,
        showError,
        showSuccess,
        softDelete = false,
        customEndpoint,
    }: UseCrudDeleteOptions) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteById = useCallback(
        async (
            id?: string | number,
            options?: DeleteOptions
        ): Promise<boolean> => {
            if (!id) {
                const message = "Invalid ID";
                setError(message);
                if (!options?.silent) showError(message);
                return false;
            }

            setLoading(true);
            setError(null);

            try {
                const endpoint =
                    customEndpoint?.(id) ?? `/api/${slug}/${id}`;

                const response = await fetch(endpoint, {
                    method: softDelete ? "PATCH" : "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: softDelete
                        ? JSON.stringify({isDeleted: true})
                        : undefined,
                });

                const data = await response.json().catch(() => null);

                const ok = HandleApiResponse({
                    response,
                    data,
                    action: "delete",
                    pageTitle,
                    showError: options?.silent ? () => {
                    } : showError,
                    showSuccess: options?.silent ? () => {
                    } : showSuccess,
                });

                if (!ok) {
                    setError(data?.message ?? "Delete failed");
                }

                return ok;
            } catch (err: any) {
                const message = err?.message ?? "Network error";
                setError(message);
                if (!options?.silent) showError(message);
                return false;
            } finally {
                setLoading(false);
            }
        },
        [
            slug,
            pageTitle,
            showError,
            showSuccess,
            softDelete,
            customEndpoint,
        ]
    );

    return {
        loading,
        error,
        deleteById,
    }
}