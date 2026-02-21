'use client'

import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useToastError } from "@/srs/hooks/use-toast-error"
import { useToastSuccess } from "@/srs/hooks/use-toast-success"
import { useZodForm } from "@/srs/hooks/use-zod-form" 
import { useCrudForm } from "@/srs/hooks/use-crud-form" 
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import { ModalFooter } from "@/srs/components/common/modal-footer"
import { ModalTitle } from "@/srs/components/common/modal-title"
import { Button } from "@/srs/components/common/button"
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error" 
import {AssetType_Types} from "@/srs/types/asset-type.types";
import {AssetTypesFields} from "@/srs/components/Forms/FieldsForms/asset-type-fields";
import {assetTypeSchema} from "@/srs/schemas/asset-type.schema";

interface Props {
    pageTitle: string
    slug: string
    initialData?: AssetType_Types
    onSuccess?: () => void
}

export const AssetTypeForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
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
    } = useZodForm(assetTypeSchema, {
        assetTypeName: initialData?.assetTypeName ?? "",
        description: initialData?.description ?? "",
    })

    const requiredFields = [
        form.assetTypeName,
        form.description,
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
                <AssetTypesFields
                    {...form}
                    onChange={updateField}
                    errors={errors}
                />

                {formError && <ErrorForm message={formError}/>}
            </ModalBody>

            <ModalFooter>
                <Button
                    type="submit"
                    loading={loading}
                    isDisabled={isFormIncomplete}
                    isEdit={isEdit}
                    pageTitle={pageTitle}
                />
            </ModalFooter>
        </form>
    )
}