'use client'

import React, { FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToastError } from "@/srs/hooks/use-toast-error"
import { useToastSuccess } from "@/srs/hooks/use-toast-success"
import { useZodForm } from "@/srs/hooks/use-zod-form"
import { useDropdowns } from "@/srs/hooks/use-dropdowns"
import { useCrudForm } from "@/srs/hooks/use-crud-form"
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import { ModalFooter } from "@/srs/components/common/modal-footer"
import { ModalTitle } from "@/srs/components/common/modal-title"
import { Button } from "@/srs/components/common/button"
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error"
import { Dropdown } from "@/srs/components/common/dropdown"
import {Institution_Types} from "@/srs/types/institution.types";
import {GeoLocationFields} from "@/srs/components/Forms/GeoLocationForms/geo-location-fields";
import { BranchesFields } from "../FieldsForms/branch-fields"
import { useGeolocation } from "@/srs/lib/geoLocation/use-geolocation"
import {branchSchema} from "@/srs/schemas/branch.schema";
import {Branch_Types} from "@/srs/types/branch.types";

interface Props {
    pageTitle: string
    slug: string
    initialData?: Branch_Types
    onSuccess?: () => void
}

export const BranchForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
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
        setForm,
    } = useZodForm(branchSchema, {
        branchName: initialData?.branchName ?? "",
        institutionId: initialData?.institutionId ?? "",
        latitude: initialData?.latitude ?? 0,
        longitude: initialData?.longitude ?? 0,
    })

    const {data: dropdowns, loading: dropdownLoading, error} = useDropdowns(
        ["institutions"],
        (data) => ({
            institutions: data[0].institutions ?? [],
        })
    )

    useEffect(() => {
        if (error) setFormError(error)
    }, [error])

    const {error: geoError, loading: geoLoading, getLocation} = useGeolocation(
        (lat, lng) => {
            setForm((prev) => ({
                ...prev,
                latitude: lat,
                longitude: lng,
            }));
        }
    );

    const requiredFields = [
        form.branchName,
        form.institutionId,
        form.latitude?.toString(),
        form.longitude?.toString(),
    ];

    const isFormIncomplete = requiredFields.some((v) => !v?.trim());

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
                <BranchesFields
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

                <GeoLocationFields
                    latitude={form.latitude}
                    longitude={form.longitude}
                    onChange={(field, value) =>
                        updateField(field as any, Number(value))
                    }
                    getLocation={getLocation}
                    geoLoading={geoLoading}
                    geoError={geoError}
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