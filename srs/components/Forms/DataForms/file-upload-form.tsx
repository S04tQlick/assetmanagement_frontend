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

    const [dropdowns, setDropdowns] = useState({
        institutions: [] as Institution_Types[],
    });

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("/api/institutions");
                const data = await res.json();

                setDropdowns({
                    institutions: data.institutions ?? [],
                });
            } catch (err) {
                console.error(err);
                setFormError("Failed to load institutions");
            }
        };

        load();
    }, [setFormError]);

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

                <Dropdown
                    label="Institution"
                    value={form.institutionId ?? ""}
                    options={dropdowns.institutions}
                    optionLabel={(i) => i.institutionName}
                    optionValue={(i) => i.id ?? ""}
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
                    isDisabled={isFormIncomplete}
                    isEdit={isEdit}
                    pageTitle={pageTitle}
                />
            </ModalFooter>
        </form>
    );
}














// 'use client'
//
// import React, {FormEvent, useEffect, useState} from 'react'
// import { useRouter } from 'next/navigation'
//
// import { ErrorForm } from '@/srs/components/Forms/ErrorForms/form-error'
// import { ImageUploader } from '@/srs/components/Forms/Uploads/image-uploader'
// import { Button } from '@/srs/components/common/button'
// import { ModalHeader } from '@/srs/components/common/modal-header'
// import { ModalBody } from '@/srs/components/common/modal-body'
// import { ModalFooter } from '@/srs/components/common/modal-footer'
// import { ModalTitle } from '@/srs/components/common/modal-title'
//
// import { useToastError } from '@/srs/hooks/use-toast-error'
// import { useToastSuccess } from '@/srs/hooks/use-toast-success'
// import { useZodForm } from '@/srs/hooks/use-zod-form'
//
// import { fileUploadSchema } from '@/srs/schemas/file-upload.Schema'
//
// import { FileUpload_Types } from '@/srs/types/file-upload.types'
// import {FileUploadPreview} from "@/srs/lib/awsS3Bucket/file-upload-preview";
// import {Dropdown} from "@/srs/components/common/dropdown";
// import {Institution_Types} from "@/srs/types/institution.types";
// import {Checkbox} from "@/srs/components/common/check-box";
//
// interface Props {
//     pageTitle: string
//     slug: string
//     initialData?: FileUpload_Types
//     onSuccess?: () => void
// }
//
// export const FileUploadForm = ({pageTitle, slug, initialData, onSuccess}: Props) => {
//     const router = useRouter()
//     const isEdit = Boolean(initialData?.id)
//
//     const { showError } = useToastError()
//     //const { showSuccess } = useToastSuccess()
//
//     const [loading, setLoading] = useState(false)
//     const [selectedFile, setSelectedFile] = useState<File | null>(null)
//     const {
//         form,
//         errors,
//         formError,
//         setFormError,
//         validateForm,
//         updateField,
//     } = useZodForm(fileUploadSchema, {
//         s3Key: initialData?.s3Key ?? '',
//         institutionId: initialData?.institutionId ?? '',
//         isLogo: initialData?.isLogo ?? false,
//     })
//
//     const [dropdowns, setDropdowns] = useState({
//         institutions: [] as Institution_Types[],
//     })
//
//     useEffect(() => {
//         const fetchDropdowns = async () => {
//             try {
//                 const endpoints = ["institutions"]
//                 const responses = await Promise.all(endpoints.map((e) => fetch(`/api/${e}`)))
//                 const data = await Promise.all(responses.map((r) => r.json()))
//
//                 setDropdowns({
//                     institutions: data[0].institutions ?? [],
//                 });
//             } catch (err) {
//                 console.error("Failed to load dropdowns:", err);
//                 setFormError("Failed to load dropdowns");
//             }
//         };
//
//         fetchDropdowns();
//     }, [setFormError]);
//
//     const isFormIncomplete = !form.institutionId?.trim()
//
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//
//         setLoading(true);
//         setFormError(null);
//
//         if (isFormIncomplete) return
//
//         setLoading(true)
//         setFormError(null)
//
//         const payload = validateForm()
//         if (!payload) {
//             setLoading(false)
//             return
//         }
//
//         const url = isEdit
//             ? `/api/${slug}/${initialData!.id}`
//             : `/api/${slug}`
//
//         const method = isEdit ? 'PUT' : 'POST'
//
//         try {
//             const formData = new FormData()
//            
//             if (selectedFile) {
//                 formData.append('institutionId', payload.institutionId)
//                 formData.append('isLogo', String(payload.isLogo))
//                 formData.append('file', selectedFile)
//             }
//
//             const res = await fetch(url, {
//                 method,
//                 body: formData,
//             })
//
//             const data = await res.json();
//
//             if (!data.success) {
//                 showError(data);
//                 return;
//             }
//
//             //if (onSuccess) onSuccess();
//
//             // router.push(`/${slug}`);
//         } catch (error) {
//             console.error(error)
//             showError(
//                 error instanceof Error
//                     ? error.message
//                     : 'Unexpected error occurred'
//             )
//         } finally {
//             setLoading(false)
//         }
//     }
//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="flex flex-col flex-1 min-h-0"
//         >
//             <ModalHeader>
//                 <ModalTitle isEdit={isEdit} pageTitle={pageTitle} />
//             </ModalHeader>
//
//             <ModalBody>
//
//                 <ImageUploader 
//                     initialImage={FileUploadPreview(initialData, slug)} 
//                     disabled={loading} 
//                     onFileSelected={(file) => setSelectedFile(file)} 
//                 />
//
//                 <Dropdown
//                     label="Institution"
//                     value={form.institutionId}
//                     options={dropdowns.institutions}
//                     optionLabel={(val) => val.institutionName}
//                     optionValue={(val) => val.id}
//                     onChange={(val) => updateField("institutionId", val)}
//                     required
//                     error={errors.institutionId}
//                 />
//
//                 <Checkbox
//                     label="Is Logo"
//                     checked={form.isLogo}
//                     onChange={(val) => updateField("isLogo", val)}
//                     disabled={loading}
//                     error={errors.isLogo}
//                 />
//
//                 {formError && <ErrorForm message={formError} />}
//             </ModalBody>
//
//             <ModalFooter>
//                 <Button
//                     type="submit"
//                     variant="success"
//                     loading={loading}
//                     isDisabled={isFormIncomplete || loading}
//                     isEdit={isEdit}
//                     pageTitle={pageTitle}
//                 />
//             </ModalFooter>
//         </form>
//     )
// }





























// 'use client'
//
// import React, {useState, FormEvent} from 'react'
// import { useRouter } from 'next/navigation'
// import {ErrorForm} from "@/srs/components/Forms/ErrorForms/form-error";
// import {useToastError} from "@/srs/hooks/use-toast-error";
// import {useZodForm} from "@/srs/hooks/use-zod-form";
// import {Button} from "@/srs/components/common/button";
// import {ModalHeader} from "@/srs/components/common/modal-header";
// import {ModalBody} from "@/srs/components/common/modal-body";
// import {ModalFooter} from "@/srs/components/common/modal-footer";
// import {ModalTitle} from "@/srs/components/common/modal-title";
// import {useToastSuccess} from "@/srs/hooks/use-toast-success";
// import {FileUpload_Types} from "@/srs/types/file-upload.types";
// import {fileUploadSchema} from "@/srs/schemas/file-upload.Schema";
// import {InstitutionLogoFetch} from "@/srs/lib/awsS3Bucket/institution-logo-fetch";
// import {ImageUploader} from "@/srs/components/Forms/Uploads/image-uploader";
//
// interface Props {
//     pageTitle: string
//     slug: string
//     initialData?: FileUpload_Types
//     onSuccess?: () => void
// }
// export const FileUploadForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
//     const router = useRouter()
//     const isEdit = Boolean(initialData?.id)
//     const {showError} = useToastError()
//     const { showSuccess } = useToastSuccess();
//
//     const {
//         form,
//         errors,
//         formError,
//         setFormError,
//         updateField,
//         validateForm,
//     } = useZodForm(fileUploadSchema, {
//         s3Key: initialData?.s3Key ?? "",
//         institutionId: initialData?.institutionId ?? "",
//         isLogo: initialData?.isLogo ?? "",
//     })
//
//     const [loading, setLoading] = useState(false)
//
//     const requiredFields = [
//         form.institutionId,
//         form.isLogo,
//     ]
//
//     const isFormIncomplete = requiredFields.some(v => !v.trim())
//
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault()
//         setLoading(true)
//         setFormError(null)
//
//         const payload = validateForm()
//         if (!payload) {
//             setLoading(false)
//             return
//         }
//
//         const url = isEdit ? `/api/${slug}/${initialData!.id}` : `/api/${slug}`
//         const method = isEdit ? 'PUT' : 'POST'
//
//         try {
//             const res = await fetch(url, {
//                 method,
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify(payload),
//             })
//
//             const data = await res.json()
//
//             if (!data.success) {
//                 showError(data.error || "Something went wrong")
//                 return
//             }
//            
//             showSuccess(isEdit ? `${pageTitle} updated successfully` : `${pageTitle} created successfully`);
//             onSuccess?.();
//
//             router.push(`/${slug}`)
//         } catch (err) {
//             showError(err)
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
//             <ModalHeader>
//                 <ModalTitle isEdit={isEdit} pageTitle={pageTitle}/>
//             </ModalHeader>
//             <ModalBody>
//
//                 <ImageUploader
//                     initialImage={InstitutionLogoFetch(initialData, logoSlug)}
//                     disabled={isFormIncomplete}
//                     onFileSelected={(file) => setSelectedLogoFile(file)}
//                 />
//                
//                
//
//                 {formError && <ErrorForm message={formError}/>}
//                
//             </ModalBody>
//            
//             <ModalFooter>
//                 <Button
//                     type="submit"
//                     variant={"success"}
//                     loading={loading}
//                     //isDisabled={isFormIncomplete}
//                     isEdit={isEdit}
//                     pageTitle={pageTitle}
//                 />
//             </ModalFooter>
//         </form>
//     )
// }