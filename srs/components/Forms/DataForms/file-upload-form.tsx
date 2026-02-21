'use client'

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/srs/components/Forms/Uploads/image-uploader";
import { Dropdown } from "@/srs/components/common/dropdown";
import { Checkbox } from "@/srs/components/common/check-box";
import { Button } from "@/srs/components/common/button";
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error";
import { useToastError } from "@/srs/hooks/use-toast-error";
import { useZodForm } from "@/srs/hooks/use-zod-form";
import { fileUploadSchema } from "@/srs/schemas/file-upload.Schema";
import { FileUploadPreview } from "@/srs/lib/awsS3Bucket/file-upload-preview";
import { Institution_Types } from "@/srs/types/institution.types";
import { FileUpload_Types } from "@/srs/types/file-upload.types";
import {ModalHeader} from "@/srs/components/common/modal-header";
import { ModalTitle } from "@/srs/components/common/modal-title";
import { ModalBody } from "@/srs/components/common/modal-body";
import {ModalFooter} from "@/srs/components/common/modal-footer";
import {useToastSuccess} from "@/srs/hooks/use-toast-success";
import {HandleApiResponse} from "@/srs/utils/handle-api-response";
import {useDropdowns} from "@/srs/hooks/use-dropdowns";

interface Props {
    pageTitle: string;
    slug: string;
    initialData?: FileUpload_Types;
    onSuccess?: () => void;
}

export const FileUploadForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
    const router = useRouter()
    const isEdit = Boolean(initialData?.id)
    const {showError} = useToastError()
    const {showSuccess} = useToastSuccess();

    const {
        form,
        errors,
        formError,
        setFormError,
        validateForm,
        updateField,
    } = useZodForm(fileUploadSchema, {
        institutionId: initialData?.institutionId ?? "",
        isLogo: initialData?.isLogo ?? false,
        file: undefined,
    });

    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    const {data: dropdowns, loading: dropdownLoading, error} = useDropdowns(
        ["institutions"],
        (data) => ({
            institutions: data[0].institutions ?? [],
        })
    )

    useEffect(() => {
        if (error) setFormError(error)
    }, [error])

    const isFormIncomplete = !form.institutionId?.trim();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setFormError(null);

        if (isFormIncomplete) {
            setLoading(false);
            return;
        }

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
            const formData = new FormData();

            formData.append("institutionId", payload.institutionId);
            formData.append("isLogo", String(payload.isLogo));

            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            const res = await fetch(url, {
                method,
                body: formData,
            });

            const data = await res.json();

            const success = HandleApiResponse({
                data, isEdit, pageTitle, showError, showSuccess, onSuccess,
            });

            if (!success) return;

            router.push(`/${slug}`);
        } catch (err: any) {
            showError(err?.message ?? "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <ModalHeader>
                <ModalTitle isEdit={isEdit} pageTitle={pageTitle}/>
            </ModalHeader>

            <ModalBody>
                <ImageUploader
                    initialImage={FileUploadPreview(initialData, slug)}
                    disabled={loading}
                    onFileSelected={(file) => setSelectedFile(file)}
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

                <Checkbox
                    label="Is Logo"
                    checked={form.isLogo}
                    onChange={(val) => updateField("isLogo", val)}
                    disabled={loading}
                    error={errors.isLogo}
                />

                {formError && <ErrorForm message={formError}/>}
            </ModalBody>

            <ModalFooter>
                <Button
                    type="submit"
                    variant="success"
                    loading={loading}
                    isDisabled={dropdownLoading || isFormIncomplete}
                    isEdit={isEdit}
                    pageTitle={pageTitle}
                />
            </ModalFooter>
        </form>
    );
}