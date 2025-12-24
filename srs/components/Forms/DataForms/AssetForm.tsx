'use client'

import React, {useState, useEffect, FormEvent} from "react" 
import { Dropdown } from "@/srs/components/common/Dropdown" 

import {Asset_Types, Asset_TypesInput } from "@/srs/types/asset-Types"
import {Branch_Types } from "@/srs/types/branch-Types"
import { AssetType_Types } from "@/srs/types/assetType-Types"
import { Institution_Types } from "@/srs/types/institution-Types"
import { Vendor_Types } from "@/srs/types/vendor-Types"
import {AssetCategory_Types} from "@/srs/types/assetCategory-Types";
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";
import {AssetsFields} from "@/srs/components/Forms/FieldsForms/asset-fields";
import { useRouter } from "next/navigation"
import {assetSchema} from "@/srs/zodValidations/assetSchema";

interface Props {
    pageTitle: string
    slug: string
    initialData?: Asset_Types
}

export const AssetForm = ({ pageTitle, slug, initialData } : Props) => {
    const router = useRouter()
    const isEdit = !!initialData?.id
    
    const [form, setForm] = useState<Asset_TypesInput>({
        assetName: initialData?.assetName || "",
        serialNumber: initialData?.serialNumber || "",
        purchasePrice: initialData?.purchasePrice || 0,
        usefulLifeYears: initialData?.usefulLifeYears || 0,
        unitsTotal: initialData?.unitsTotal || 0,
        currentUnits: initialData?.currentUnits || 0,
        salvageValue: initialData?.salvageValue || 0,
        currentValue: initialData?.currentValue || 0,
        accumulatedDepreciation: initialData?.accumulatedDepreciation || 0,
        depreciationMethod: initialData?.depreciationMethod || "",
        purchaseDate: initialData?.purchaseDate
            ? new Date(initialData.purchaseDate).toISOString().split("T")[0]
            : "",
        maintenanceDueDate: initialData?.maintenanceDueDate
            ? new Date(initialData.maintenanceDueDate).toISOString().split("T")[0]
            : "",
        nextMaintenanceDate: initialData?.nextMaintenanceDate
            ? new Date(initialData.nextMaintenanceDate).toISOString().split("T")[0]
            : "",
        institutionId: initialData?.institutions.id || "",
        branchId: initialData?.branches.id || "",
        assetCategoryId: initialData?.assetCategories.id || "",
        assetTypeId: initialData?.assetTypes.id || "",
        vendorId: initialData?.vendors.id || "",

        sanityAssetId: initialData?.sanityAssetId || "",
        sanityUrl: initialData?.sanityUrl || "",
    })

    const [dropdowns, setDropdowns] = useState({
        branches: [] as Branch_Types[],
        assetCategories: [] as AssetCategory_Types[],
        assetTypes: [] as AssetType_Types[],
        vendors: [] as Vendor_Types[],
        institutions: [] as Institution_Types[],
    })

    const [filteredBranches, setFilteredBranches] = useState<Branch_Types[]>([])
    const [filteredAssetCategories, setFilteredAssetCategories] = useState<AssetCategory_Types[]>([])
    const [filteredVendors, setFilteredVendors] = useState<Vendor_Types[]>([])

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [error, setError] = useState<string | null>(null)

    const updateField = (field: keyof Asset_TypesInput, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const endpoints = ["branches", "asset-types", "asset-categories", "vendors", "institutions"]
                const responses = await Promise.all(endpoints.map((e) => fetch(`/api/${e}`)))
                const data = await Promise.all(responses.map((r) => r.json()))

                setDropdowns({
                    branches: data[0].branches || [],
                    assetTypes: data[1].assetTypes || [],
                    assetCategories: data[2].assetCategories || [],
                    vendors: data[3].vendors || [],
                    institutions: data[4].institutions || [],
                })
            } catch (err) {
                console.error("Failed to load dropdowns:", err)
                setError("Failed to load dropdowns")
            }
        }
        fetchDropdowns()
    }, [])

    useEffect(() => {
        if (!dropdowns.assetCategories.length) return

        if (form.institutionId && form.assetTypeId) {
            const filtered = dropdowns.assetCategories.filter(
                (c) =>
                    c.institutions?.id === form.institutionId &&
                    c.assetTypes?.id === form.assetTypeId
            )
            setFilteredAssetCategories(filtered)

            if (form.assetCategoryId && !filtered.some((c) => c.id === form.assetCategoryId)) {
                updateField("assetCategoryId", "")
            }
        } else {
            setFilteredAssetCategories([])
            updateField("assetCategoryId", "")
        }
    }, [form.institutionId, form.assetTypeId, dropdowns.assetCategories])
    
    useEffect(() => {
        if (!dropdowns.branches.length) return

        if (form.institutionId) {
            const filtered = dropdowns.branches.filter(
                (b) => b.institutions?.id === form.institutionId
            )
            setFilteredBranches(filtered)

            if (form.branchId && !filtered.some((b) => b.id === form.branchId)) {
                updateField("branchId", "")
            }
        } else {
            setFilteredBranches([])
            updateField("branchId", "")
        }
    }, [form.institutionId, dropdowns.branches])

    useEffect(() => {
        if (!dropdowns.vendors.length) return

        if (form.institutionId) {
            const filtered = dropdowns.vendors.filter(
                (v) => v.institutions?.id === form.institutionId
            )
            setFilteredVendors(filtered)

            if (form.vendorId && !filtered.some((v) => v.id === form.vendorId)) {
                updateField("vendorId", "")
            }
        } else {
            setFilteredVendors([])
            updateField("vendorId", "")
        }
    }, [form.institutionId, dropdowns.vendors])
    
    const normalizeForm = (form: any) => ({
        ...form,
        purchasePrice: Number(form.purchasePrice),
        usefulLifeYears: Number(form.usefulLifeYears),
        unitsTotal: Number(form.unitsTotal),
        currentUnits: Number(form.currentUnits),
        salvageValue: Number(form.salvageValue),
        currentValue: Number(form.currentValue),
        accumulatedDepreciation: Number(form.accumulatedDepreciation),
        purchaseDate: new Date(form.purchaseDate),
        maintenanceDueDate: new Date(form.maintenanceDueDate),
        nextMaintenanceDate: new Date(form.nextMaintenanceDate),
    });
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const normalized = normalizeForm(form);

        const result = assetSchema.safeParse(normalized);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};

            for (const issue of result.error.issues) {
                const field = issue.path[0] as string;
                fieldErrors[field] = issue.message;
            }

            setErrors(fieldErrors);
            setLoading(false);
            return;
        }

        setErrors({});

        const payload = result.data;
        const url = isEdit
            ? `/api/${slug}/${initialData.id}`
            : `/api/${slug}`;

        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!data.success) {
                setErrors({ global: data.error || `Failed to save ${slug}.` });
                setLoading(false);
                return;
            }

            router.push(`/${slug}`);
        } catch (err) {
            console.error(err);
            setError(`Failed to save ${slug}`);
            setLoading(false);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <ErrorForm message={error} />

            <AssetsFields
                assetName={form.assetName}
                serialNumber={form.serialNumber}
                purchaseDate={form.purchaseDate}
                purchasePrice={Number(form.purchasePrice)}
                usefulLifeYears={Number(form.usefulLifeYears)}
                unitsTotal={Number(form.unitsTotal)}
                currentUnits={Number(form.currentUnits)}
                maintenanceDueDate={form.maintenanceDueDate}
                salvageValue={Number(form.salvageValue)}
                currentValue={Number(form.currentValue)}
                accumulatedDepreciation={Number(form.accumulatedDepreciation)}
                nextMaintenanceDate={form.nextMaintenanceDate}
                onChange={(field, value) => updateField(field, value)}
                errors={errors}
            />

            <Dropdown
                label="Institution"
                value={form.institutionId}
                options={dropdowns.institutions}
                optionLabel={(i) => i.institutionName}
                optionValue={(i) => i.id}
                onChange={(val) => updateField("institutionId", val)}
                required
                error={errors.institutionId}
            />

            <Dropdown
                label="Branch"
                value={form.branchId}
                options={filteredBranches}
                optionLabel={(b) => b.branchName}
                optionValue={(b) => b.id}
                onChange={(val) => updateField("branchId", val)}
                required
                error={errors.branchId}
            />

            <Dropdown
                label="Asset Type"
                value={form.assetTypeId}
                options={dropdowns.assetTypes}
                optionLabel={(t) => t.assetTypeName}
                optionValue={(t) => t.id}
                onChange={(val) => updateField("assetTypeId", val)}
                required
                error={errors.assetTypeId}
            />

            <Dropdown
                label="Asset Category"
                value={form.assetCategoryId}
                options={filteredAssetCategories}
                optionLabel={(c) => c.assetCategoryName}
                optionValue={(c) => c.id}
                onChange={(val) => updateField("assetCategoryId", val)}
                required
                error={errors.assetCategoryId}
            />

            <Dropdown
                label="Vendor"
                value={form.vendorId}
                options={filteredVendors}
                optionLabel={(v) => v.vendorsName}
                optionValue={(v) => v.id}
                onChange={(val) => updateField("vendorId", val)}
                required
                error={errors.vendorId}
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? 'Saving...' : initialData?.id ? `Update ${pageTitle}` : `Create ${pageTitle}`}
            </button>
        </form>
    )
}