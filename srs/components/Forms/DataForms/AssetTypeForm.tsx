'use client'

import React, {useState, FormEvent} from 'react'
import { useRouter } from 'next/navigation'
import {AssetType_Types } from "@/srs/types/assetType-Types"; 
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";
import { assetTypeSchema } from "@/srs/zodValidations/assetTypeSchema";
import {AssetTypesFields} from "@/srs/components/Forms/FieldsForms/asset-type-fields";
import {useToastError} from "@/srs/hooks/useToastError";
import {useZodForm} from "@/srs/hooks/useZodForm";
import {Button} from "@/srs/components/common/Button";
import {ModalHeader} from "@/srs/components/common/ModalHeader";
import {ModalBody} from "@/srs/components/common/ModalBody";
import {ModalFooter} from "@/srs/components/common/ModalFooter";
import {ModalTitle} from "@/srs/components/common/ModalTitle";

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

    const [loading, setLoading] = useState(false)

    const requiredFields = [
        form.assetTypeName,
        form.description,
    ]

    const isFormIncomplete = requiredFields.some(v => !v.trim())

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setFormError(null)

        const payload = validateForm()
        if (!payload) {
            setLoading(false)
            return
        }

        const url = isEdit ? `/api/${slug}/${initialData!.id}` : `/api/${slug}`
        const method = isEdit ? 'PUT' : 'POST'

        try {
            const res = await fetch(url, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!data.success) {
                showError(data)
                return
            }

            if (onSuccess) onSuccess()

            router.push(`/${slug}`)
        } catch (err) {
            showError(err)
        } finally {
            setLoading(false)
        }
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
                    variant={"success"}
                    loading={loading}
                    isDisabled={isFormIncomplete}
                    isEdit={isEdit}
                    pageTitle={pageTitle}
                />
            </ModalFooter>
        </form>
    )
}