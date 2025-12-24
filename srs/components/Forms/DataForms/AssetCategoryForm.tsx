'use client'

import React, {useState, FormEvent, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import {useToastError} from "@/srs/hooks/useToastError";
import {useZodForm} from "@/srs/hooks/useZodForm";
import {ModalHeader} from "@/srs/components/common/ModalHeader";
import {ModalBody, } from "@/srs/components/common/ModalBody";
import {ModalFooter} from "@/srs/components/common/ModalFooter"; 
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/FormError";
import {Button} from "@/srs/components/common/Button";
import {ModalTitle} from "@/srs/components/common/ModalTitle";
import {AssetCategory_Types} from "@/srs/types/assetCategory-Types";
import {assetCategorySchema} from "@/srs/zodValidations/assetCategorySchema";
import { AssetCategoriesFields } from "@/srs/components/Forms/FieldsForms/asset-category-fields";
import { Dropdown } from "@/srs/components/common/Dropdown";
import {AssetType_Types} from "@/srs/types/assetType-Types";
import {Institution_Types} from "@/srs/types/institution-Types";

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

    const[loading, setLoading] = useState(false)

    const [dropdowns, setDropdowns] = useState({
        assetTypes: [] as AssetType_Types[],
        institutions: [] as Institution_Types[],
    })

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const endpoints = ["asset-types", "institutions"]
                const responses = await Promise.all(endpoints.map((e) => fetch(`/api/${e}`)))
                const data = await Promise.all(responses.map((r) => r.json()))

                setDropdowns({ 
                    assetTypes: data[0].assetTypes ?? [], 
                    institutions: data[1].institutions ?? [], 
                });
            } catch (err) {
                console.error("Failed to load dropdowns:", err)
                setFormError("Failed to load dropdowns")
            }
        }
        fetchDropdowns()
    }, [setFormError])

    const requiredFields = [
        form.assetCategoryName,
        form.assetTypeId,
        form.institutionId,
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
                <AssetCategoriesFields
                    {...form}
                    onChange={updateField}
                    errors={errors}
                />
                
                <Dropdown
                    label="Institution"
                    value={form.institutionId}
                    options={dropdowns.institutions}
                    optionLabel={(val) => val.institutionName}
                    optionValue={(val) => val.id}
                    onChange={(val) => updateField("institutionId", val)}
                    required
                    error={errors.institutionId}
                />

                <Dropdown
                    label="Asset Type"
                    value={form.assetTypeId}
                    options={dropdowns.assetTypes}
                    optionLabel={(val) => val.assetTypeName}
                    optionValue={(val) => val.id}
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
                    isDisabled={isFormIncomplete}
                    isEdit={isEdit}
                    pageTitle={pageTitle}
                />
            </ModalFooter>
        </form>
    )
}