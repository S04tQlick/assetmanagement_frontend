'use client'

import React, {useState, FormEvent} from 'react'
import { useRouter } from 'next/navigation' 
import {useToastError} from "@/srs/hooks/use-toast-error";
import {useZodForm} from "@/srs/hooks/use-zod-form"; 
import {ModalHeader} from "@/srs/components/common/modal-header";
import {ModalBody, } from "@/srs/components/common/modal-body";
import {ModalFooter} from "@/srs/components/common/modal-footer"; 
import { Institution_Types } from "@/srs/types/institution.types";
import { InstitutionsFields } from "@/srs/components/Forms/FieldsForms/institution-fields";
import { ImageUploader } from "@/srs/components/Forms/Uploads/image-uploader";
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error";
import {Button} from "@/srs/components/common/button";
import {ModalTitle} from "@/srs/components/common/modal-title";
import {institutionSchema} from "@/srs/schemas/institution.schema";
import {useToastSuccess} from "@/srs/hooks/use-toast-success";
import {InstitutionLogoFetch} from "@/srs/lib/awsS3Bucket/institution-logo-fetch";

interface Props {
    pageTitle: string
    slug: string
    logoSlug: string
    initialData?: Institution_Types
    onSuccess?: () => void
}

export const InstitutionForm = ({ pageTitle, slug, logoSlug, initialData, onSuccess }: Props) => {
    const router = useRouter()
    const isEdit = Boolean(initialData?.id)
    const {showError} = useToastError()
    const {showSuccess} = useToastSuccess();

    const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);

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
    })

    const [loading, setLoading] = useState(false)

    const requiredFields = [
        form.institutionName,
        form.institutionEmail,
        form.institutionContactNumber,
        form.primaryColor,
        form.secondaryColor,
    ]

    const isFormIncomplete = requiredFields.some(v => !v.trim())


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormError(null);

        const payload = validateForm();
        if (!payload) {
            setLoading(false);
            return;
        }

        try { 
            // const url = isEdit ? `/api/${slug}/${initialData!.id}` : `/api/${slug}`;
            // const method = isEdit ? "PUT" : "POST";
            //
            // const res = await fetch(url, {
            //     method,
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify(payload),
            // });
            //
            // const data = await res.json();
            // if (!data.success) {
            //     showError(data.error || "Something went wrong");
            //     return;
            // }

            //const institutionId = data?.data?.data?.id ?? initialData?.id;
            
            
            
            const institutionId = "dba788c5-82db-4b0f-a7a5-8e5549036f09";
            
            console.log("returned institutionId ==: ", institutionId);

            if (selectedLogoFile) {
                const formData = new FormData();

                formData.append("File", selectedLogoFile);
                formData.append("InstitutionId", institutionId);
                ////formData.append("IsLogo", "true");
 
                
                ////console.log("formData ========:  ", [...formData]);

                const uploadRes = await fetch(`/api/${logoSlug}`, { 
                    method: "POST", 
                    body: formData 
                });

                //const uploadData = await uploadRes.json();

                // const logoFileId = uploadData.data.id;
                //
                // await fetch(`/api/${slug}/${institutionId}`, {
                //     method: "PUT",
                //     headers: {"Content-Type": "application/json"},
                //     body: JSON.stringify({logoFileId}),
                // });
            }

            // showSuccess(isEdit ? `${pageTitle} updated successfully` : `${pageTitle} created successfully`);
            // onSuccess?.();
            // router.push(`/${slug}`);
        } catch (err) {
            showError(err);
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
                <InstitutionsFields
                    {...form}
                    onChange={updateField}
                    errors={errors}
                />
                
                <ImageUploader 
                    initialImage={InstitutionLogoFetch(initialData, logoSlug)} 
                    disabled={isFormIncomplete} 
                    onFileSelected={(file) => setSelectedLogoFile(file)}
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




{/*<ImageUploader*/}
{/*    initialImage={form.logoUrl}*/}
{/*    onUpload={(asset) => {*/}
{/*        updateField("logoSanityId", asset.logoSanityId)*/}
{/*        updateField("logoUrl", asset.logoUrl)*/}
{/*    }}*/}
{/*    disabled={isFormIncomplete}*/}
{/*/>*/}


















{/*<ImageUploader*/}
{/*    institutionId={initialData?.id ?? ""}*/}
{/*    isLogo={true}*/}
{/*    initialImage={InstitutionLogoFetch(initialData, logoSlug)}*/}
{/*    onUploaded={(file) => {*/}
{/*        console.log("Uploaded file:", file.s3Key);*/}
{/*        // updateField("logoFileId", file.id);*/}
{/*    }}*/}
{/*    disabled={isFormIncomplete}*/}
{/*/>*/}



// const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setFormError(null)
//
//     const payload = validateForm()
//     if (!payload) {
//         setLoading(false)
//         return
//     }
//
//     const url = isEdit ? `/api/${slug}/${initialData!.id}` : `/api/${slug}`
//     const method = isEdit ? 'PUT' : 'POST'
//
//     try {
//         const res = await fetch(url, {
//             method,
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(payload),
//         })
//
//         const data = await res.json()
//
//         if (!data.success) {
//             showError(data.error || "Something went wrong")
//             return
//         }
//
//         showSuccess(isEdit ? `${pageTitle} updated successfully` : `${pageTitle} created successfully`);
//         onSuccess?.();
//
//         router.push(`/${slug}`)
//     } catch (err) {
//         showError(err)
//     } finally {
//         setLoading(false)
//     }
// }