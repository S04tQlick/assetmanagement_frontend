'use client'

import React, {useState, FormEvent} from 'react'
import { useRouter } from 'next/navigation' 
import {useToastError} from "@/srs/hooks/useToastError";
import {useZodForm} from "@/srs/hooks/useZodForm"; 
import {ModalHeader} from "@/srs/components/common/ModalHeader";
import {ModalBody, } from "@/srs/components/common/ModalBody";
import {ModalFooter} from "@/srs/components/common/ModalFooter"; 
import { Institution_Types } from "@/srs/types/institution-Types";
import {institutionSchema} from "@/srs/zodValidations/institutionSchema";
import { InstitutionsFields } from "@/srs/components/Forms/FieldsForms/institution-fields";
import { ImageUploader } from "@/srs/components/Forms/Uploads/ImageUploader";
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/FormError";
import {Button} from "@/srs/components/common/Button";
import {ModalTitle} from "@/srs/components/common/ModalTitle";

interface Props {
    pageTitle: string
    slug: string
    initialData?: Institution_Types
    onSuccess?: () => void
}
export const InstitutionForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
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
    } = useZodForm(institutionSchema, {
        institutionName: initialData?.institutionName ?? "",
        institutionEmail: initialData?.institutionEmail ?? "",
        institutionContactNumber: initialData?.institutionContactNumber ?? "",
        primaryColor: initialData?.primaryColor ?? "",
        secondaryColor: initialData?.secondaryColor ?? "",
        logoSanityId: initialData?.logoSanityId ?? "",
        logoUrl: initialData?.logoUrl ?? "",
    })

    const[loading, setLoading] = useState(false)

    const requiredFields = [
        form.institutionName,
        form.institutionEmail,
        form.institutionContactNumber,
        form.primaryColor,
        form.secondaryColor,
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
                <InstitutionsFields
                    {...form}
                    onChange={updateField}
                    errors={errors}
                />
                
                <ImageUploader
                    initialImage={form.logoUrl}
                    onUpload={(asset) => {
                        updateField("logoSanityId", asset.logoSanityId)
                        updateField("logoUrl", asset.logoUrl)
                    }}
                    disabled={isFormIncomplete}
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