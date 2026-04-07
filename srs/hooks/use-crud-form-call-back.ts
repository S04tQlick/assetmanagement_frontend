"use client"

import { useState, useCallback } from "react"
import { HandleApiResponse } from "@/srs/utils/handle-api-response"

interface UseCrudFormOptions<T> {
    slug: string
    logoSlug?: string
    isEdit: boolean
    initialData?: T & { id?: string | number }
    showError: (msg: string) => void
    showSuccess: (msg: string) => void
    onSuccess?: (updated: T & { id: string | number }) => void
    pageTitle: string

    file?: File
    fileFieldName?: string
    fileEntityKey?: string
}

export function useCrudCallBackForm<T extends { id?: string | number }>(
    {
        slug,
        logoSlug,
        isEdit,
        initialData,
        showError,
        showSuccess,
        onSuccess,
        pageTitle,
        file,
        fileFieldName = "File",
        fileEntityKey = "EntityId",
    }: UseCrudFormOptions<T>) {

    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const submitForm = useCallback(
        async (data: Partial<T>) => {
            setLoading(true)
            setFormError(null)

            if (!data) {
                setLoading(false)
                return null
            }

            try {
                const response = await fetch(
                    `/api/${slug}${isEdit && initialData?.id ? `/${initialData.id}` : ""}`,
                    {
                        method: isEdit ? "PUT" : "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    }
                )

                const responseData = await response.json()

                const ok = HandleApiResponse({
                    response,
                    data: responseData,
                    action: isEdit ? "update" : "create",
                    pageTitle,
                    showError,
                    showSuccess,
                })

                if (!ok) return null

                const savedEntity = responseData?.data?.data;
                
                onSuccess?.(savedEntity)

                if (file && logoSlug && savedEntity.id) {
                    const formData = new FormData()
                    formData.append(fileFieldName, file)
                    formData.append(fileEntityKey, String(savedEntity.id))

                    const fileResponse = await fetch(`/api/${logoSlug}`, {
                        method: "POST",
                        body: formData,
                    })

                    const fileData = await fileResponse.json()

                    HandleApiResponse({
                        response: fileResponse,
                        data: fileData,
                        action: "update",
                        pageTitle: `${pageTitle} File`,
                        showError,
                        showSuccess,
                    })
                }

                return savedEntity

            } catch (err: any) {
                const message = err?.message || "Something went wrong"
                setFormError(message)
                showError(message)
                return null
            } finally {
                setLoading(false)
            }
        },
        [
            slug,
            logoSlug,
            isEdit,
            initialData?.id,
            showError,
            showSuccess,
            onSuccess,
            pageTitle,
            file,
            fileFieldName,
            fileEntityKey,
        ]
    )

    return { loading, formError, submitForm }
}