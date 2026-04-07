"use client"

import React, { useCallback, useState, useRef } from "react"
import { Button } from "@/srs/components/common/button"
import { Institution_Types } from "@/srs/types/institution.types"
import { InstitutionLogoFetch } from "@/srs/lib/awsS3Bucket/institution-logo-fetch"
import InstitutionDetailClient from "@/srs/components/Forms/DetailsForms/institution-details"
import { InstitutionForm } from "@/srs/components/Forms/DataForms/institution-form"
import { DeleteConfirmModal } from "@/srs/components/ui-components/modal-component/delete-confirm-modal"
import { useCrudDelete } from "@/srs/hooks/use-crud-delete"
import { useToastError } from "@/srs/hooks/use-toast-error"
import { useToastSuccess } from "@/srs/hooks/use-toast-success" 
import { DeleteModal } from "@/srs/components/ui-components/modal-component/delete-modal"
import {EditModal} from "@/srs/components/ui-components/modal-component/edit-modal"
import { ViewModal } from "@/srs/components/ui-components/modal-component/view-modal"
import {useCrudFormSuccess} from "@/srs/hooks/use-crud-form-success";

interface InstitutionsListProps {
    pageTitle: string
    slug: string
    logoSlug: string
    institutions: Institution_Types[]
}

export const InstitutionsList = ({pageTitle, slug, logoSlug, institutions}: InstitutionsListProps) => {
    const [institutionsState, setInstitutionsState] = useState<Institution_Types[]>(institutions)
    const [selected, setSelected] = useState<Institution_Types | null>(null)
    const [viewOpen, setViewOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const formSubmitFnRef = useRef<(() => Promise<void>) | null>(null)

    const { showError } = useToastError()
    const { showSuccess } = useToastSuccess()

    const handleView = (item: Institution_Types) => {
        setSelected(item)
        setViewOpen(true)
    }

    const registerSubmit = useCallback((fn: () => Promise<void>) => {
        formSubmitFnRef.current = fn
    }, [])

    const handleFormSuccess = useCrudFormSuccess<Institution_Types>({
        setItems: setInstitutionsState,
        setEditOpen,
        setViewOpen,
        selectedId: selected?.id,
        setSelected,
    })

    const { loading: deleting, deleteItem } = useCrudDelete({
        slug,
        showError,
        showSuccess,
        onSuccess: () => {
            setInstitutionsState((prev) => prev.filter((i) => i.id !== selected?.id))
            setDeleteOpen(false)
            setViewOpen(false)
            setSelected(null)
        },
        router: { push: () => {} },
    })

    const handleDelete = async () => {
        if (!selected) return
        await deleteItem(selected.id!)
    }

    return (
        <>
            <ul className="space-y-4">
                {institutionsState.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center border p-4 rounded shadow-sm hover:bg-gray-100 transition"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={InstitutionLogoFetch(item, logoSlug)}
                                alt={`${item.institutionName} logo`}
                                className="h-10 w-10 rounded-full object-cover bg-gray-100"
                            />
                            <span className="font-semibold">{item.institutionName}</span>
                        </div>
                        <Button variant="success_bd" onClick={() => handleView(item)}>
                            View →
                        </Button>
                    </li>
                ))}
            </ul>

            <ViewModal
                isOpen={viewOpen}
                onClose={() => setViewOpen(false)}
                title={selected?.institutionName ?? "Institution Details"}
                onEdit={() => setEditOpen(true)}
                onDelete={() => setDeleteOpen(true)} 
                width={"2xl"}
            >
                {selected && (
                    <InstitutionDetailClient
                        institution={selected}
                        logoSlug={logoSlug}
                    />
                )}
            </ViewModal>

            <EditModal
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                entityName={selected?.institutionName}
                onSave={() => formSubmitFnRef.current?.()}
                width={"2xl"}
            >
                {selected && (
                    <InstitutionForm
                        pageTitle={pageTitle}
                        slug={slug}
                        logoSlug={logoSlug}
                        initialData={selected}
                        onSuccess={handleFormSuccess}
                        registerSubmit={registerSubmit}
                    />
                )}
            </EditModal>

            <DeleteModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                recordName={selected?.institutionName}
                onDelete={handleDelete}
                loading={deleting}
                width="sm"
                height="h-auto"
            >
                {selected && <DeleteConfirmModal recordName={selected.institutionName} />}
            </DeleteModal>
        </>
    )
}



// const handleFormSuccess = useCallback(
//    
//     (updated: Institution_Types) => {
//         setInstitutionsState((prev) => {
//             const exists = prev.some((i) => i.id === updated.id)
//             return exists
//                 ? prev.map((i) => (i.id === updated.id ? updated : i))
//                 : [...prev, updated]
//         })
//
//         setEditOpen(false)
//
//         if (selected?.id === updated.id) {
//             setSelected(updated)
//         } else {
//             setViewOpen(false)
//             setSelected(null)
//         }
//     },
//     [selected]
// )