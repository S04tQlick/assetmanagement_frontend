"use client"

import { Dispatch, SetStateAction, useCallback } from "react"

interface UseCrudFormSuccessOptions<T extends { id?: string | number }> {
    setItems: Dispatch<SetStateAction<T[]>>
    setEditOpen: (open: boolean) => void
    setViewOpen?: (open: boolean) => void
    selectedId?: string | number | null
    setSelected?: (item: T | null) => void
}

export function useCrudFormSuccess<T extends { id?: string | number }>(
    {
        setItems,
        setEditOpen,
        setViewOpen,
        selectedId,
        setSelected,
    }: UseCrudFormSuccessOptions<T>
) {

    return useCallback(
        (updated: T) => {
            setItems(prev => {
                const exists = prev.some(i => i.id === updated.id)

                if (exists) {
                    return prev.map(i =>
                        i.id === updated.id ? updated : i
                    )
                }

                return [...prev, updated]
            })

            setEditOpen(false)

            if (selectedId && selectedId === updated.id) {
                setSelected?.(updated)
            } else {
                setViewOpen?.(false)
                setSelected?.(null)
            }
        },
        [setItems, setEditOpen, setViewOpen, setSelected, selectedId]
    )
}