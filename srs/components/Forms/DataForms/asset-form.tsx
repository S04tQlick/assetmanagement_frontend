'use client'

import React, { FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToastError } from "@/srs/hooks/use-toast-error"
import { useToastSuccess } from "@/srs/hooks/use-toast-success"
import { useZodForm } from "@/srs/hooks/use-zod-form"
import { useDropdowns } from "@/srs/hooks/use-dropdowns"
import { useCrudForm } from "@/srs/hooks/use-crud-form"
import { AssetCategory_Types } from "@/srs/types/asset-category.types"
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import { ModalFooter } from "@/srs/components/common/modal-footer"
import { ModalTitle } from "@/srs/components/common/modal-title"
import { Button } from "@/srs/components/common/button"
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error"
import { Dropdown } from "@/srs/components/common/dropdown"
import { Institution_Types } from "@/srs/types/institution.types"
import { AssetType_Types } from "@/srs/types/asset-type.types"
import { Asset_Types } from "@/srs/types/asset.types"
import { assetSchema } from "@/srs/schemas/asset.schema"
import { Branch_Types } from "@/srs/types/branch.types"
import { Vendor_Types } from "@/srs/types/vendor.types"
import { AssetsFields } from "@/srs/components/Forms/FieldsForms/asset-fields"
import {useDependentDropdown} from "@/srs/hooks/use-dependent-dropdown";

interface Props {
    pageTitle: string
    slug: string
    initialData?: Asset_Types
    onSuccess?: () => void
}

export const AssetForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
    const router = useRouter()
    const isEdit = Boolean(initialData?.id)

    const { showError } = useToastError()
    const { showSuccess } = useToastSuccess()

    const {
        form,
        errors,
        formError,
        setFormError,
        updateField,
        validateForm,
    } = useZodForm(assetSchema, {
        assetName: initialData?.assetName ?? "",
        serialNumber: initialData?.serialNumber ?? "",
        purchasePrice: Number(initialData?.purchasePrice ?? 0),
        usefulLifeYears: Number(initialData?.usefulLifeYears ?? 0),
        unitsTotal: Number(initialData?.unitsTotal ?? 0),
        currentUnits: Number(initialData?.currentUnits ?? 0),
        salvageValue: Number(initialData?.salvageValue ?? 0),
        currentValue: Number(initialData?.currentValue ?? 0),
        accumulatedDepreciation: Number(initialData?.accumulatedDepreciation ?? 0),
        depreciationMethod: initialData?.depreciationMethod ?? "",
        purchaseDate: initialData?.purchaseDate
            ? new Date(initialData.purchaseDate).toISOString().split("T")[0]
            : "",
        maintenanceDueDate: initialData?.maintenanceDueDate
            ? new Date(initialData.maintenanceDueDate).toISOString().split("T")[0]
            : "",
        nextMaintenanceDate: initialData?.nextMaintenanceDate
            ? new Date(initialData.nextMaintenanceDate).toISOString().split("T")[0]
            : "",
        institutionId: initialData?.institutions?.id ?? "",
        branchId: initialData?.branches?.id ?? "",
        assetCategoryId: initialData?.assetCategories?.id ?? "",
        assetTypeId: initialData?.assetTypes?.id ?? "",
        vendorId: initialData?.vendors?.id ?? "",
    })

    const { data: dropdowns, loading: dropdownLoading, error } = useDropdowns(
        ["branches", "asset-types", "asset-categories", "vendors", "institutions"],
        (data) => ({
            branches: data[0].branches ?? [],
            assetTypes: data[1].assetTypes ?? [],
            assetCategories: data[2].assetCategories ?? [],
            vendors: data[3].vendors ?? [],
            institutions: data[4].institutions ?? [],
        })
    )

    useEffect(() => {
        if (error) setFormError(error)
    }, [error])

    const filteredBranches = useDependentDropdown<Branch_Types>({
        parentValues: [form.institutionId],
        selectedValue: form.branchId,
        data: dropdowns?.branches ?? [],
        filterFn: (b) => b.institutions?.id === form.institutionId,
        getId: (b) => b.id ?? "",
        reset: () => updateField("branchId", ""),
    })

    const filteredVendors = useDependentDropdown<Vendor_Types>({
        parentValues: [form.institutionId],
        selectedValue: form.vendorId,
        data: dropdowns?.vendors ?? [],
        filterFn: (v) => v.institutions?.id === form.institutionId,
        getId: (v) => v.id ?? "",
        reset: () => updateField("vendorId", ""),
    })

    const filteredAssetCategories = useDependentDropdown<AssetCategory_Types>({
        parentValues: [form.institutionId, form.assetTypeId],
        selectedValue: form.assetCategoryId,
        data: dropdowns?.assetCategories ?? [],
        filterFn: (c) =>
            c.institutions?.id === form.institutionId &&
            c.assetTypes?.id === form.assetTypeId,
        getId: (c) => c.id ?? "",
        reset: () => updateField("assetCategoryId", ""),
    })

    useEffect(() => {
        if (form.branchId && !filteredBranches.some(b => b.id === form.branchId)) {
            updateField("branchId", "")
        }
    }, [filteredBranches])

    useEffect(() => {
        if (form.vendorId && !filteredVendors.some(v => v.id === form.vendorId)) {
            updateField("vendorId", "")
        }
    }, [filteredVendors])

    useEffect(() => {
        if (
            form.assetCategoryId &&
            !filteredAssetCategories.some(c => c.id === form.assetCategoryId)
        ) {
            updateField("assetCategoryId", "")
        }
    }, [filteredAssetCategories])

    const isFormIncomplete =
        !form.assetName ||
        !form.serialNumber ||
        !form.purchaseDate ||
        !form.maintenanceDueDate ||
        !form.nextMaintenanceDate ||
        !form.institutionId ||
        !form.branchId ||
        !form.assetTypeId ||
        !form.assetCategoryId ||
        !form.vendorId

    const { loading, submitForm } = useCrudForm({
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
                <ModalTitle isEdit={isEdit} pageTitle={pageTitle} />
            </ModalHeader>

            <ModalBody>
                <AssetsFields
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

                <Dropdown<Branch_Types>
                    label="Branch"
                    value={form.branchId}
                    options={filteredBranches}
                    optionLabel={(v) => v.branchName}
                    optionValue={(v) => v.id ?? ""}
                    onChange={(val) => updateField("branchId", val)}
                    required
                    error={errors.branchId}
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

                <Dropdown<AssetCategory_Types>
                    label="Asset Category"
                    value={form.assetCategoryId}
                    options={filteredAssetCategories}
                    optionLabel={(v) => v.assetCategoryName}
                    optionValue={(v) => v.id ?? ""}
                    onChange={(val) => updateField("assetCategoryId", val)}
                    required
                    error={errors.assetCategoryId}
                />

                <Dropdown<Vendor_Types>
                    label="Vendor"
                    value={form.vendorId}
                    options={filteredVendors}
                    optionLabel={(v) => v.vendorsName}
                    optionValue={(v) => v.id ?? ""}
                    onChange={(val) => updateField("vendorId", val)}
                    required
                    error={errors.vendorId}
                />

                {formError && <ErrorForm message={formError} />}
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