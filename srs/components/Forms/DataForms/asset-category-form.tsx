'use client'

import React, { FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToastError } from "@/srs/hooks/use-toast-error"
import { useToastSuccess } from "@/srs/hooks/use-toast-success"
import { useZodForm } from "@/srs/hooks/use-zod-form"
import { useDropdowns } from "@/srs/hooks/use-dropdowns"
import { useCrudForm } from "@/srs/hooks/use-crud-form"
import { assetCategorySchema } from "@/srs/schemas/asset-category.schema"
import { AssetCategory_Types } from "@/srs/types/asset-category.types"
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import { ModalFooter } from "@/srs/components/common/modal-footer"
import { ModalTitle } from "@/srs/components/common/modal-title"
import { Button } from "@/srs/components/common/button"
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error"
import { Dropdown } from "@/srs/components/common/dropdown"
import { AssetCategoriesFields } from "@/srs/components/Forms/FieldsForms/asset-category-fields"
import {Institution_Types} from "@/srs/types/institution.types";
import {AssetType_Types} from "@/srs/types/asset-type.types";

interface Props {
    pageTitle: string
    slug: string
    initialData?: AssetCategory_Types
    onSuccess?: () => void
}

export const AssetCategoryForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
    const router = useRouter()
    const isEdit = Boolean(initialData?.id)
    const {showError} = useToastError()
    const {showSuccess} = useToastSuccess()

    const {
        form,
        errors,
        formError,
        setFormError,
        updateField,
        validateForm,
    } = useZodForm(assetCategorySchema, {
        assetCategoryName: initialData?.assetCategoryName ?? "",
        assetTypeId: initialData?.assetTypes.id ?? "",
        institutionId: initialData?.institutions.id ?? "",
    })

    const {data: dropdowns, loading: dropdownLoading, error} = useDropdowns(
        ["asset-types", "institutions"],
        (data) => ({
            assetTypes: data[0].assetTypes ?? [],
            institutions: data[1].institutions ?? [],
        })
    )

    useEffect(() => {
        if (error) setFormError(error)
    }, [error])

    const requiredFields = [
        form.assetCategoryName, 
        form.assetTypeId, 
        form.institutionId,
    ]
    const isFormIncomplete = requiredFields.some(v => !v.trim())

    const {loading, submitForm} = useCrudForm({
        showError,
        showSuccess,
        onSuccess,
        router,
        slug,
        isEdit,
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setFormError(null)

        const payload = validateForm()
        if (!payload) return

        await submitForm(payload, initialData?.id)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <ModalHeader>
                <ModalTitle isEdit={isEdit} pageTitle={pageTitle}/>
            </ModalHeader>

            <ModalBody>
                <AssetCategoriesFields
                    {...form}
                    onChange={updateField}
                    errors={errors}
                />

                <Dropdown<Institution_Types>
                    label="Institution"
                    value={form.institutionId}
                    options={dropdowns?.institutions ?? []}
                    optionLabel={(v) => v.institutionName}
                    optionValue={(v) => v.id ?? ""}
                    onChange={(val) => updateField("institutionId", val)}
                    required
                    error={errors.institutionId}
                />

                <Dropdown<AssetType_Types>
                    label="Asset Type"
                    value={form.assetTypeId}
                    options={dropdowns?.assetTypes ?? []}
                    optionLabel={(v) => v.assetTypeName}
                    optionValue={(v) => v.id ?? ""}
                    onChange={(val) => updateField("assetTypeId", val)}
                    required
                    error={errors.assetTypeId}
                />

                {formError && <ErrorForm message={formError}/>}
            </ModalBody>

            <ModalFooter>
                <Button
                    type="submit"
                    loading={loading}
                    isDisabled={dropdownLoading || isFormIncomplete}
                    isEdit={isEdit}
                    pageTitle={pageTitle}
                />
            </ModalFooter>
        </form>
    )
}