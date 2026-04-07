"use client";

import {useState, useRef, useCallback} from "react";
import { useCrudDelete } from "./use-crud-delete";

interface UseCrudPageOptions<T extends { id?: string | number }> {
    initialItems: T[];
    slug: string;
    pageTitle: string;
    showError: (msg: string) => void;
    showSuccess: (msg: string) => void;
}

export function useCrudPage<T extends { id?: string | number }>(
    {
        initialItems,
        slug,
        pageTitle,
        showError,
        showSuccess,
    }: UseCrudPageOptions<T>
) {

    const [items, setItems] = useState<T[]>(initialItems);
    const [selected, setSelected] = useState<T | null>(null);

    const [viewOpen, setViewOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    
    const resetModals = useCallback(() => {
        setViewOpen(false);
        setCreateOpen(false);
        setEditOpen(false);
        setDeleteOpen(false);
        setSelected(null);
    }, []);
    
    const { deleteById, loading: deleteLoading } = useCrudDelete({
        slug,
        pageTitle,
        showError,
        showSuccess,
    });

    const createSubmitRef = useRef<(() => Promise<void>) | null>(null);
    const editSubmitRef = useRef<(() => Promise<void>) | null>(null);

    const registerCreateSubmit = (fn: () => Promise<void>) => {
        createSubmitRef.current = fn;
    };

    const registerEditSubmit = (fn: () => Promise<void>) => {
        editSubmitRef.current = fn;
    };

    const openView = (item: T) => {
        setSelected(item);
        setViewOpen(true);
    };

    const openEdit = (item: T) => {
        setSelected(item);
        setEditOpen(true);
    };

    const openDelete = (item: T) => {
        setSelected(item);
        setDeleteOpen(true);
    };

    const handleCreateSuccess = (item: T) => {
        setItems(prev => [item, ...prev]);
        setCreateOpen(false);
    };

    const handleEditSuccess = (updated: T) => {
        setItems(prev =>
            prev.map(i =>
                i.id === updated.id ? { ...i, ...updated } : i
            )
        );
        
        resetModals();
    };

    const handleDelete = async () => {
        if (!selected?.id) return;

        const ok = await deleteById(selected.id);

        if (!ok) return;

        setItems(prev =>
            prev.filter(i => i.id !== selected.id)
        );
        
        resetModals();
    };

    return {
        items,
        selected,

        viewOpen,
        createOpen,
        editOpen,
        deleteOpen,

        deleteLoading,

        setViewOpen,
        setCreateOpen,
        setEditOpen,
        setDeleteOpen,

        openView,
        openEdit,
        openDelete,

        handleCreateSuccess,
        handleEditSuccess,
        handleDelete,

        registerCreateSubmit,
        registerEditSubmit,

        createSubmitRef,
        editSubmitRef,
    };
}