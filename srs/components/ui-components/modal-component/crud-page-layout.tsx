"use client";

import React, { FC } from "react";
import { useCrudPage } from "@/srs/hooks/use-crud-page";

import { PageHeader } from "@/srs/components/ui-components/layout-component/page-header";
import { ViewModal } from "@/srs/components/ui-components/modal-component/view-modal";
import { SaveModal } from "@/srs/components/ui-components/modal-component/save-modal";
import { EditModal } from "@/srs/components/ui-components/modal-component/edit-modal";
import { DeleteModal } from "@/srs/components/ui-components/modal-component/delete-modal";
import { useToastError } from "@/srs/hooks/use-toast-error";
import { useToastSuccess } from "@/srs/hooks/use-toast-success";
import { DeleteConfirmModal } from "@/srs/components/ui-components/modal-component/delete-confirm-modal";

export interface CrudPageLayoutProps<T extends { id?: string }> {
    pageTitle: string;
    slug: string;
    initialItems: T[]; 

    getTitle?: (item: T) => string;

    ListComponent: FC<{
        items: T[];
        onView: (item: T) => void;
    }>;

    DetailComponent: FC<{ item: T }>;

    FormComponent: FC<{
        initialData?: T;
        onSuccess: (item: T) => void;
        registerSubmit: (fn: () => Promise<void>) => void;
    }>;
}

export const CrudPageLayout = <T extends { id?: string }>(props: CrudPageLayoutProps<T>) => {
    const {
        pageTitle,
        slug,
        initialItems,
        ListComponent,
        DetailComponent,
        FormComponent,
        getTitle = (item) => (item as any)?.name ?? "Record",
    } = props;

    const {showError} = useToastError();
    const {showSuccess} = useToastSuccess();

    const crud = useCrudPage<T>({
        initialItems,
        slug,
        pageTitle,
        showError,
        showSuccess,
    });

    return (
        <>
            <PageHeader
                title={pageTitle}
                onAdd={() => crud.setCreateOpen(true)}
            />

            <ListComponent
                items={crud.items}
                onView={crud.openView}
            />

            <ViewModal
                isOpen={crud.viewOpen}
                onClose={() => crud.setViewOpen(false)}
                title={crud.selected ? getTitle(crud.selected) : ""}
                onEdit={() =>
                    crud.selected && crud.openEdit(crud.selected)
                }
                onDelete={() =>
                    crud.selected && crud.openDelete(crud.selected)
                }
            >
                {crud.selected && (
                    <DetailComponent item={crud.selected}/>
                )}
            </ViewModal>

            <SaveModal
                isOpen={crud.createOpen}
                onClose={() => crud.setCreateOpen(false)}
                title={pageTitle}
                onSave={() =>
                    crud.createSubmitRef.current?.()
                }
            >
                <FormComponent
                    onSuccess={crud.handleCreateSuccess}
                    registerSubmit={crud.registerCreateSubmit}
                />
            </SaveModal>

            <EditModal
                isOpen={crud.editOpen}
                onClose={() => crud.setEditOpen(false)}
                entityName={crud.selected ? getTitle(crud.selected) : ""}
                onSave={() =>
                    crud.editSubmitRef.current?.()
                }
            >
                {crud.selected && (
                    <FormComponent
                        initialData={crud.selected}
                        onSuccess={crud.handleEditSuccess}
                        registerSubmit={crud.registerEditSubmit}
                    />
                )}
            </EditModal>
            
            <DeleteModal
                pageTitle={pageTitle}
                isOpen={crud.deleteOpen}
                onClose={() => crud.setDeleteOpen(false)}
                onConfirm={crud.handleDelete}
                loading={crud.deleteLoading}
                width="sm"
            >
                {crud.selected && (
                    <DeleteConfirmModal
                        recordName={
                            crud.selected ?
                                getTitle(crud.selected) :
                                ""
                        }
                    />
                )}
            </DeleteModal>

        </>
    )
}