'use client'

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useToastError } from "@/srs/hooks/use-toast-error";
import { useZodForm } from "@/srs/hooks/use-zod-form";
import { ModalHeader } from "@/srs/components/common/modal-header";
import { ModalBody } from "@/srs/components/common/modal-body";
import { ModalFooter } from "@/srs/components/common/modal-footer";
import { ModalTitle } from "@/srs/components/common/modal-title";
import { Button } from "@/srs/components/common/button";
import { Dropdown } from "@/srs/components/common/dropdown";
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error";
import { BranchesFields } from "@/srs/components/Forms/FieldsForms/branch-fields"; 
import { Branch_Types } from "@/srs/types/branch.types";
import { Institution_Types } from "@/srs/types/institution.types";
import { useGeolocation } from "@/srs/lib/geoLocation/use-geolocation";
import { GeoLocationFields } from "../GeoLocationForms/geo-location-fields";
import {branchSchema} from "@/srs/schemas/branch.schema";
 

interface Props {
    pageTitle: string;
    slug: string;
    initialData?: Branch_Types;
    onSuccess?: () => void;
}

export const BranchForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
    const router = useRouter();
    const isEdit = Boolean(initialData?.id);
    const { showError } = useToastError();
    
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
        institutionId: initialData?.institutions?.id ?? "",
        latitude: initialData?.latitude ?? 0,
        longitude: initialData?.longitude ?? 0,
    });

    const [loading, setLoading] = useState(false);

    const [dropdowns, setDropdowns] = useState({ 
        institutions: [] as Institution_Types[],
    }) 

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const endpoints = ["institutions"]
                const responses = await Promise.all(endpoints.map((e) => fetch(`/api/${e}`)))
                const data = await Promise.all(responses.map((r) => r.json()))

                setDropdowns({
                    institutions: data[0].institutions ?? [],
                });
            } catch (err) {
                console.error("Failed to load dropdowns:", err);
                setFormError("Failed to load dropdowns");
            }
        };

        fetchDropdowns();
    }, [setFormError]);

    const { error: geoError, loading: geoLoading, getLocation } = useGeolocation(
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormError(null);

        const payload = validateForm();
        if (!payload) {
            setLoading(false);
            return;
        }

        const url = isEdit
            ? `/api/${slug}/${initialData!.id}`
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
                showError(data);
                return;
            }

            if (onSuccess) onSuccess();

            router.push(`/${slug}`);
        } catch (err) {
            showError(err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <ModalHeader>
                <ModalTitle isEdit={isEdit} pageTitle={pageTitle} />
            </ModalHeader>

            <ModalBody>
                <BranchesFields
                    branchName={form.branchName}
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

                {formError && <ErrorForm message={formError} />}
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
    );
};
