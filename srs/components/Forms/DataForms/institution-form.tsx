"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Institution_Types } from "@/srs/types/institution.types"
import { InstitutionsFields } from "@/srs/components/Forms/FieldsForms/institution-fields"
import { ImageUploader } from "@/srs/components/Forms/Uploads/image-uploader"
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error"
import { useZodForm } from "@/srs/hooks/use-zod-form"
import { institutionSchema } from "@/srs/schemas/institution.schema"
import { InstitutionLogoFetch } from "@/srs/lib/awsS3Bucket/institution-logo-fetch"
import { useToastError } from "@/srs/hooks/use-toast-error"
import { useToastSuccess } from "@/srs/hooks/use-toast-success" 
import {useCrudCallBackForm} from "@/srs/hooks/use-crud-form-call-back";

interface InstitutionFormProps {
    pageTitle: string
    slug: string
    logoSlug: string
    initialData?: Institution_Types
    onSuccess?: (data: Institution_Types) => void
    registerSubmit?: (submitFn: () => Promise<void>) => void
}

export const InstitutionForm = ({
                                    pageTitle,
                                    slug,
                                    logoSlug,
                                    initialData,
                                    onSuccess,
                                    registerSubmit,
                                }: InstitutionFormProps) => {

    const isEdit = Boolean(initialData?.id)

    const { showError } = useToastError()
    const { showSuccess } = useToastSuccess()

    const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)

    const defaultValues = useMemo(() => ({
        institutionName: initialData?.institutionName ?? "",
        institutionEmail: initialData?.institutionEmail ?? "",
        institutionContactNumber: initialData?.institutionContactNumber ?? "",
        primaryColor: initialData?.primaryColor ?? "",
        secondaryColor: initialData?.secondaryColor ?? "",
    }), [initialData])

    const {
        form,
        errors,
        updateField,
        validateForm,
    } = useZodForm(institutionSchema, defaultValues)

    const {
        loading,
        formError,
        submitForm,
    } = useCrudCallBackForm<Institution_Types>({
        slug,
        logoSlug,
        isEdit,
        initialData,
        showError,
        showSuccess,
        onSuccess,
        pageTitle,
        file: selectedLogoFile ?? undefined,
        fileEntityKey: "InstitutionId",
    })

    const handleSubmit = useCallback(async () => {
        await submitForm(validateForm)
    }, [submitForm, validateForm])

    useEffect(() => {
        registerSubmit?.(handleSubmit)
    }, [registerSubmit, handleSubmit])

    return (
        <div className="flex flex-col gap-4 w-full">

            <InstitutionsFields
                {...form}
                onChange={updateField}
                errors={errors}
            />

            <ImageUploader
                initialImage={InstitutionLogoFetch(initialData, logoSlug)}
                onFileSelected={setSelectedLogoFile}
            />

            {formError && <ErrorForm message={formError} />}

            {loading && (
                <div className="text-sm text-gray-500">
                    Saving...
                </div>
            )}

        </div>
    )
}
































// "use client"
//
// import React, { useState, useEffect, useCallback } from "react"
// import { Institution_Types } from "@/srs/types/institution.types"
// import { InstitutionsFields } from "@/srs/components/Forms/FieldsForms/institution-fields"
// import { ImageUploader } from "@/srs/components/Forms/Uploads/image-uploader"
// import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error"
// import { useZodForm } from "@/srs/hooks/use-zod-form"
// import { institutionSchema } from "@/srs/schemas/institution.schema"
// import { InstitutionLogoFetch } from "@/srs/lib/awsS3Bucket/institution-logo-fetch" 
// import { useToastError } from "@/srs/hooks/use-toast-error"
// import { useToastSuccess } from "@/srs/hooks/use-toast-success"
// import {useCrudCallBackForm} from "@/srs/hooks/use-crud-form-call-back";
//
// interface Props {
//     pageTitle: string
//     slug: string
//     logoSlug: string
//     initialData?: Institution_Types
//     onSuccess?: (data: Institution_Types) => void
//     registerSubmit?: (submitFn: () => Promise<void>) => void
// }
//
// export const InstitutionForm = ({
//                                     pageTitle,
//                                     slug,
//                                     logoSlug,
//                                     initialData,
//                                     onSuccess,
//                                     registerSubmit,
//                                 }: Props) => {
//     const isEdit = Boolean(initialData?.id)
//     const { showError } = useToastError()
//     const { showSuccess } = useToastSuccess()
//
//     const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)
//
//     const { form, errors, updateField, validateForm } = useZodForm(
//         institutionSchema,
//         {
//             institutionName: initialData?.institutionName ?? "",
//             institutionEmail: initialData?.institutionEmail ?? "",
//             institutionContactNumber: initialData?.institutionContactNumber ?? "",
//             primaryColor: initialData?.primaryColor ?? "",
//             secondaryColor: initialData?.secondaryColor ?? "",
//         }
//     )
//
//     const { loading, formError, submitForm } = useCrudCallBackForm<Institution_Types>({
//         slug,
//         logoSlug,
//         isEdit: !!initialData,
//         initialData,
//         showError,
//         showSuccess,
//         onSuccess,
//         pageTitle,
//         file: selectedLogoFile,
//         fileEntityKey: "InstitutionId",
//     })
//
//     const handleSubmit = useCallback(async () => {
//         await submitForm(validateForm, selectedLogoFile || undefined)
//     }, [submitForm, validateForm, selectedLogoFile])
//
//     useEffect(() => {
//         registerSubmit?.(handleSubmit)
//     }, [registerSubmit, handleSubmit])
//
//     return (
//         <div className="flex flex-col gap-4 w-full">
//             <InstitutionsFields
//                 {...form}
//                 onChange={updateField}
//                 errors={errors}
//             />
//
//             <ImageUploader
//                 initialImage={InstitutionLogoFetch(initialData, logoSlug)}
//                 onFileSelected={setSelectedLogoFile}
//             />
//
//             {formError && <ErrorForm message={formError} />}
//
//             {loading && <div className="text-gray-500">Saving...</div>}
//         </div>
//     )
// }





























// "use client"
//
// import React, { useState, useEffect, useCallback } from "react"
// import { useToastError } from "@/srs/hooks/use-toast-error"
// import { useToastSuccess } from "@/srs/hooks/use-toast-success"
// import { Institution_Types } from "@/srs/types/institution.types"
// import { InstitutionsFields } from "@/srs/components/Forms/FieldsForms/institution-fields"
// import { ImageUploader } from "@/srs/components/Forms/Uploads/image-uploader"
// import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error"
// import { useZodForm } from "@/srs/hooks/use-zod-form"
// import { institutionSchema } from "@/srs/schemas/institution.schema"
// import { InstitutionLogoFetch } from "@/srs/lib/awsS3Bucket/institution-logo-fetch"
//
// interface Props {
//     pageTitle: string
//     slug: string
//     logoSlug: string
//     initialData?: Institution_Types
//     onSuccess?: (data: Institution_Types) => void
//     registerSubmit?: (submitFn: () => Promise<void>) => void
// }
//
// export const InstitutionForm = ({pageTitle, slug, logoSlug, initialData, onSuccess, registerSubmit,}: Props) => {
//     const isEdit = Boolean(initialData?.id)
//     const { showError } = useToastError()
//     const { showSuccess } = useToastSuccess()
//
//     const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)
//     const [loading, setLoading] = useState(false)
//     const [formError, setFormError] = useState<string | null>(null)
//
//     const { form, errors, updateField, validateForm } = useZodForm(
//         institutionSchema,
//         {
//             institutionName: initialData?.institutionName ?? "",
//             institutionEmail: initialData?.institutionEmail ?? "",
//             institutionContactNumber: initialData?.institutionContactNumber ?? "",
//             primaryColor: initialData?.primaryColor ?? "",
//             secondaryColor: initialData?.secondaryColor ?? "",
//         }
//     )
//
//     const handleSubmit = useCallback(async () => {
//         setLoading(true)
//         setFormError(null)
//
//         const payload = validateForm()
//         if (!payload) {
//             setLoading(false)
//             return
//         }
//
//         const institutionId = initialData?.id ?? crypto.randomUUID()
//
//         try {
//             const response = await fetch(
//                 `/api/${slug}${isEdit ? `/${institutionId}` : ""}`,
//                 {
//                     method: isEdit ? "PUT" : "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 }
//             )
//             if (!response.ok) throw new Error("Failed to save institution")
//
//             if (selectedLogoFile) {
//                 const formData = new FormData()
//                 formData.append("File", selectedLogoFile)
//                 formData.append("InstitutionId", institutionId)
//                 await fetch(`/api/${logoSlug}`, { method: "POST", body: formData })
//             }
//
//             const updatedInstitution: Institution_Types = { id: institutionId, ...payload }
//             showSuccess(`${pageTitle} ${isEdit ? "updated" : "created"} successfully`)
//             onSuccess?.(updatedInstitution)
//         } catch (err: any) {
//             setFormError(err?.message || "Something went wrong")
//             showError(err)
//         } finally {
//             setLoading(false)
//         }
//     }, [slug, logoSlug, isEdit, onSuccess, initialData?.id, selectedLogoFile, showError, showSuccess, pageTitle])
//
//     useEffect(() => {
//         registerSubmit?.(handleSubmit)
//     }, [registerSubmit, handleSubmit])
//
//     return (
//         <div className="flex flex-col gap-4 w-full">
//             <InstitutionsFields 
//                 {...form} 
//                 onChange={updateField} 
//                 errors={errors} 
//             />
//            
//             <ImageUploader
//                 initialImage={InstitutionLogoFetch(initialData, logoSlug)}
//                 onFileSelected={setSelectedLogoFile}
//             />
//            
//             {formError && <ErrorForm message={formError} />}
//         </div>
//     )
// }































// "use client"
//
// import React, {
//     useState,
//     useEffect,
//     useCallback,
// } from "react"
//
// import { useToastError } from "@/srs/hooks/use-toast-error"
// import { useToastSuccess } from "@/srs/hooks/use-toast-success"
// import { Institution_Types } from "@/srs/types/institution.types"
// import { InstitutionsFields } from "@/srs/components/Forms/FieldsForms/institution-fields"
// import { ImageUploader } from "@/srs/components/Forms/Uploads/image-uploader"
// import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error"
// import { useZodForm } from "@/srs/hooks/use-zod-form"
// import { institutionSchema } from "@/srs/schemas/institution.schema"
// import { InstitutionLogoFetch } from "@/srs/lib/awsS3Bucket/institution-logo-fetch"
//
// interface Props {
//     pageTitle: string
//     slug: string
//     logoSlug: string
//     initialData?: Institution_Types
//     onSuccess?: (data: Institution_Types) => void
//     registerSubmit?: (submitFn: () => Promise<void>) => void
// }
//
// export const InstitutionForm = ({pageTitle, slug, logoSlug, initialData, onSuccess, registerSubmit }: Props) => {
//
//     const isEdit = Boolean(initialData?.id)
//
//     const { showError } = useToastError()
//     const { showSuccess } = useToastSuccess()
//
//     const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)
//
//     const [loading, setLoading] = useState(false)
//     const [formError, setFormError] = useState<string | null>(null)
//
//     const { form, errors, updateField, validateForm } =
//         useZodForm(institutionSchema, {
//             institutionName: initialData?.institutionName ?? "",
//             institutionEmail: initialData?.institutionEmail ?? "",
//             institutionContactNumber:
//                 initialData?.institutionContactNumber ?? "",
//             primaryColor: initialData?.primaryColor ?? "",
//             secondaryColor: initialData?.secondaryColor ?? "",
//         })
//
//     const handleSubmit = useCallback(async () => {
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
//         const institutionId = initialData?.id ?? crypto.randomUUID()
//         try {
//             const response = await fetch(
//                 `/api/${slug}${isEdit ? `/${institutionId}` : ""}`,
//                 {
//                     method: isEdit ? "PUT" : "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(payload),
//                 }
//             )
//
//             if (!response.ok) {
//                 setFormError("Failed to save institution")
//             }
//
//             // Upload logo if exists
//             if (selectedLogoFile) {
//                 const formData = new FormData()
//                 formData.append("File", selectedLogoFile)
//                 formData.append("InstitutionId", institutionId)
//
//                 await fetch(`/api/${logoSlug}`, {
//                     method: "POST",
//                     body: formData,
//                 })
//             }
//
//             const updatedInstitution: Institution_Types = {
//                 id: institutionId,
//                 ...payload,
//             }
//
//             showSuccess(
//                 `${pageTitle} ${isEdit ? "updated" : "created"} successfully`
//             )
//
//             onSuccess?.(updatedInstitution)
//
//         } catch (err: any) {
//             setFormError(err?.message || "Something went wrong")
//             showError(err)
//         } finally {
//             setLoading(false)
//         }
//
//     }, [
//         slug, logoSlug, isEdit, onSuccess, initialData?.id
//     ])
// 
//     useEffect(() => {
//         registerSubmit?.(handleSubmit)
//     }, [])
//
//     return (
//         <div className="flex flex-col gap-4 w-full">
//
//             <InstitutionsFields
//                 {...form}
//                 onChange={updateField}
//                 errors={errors}
//             />
//
//             <ImageUploader
//                 initialImage={InstitutionLogoFetch(
//                     initialData,
//                     logoSlug
//                 )}
//                 onFileSelected={setSelectedLogoFile}
//             />
//
//             {formError && <ErrorForm message={formError} />}
//         </div>
//     )
// }


























// 'use client'
//
// import React, {useState, FormEvent, useEffect} from 'react'
// import { useToastError } from "@/srs/hooks/use-toast-error";
// import { useToastSuccess } from "@/srs/hooks/use-toast-success";
// import { Institution_Types } from "@/srs/types/institution.types";
// import { InstitutionsFields } from "@/srs/components/Forms/FieldsForms/institution-fields";
// import { ImageUploader } from "@/srs/components/Forms/Uploads/image-uploader";
// import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error";
// import { useZodForm } from "@/srs/hooks/use-zod-form";
// import { institutionSchema } from "@/srs/schemas/institution.schema";
// import { InstitutionLogoFetch } from "@/srs/lib/awsS3Bucket/institution-logo-fetch";
// import { Button } from "@/srs/components/common/button";
//
// interface Props {
//     pageTitle: string;
//     slug: string;
//     logoSlug: string;
//     initialData?: Institution_Types
//     onSuccess?: () => void;
//     registerSubmit?: (submitFn: (e: React.FormEvent) => Promise<void>) => void;
// }
//
// export const InstitutionForm = ({pageTitle, slug, logoSlug, initialData, onSuccess, registerSubmit}: Props) => {
//     const isEdit = Boolean(initialData?.id)
//     const { showError } = useToastError()
//     const { showSuccess } = useToastSuccess()
//
//     const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)
//     const [loading, setLoading] = useState(false)
//     const [formError, setFormError] = useState<string | null>(null)
//
//     const { form, errors, updateField, validateForm } = useZodForm(institutionSchema, {
//         institutionName: initialData?.institutionName ?? "",
//         institutionEmail: initialData?.institutionEmail ?? "",
//         institutionContactNumber: initialData?.institutionContactNumber ?? "",
//         primaryColor: initialData?.primaryColor ?? "",
//         secondaryColor: initialData?.secondaryColor ?? "",
//     })
//
//     const requiredFields = [
//         form.institutionName,
//         form.institutionEmail,
//         form.institutionContactNumber,
//         form.primaryColor,
//         form.secondaryColor,
//     ]
//
//     const isFormIncomplete = requiredFields.some(v => !v.trim())
//
//     // const handleSubmit = async (e: FormEvent) => {
//     //     e.preventDefault()
//     //     setLoading(true)
//     //     setFormError(null)
//     //
//     //     const payload = validateForm()
//     //     if (!payload) {
//     //         setLoading(false)
//     //         return
//     //     }
//     //
//     //     try {
//     //         // Use actual ID for edit or generate new for create
//     //         const institutionId = initialData?.id ?? crypto.randomUUID()
//     //
//     //         // Replace with actual create/update API
//     //         await fetch(`/api/${slug}${isEdit ? `/${institutionId}` : ""}`, {
//     //             method: isEdit ? "PUT" : "POST",
//     //             headers: { 'Content-Type': 'application/json' },
//     //             body: JSON.stringify(payload),
//     //         })
//     //
//     //         if (selectedLogoFile) {
//     //             const formData = new FormData()
//     //             formData.append("File", selectedLogoFile)
//     //             formData.append("InstitutionId", institutionId)
//     //
//     //             await fetch(`/api/${logoSlug}`, {
//     //                 method: "POST",
//     //                 body: formData,
//     //             })
//     //         }
//     //
//     //         showSuccess(`${pageTitle} ${isEdit ? "updated" : "created"} successfully`)
//     //         onSuccess?.()
//     //
//     //     } catch (err: any) {
//     //         setFormError(err?.message || "Something went wrong")
//     //         showError(err)
//     //     } finally {
//     //         setLoading(false)
//     //     }
//     // }
//
//
//     const handleInternalSubmit = async (e: FormEvent) => {
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
//         try {
//             const institutionId = initialData?.id ?? crypto.randomUUID()
//
//             await fetch(`/api/${slug}${isEdit ? `/${institutionId}` : ""}`, {
//                 method: isEdit ? "PUT" : "POST",
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//             })
//
//             if (selectedLogoFile) {
//                 const formData = new FormData()
//                 formData.append("File", selectedLogoFile)
//                 formData.append("InstitutionId", institutionId)
//
//                 await fetch(`/api/${logoSlug}`, {
//                     method: "POST",
//                     body: formData,
//                 })
//             }
//
//             showSuccess(`${pageTitle} ${isEdit ? "updated" : "created"} successfully`)
//             onSuccess?.()
//
//         } catch (err: any) {
//             setFormError(err?.message || "Something went wrong")
//             showError(err)
//         } finally {
//             setLoading(false)
//         }
//     };
//        
//    useEffect(() => { 
//        if (registerSubmit) { 
//            registerSubmit(handleInternalSubmit);
//        } 
//        }, [registerSubmit]);
//    
//
//     return (
//         <form onSubmit={handleInternalSubmit} className="flex flex-col gap-4 w-full">
//            
//             <InstitutionsFields {...form} onChange={updateField} errors={errors} />
//
//             <ImageUploader
//                 initialImage={InstitutionLogoFetch(initialData, logoSlug)}
//                 onFileSelected={setSelectedLogoFile}
//                 disabled={isFormIncomplete}
//             />
//
//             {formError && <ErrorForm message={formError} />}
// 
//             <div className="flex justify-end mt-4">
//                 <Button
//                     type="submit"
//                     variant="success"
//                     loading={loading}
//                     isDisabled={isFormIncomplete}
//                 >
//                     {isEdit ? "Update" : "Create"} {pageTitle}
//                 </Button>
//             </div>
//         </form>
//     )
// }






























// 'use client'
//
// import React, {useState, FormEvent} from 'react'
// import { useRouter } from 'next/navigation' 
// import {useToastError} from "@/srs/hooks/use-toast-error";
// import {useZodForm} from "@/srs/hooks/use-zod-form"; 
// import {ModalHeader} from "@/srs/components/common/modal-header";
// import {ModalBody, } from "@/srs/components/common/modal-body";
// import {ModalFooter} from "@/srs/components/common/modal-footer"; 
// import { Institution_Types } from "@/srs/types/institution.types";
// import { InstitutionsFields } from "@/srs/components/Forms/FieldsForms/institution-fields";
// import { ImageUploader } from "@/srs/components/Forms/Uploads/image-uploader";
// import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error";
// import {Button} from "@/srs/components/common/button";
// import {ModalTitle} from "@/srs/components/common/modal-title";
// import {institutionSchema} from "@/srs/schemas/institution.schema";
// import {useToastSuccess} from "@/srs/hooks/use-toast-success";
// import {InstitutionLogoFetch} from "@/srs/lib/awsS3Bucket/institution-logo-fetch";
//
// interface Props {
//     pageTitle: string
//     slug: string
//     logoSlug: string
//     initialData?: Institution_Types
//     onSuccess?: () => void
// }
//
// export const InstitutionForm = ({ pageTitle, slug, logoSlug, initialData, onSuccess }: Props) => {
//     const router = useRouter()
//     const isEdit = Boolean(initialData?.id)
//     const {showError} = useToastError()
//     const {showSuccess} = useToastSuccess();
//
//     const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
//
//     const {
//         form,
//         errors,
//         formError,
//         setFormError,
//         updateField,
//         validateForm,
//     } = useZodForm(institutionSchema, {
//         institutionName: initialData?.institutionName ?? "",
//         institutionEmail: initialData?.institutionEmail ?? "",
//         institutionContactNumber: initialData?.institutionContactNumber ?? "",
//         primaryColor: initialData?.primaryColor ?? "",
//         secondaryColor: initialData?.secondaryColor ?? "",
//     })
//
//     const [loading, setLoading] = useState(false)
//
//     const requiredFields = [
//         form.institutionName,
//         form.institutionEmail,
//         form.institutionContactNumber,
//         form.primaryColor,
//         form.secondaryColor,
//     ]
//
//     const isFormIncomplete = requiredFields.some(v => !v.trim())
//
//
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setFormError(null);
//
//         const payload = validateForm();
//         if (!payload) {
//             setLoading(false);
//             return;
//         }
//
//         try { 
//             const institutionId = "dba788c5-82db-4b0f-a7a5-8e5549036f09";
//            
//             console.log("returned institutionId ==: ", institutionId);
//
//             if (selectedLogoFile) {
//                 const formData = new FormData();
//
//                 formData.append("File", selectedLogoFile);
//                 formData.append("InstitutionId", institutionId); 
//
//                 const uploadRes = await fetch(`/api/${logoSlug}`, { 
//                     method: "POST", 
//                     body: formData 
//                 }); 
//             } 
//         } catch (err) {
//             showError(err);
//         } finally {
//             setLoading(false);
//         }
//     };
//    
//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
//             <ModalHeader>
//                 <ModalTitle isEdit={isEdit} pageTitle={pageTitle}/>
//             </ModalHeader>
//             <ModalBody>
//                 <InstitutionsFields
//                     {...form}
//                     onChange={updateField}
//                     errors={errors}
//                 />
//                
//                 <ImageUploader 
//                     initialImage={InstitutionLogoFetch(initialData, logoSlug)} 
//                     disabled={isFormIncomplete} 
//                     onFileSelected={(file) => setSelectedLogoFile(file)}
//                 />
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
//                     isDisabled={isFormIncomplete}
//                     isEdit={isEdit}
//                     pageTitle={pageTitle}
//                 />
//             </ModalFooter>
//         </form>
//     )
// }




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