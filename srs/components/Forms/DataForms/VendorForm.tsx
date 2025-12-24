'use client'

import {useState, FormEvent, useEffect} from 'react'
import { useRouter } from 'next/navigation' 
import {Institution_Types} from "@/srs/types/institution-Types";
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";
import { Vendor_Types, Vendor_TypesInput } from "@/srs/types/vendor-Types";
import {VendorsFields} from "@/srs/components/Forms/FieldsForms/vendors-fields";
import {Dropdown} from "@/srs/components/common/Dropdown";

interface Props {
    pageTitle: string
    slug: string
    initialData?: Vendor_Types
}

export const VendorForm = ({ pageTitle, slug, initialData }: Props) => {
    const router = useRouter()
    const isEdit = !!initialData?.id

    const [form, setForm] = useState<Vendor_TypesInput>({
        vendorsName: initialData?.vendorsName || '',
        emailAddress: initialData?.emailAddress || '',
        contactInfo: initialData?.contactInfo || '', 
        institutionId: initialData?.institutionId || '',
    })

    const [institutions, setInstitutions] = useState<Institution_Types[]>([])

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [instRes] = await Promise.all([
                    fetch(`/api/institutions`), 
                ])

                const [instData] = await Promise.all([
                    instRes.json(), 
                ])

                if (instData.success) setInstitutions(instData.institutions)
            } catch (err) {
                console.error('Dropdown fetch error:', err)
            }
        }

        fetchOptions()
    }, [])


    const updateField = <K extends keyof Vendor_TypesInput>(
        field: K, value: Vendor_TypesInput[K]) => {
        setForm((prev) => ({...prev, [field]: value}))
    }

    const handleSubmit = async (e: FormEvent) => {
        
        e.preventDefault()
        setError(null)
        setLoading(true)

        const payload = {
            ...form
        }

        const url = isEdit
            ? `/api/${slug}/${initialData.id}`
            : `/api/${slug}`

        const method = isEdit ? 'PUT' : 'POST'

        try {
            const res = await fetch(url, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!data.success) {
                setError(data.error || 'Failed to save asset type.')
                setLoading(false)
                return
            }

            router.push(`/${slug}`)
        } catch (err) {
            //console.error('Save error:', err)
            console.error(`${pageTitle} save failed:`, err, payload)
            setError('Something went wrong. Please try again.')
            //setError(err.response?.data?.error ?? "Unexpected error.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <VendorsFields
                vendorsName={form.vendorsName}
                emailAddress={form.emailAddress}
                contactInfo={form.contactInfo}
                onChange={(field, value) => updateField(field, value)}
                error={error}
            />

            <Dropdown
                label="Institution"
                value={form.institutionId}
                options={institutions}
                optionLabel={(t) => t.institutionName}
                optionValue={(t) => t.id}
                onChange={(val) => updateField('institutionId', val)}
                required
            /> 

            {error &&  <ErrorForm message={error} /> }
            
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

































// 'use client'
//
// import {useState, FormEvent, useEffect} from 'react'
// import { useRouter } from 'next/navigation'
// import {AssetCategory_Types, AssetCategory_TypesInput} from "@/srs/types/assetCategory-Types";
// import {AssetCategoriesDetails} from "@/srs/components/Forms/DetailsForms/asset-category-details";
// import {InstitutionSelect} from "@/srs/components/Forms/DropdownForms/InstitutionSelect";
// import {Institution_Types} from "@/srs/types/institution-Types";
// import {AssetType_Types} from "@/srs/types/assetType-Types";
// import {AssetTypeSelect} from "@/srs/components/Forms/DropdownForms/AssetTypeSelect";
// 
//
// interface Props {
//     pageTitle: string
//     slug: string
//     initialData?: AssetCategory_Types
// }
//
// export const AssetCategoryForm = ({ pageTitle, slug, initialData }: Props) => {
//     const router = useRouter()
//     const isEdit = !!initialData?.id
//
//     const [form, setForm] = useState<AssetCategory_TypesInput>({
//         assetCategoryName: initialData?.assetCategoryName || '',
//         assetTypeId: initialData?.assetTypeId || '',
//         institutionId: initialData?.institutionId || '',
//     })
//    
//     const [institutions, setInstitutions] = useState<Institution_Types[]>([])
//     const [assetTypes, setAssetTypes] = useState<AssetType_Types[]>([])
//
//     const [error, setError] = useState<string | null>(null)
//     const [loading, setLoading] = useState(false)
//    
//     useEffect(() => {
//         const fetchOptions = async ()=>{
//             try {
//                 const[instRes,typeRes] = await Promise.all([
//                     fetch(`/api/institutions`),
//                     fetch(`/api/asset-types`),
//                 ])
//                
//                 const[instData,typeData] =  await Promise.all([
//                     instRes.json(),
//                     typeRes.json(),
//                 ])
//                
//                 if (instData.success) setInstitutions(instData.institutions)
//                 if (typeData.success) setAssetTypes(typeData.assetTypes)
//             }
//             catch(err) {
//                 console.error('Dropdown fetch error:', err)
//             }
//         }
//
//         fetchOptions()
//     }, [])
//
//
//     const updateField = <K extends keyof AssetCategory_TypesInput>(
//         field: K, value: AssetCategory_TypesInput[K]) => {
//         setForm((prev) => ({...prev, [field]: value}))
//     }
//
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault()
//         setError(null)
//         setLoading(true)
//
//         const payload = {
//             ...form
//         } 
//
//         const url = isEdit
//             ? `/api/${slug}/${initialData.id}`
//             : `/api/${slug}`
//
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
//                 setError(data.error || 'Failed to save asset type.')
//                 setLoading(false)
//                 return
//             }
//
//             router.push(`/${slug}`)
//         } catch (err) {
//             //console.error('Save error:', err)
//             console.error(`${pageTitle} save failed:`, err, payload)
//             setError('Something went wrong. Please try again.')
//             //setError(err.response?.data?.error ?? "Unexpected error.");
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
//             <AssetCategoriesDetails
//                 assetCategoryName={form.assetCategoryName} 
//                 onChange={(field, value) => updateField(field, value)}
//                 error={error}
//             />
//
//             <InstitutionSelect
//                 pageTitle={"Institution"}
//                 value={form.institutionId}
//                 institutions={institutions}
//                 onChange={(institution) => updateField('institutionId', institution)}
//                 error={error}
//             />
//
//             <AssetTypeSelect
//                 pageTitle={"Asset Type"}
//                 value={form.assetTypeId}
//                 assetTypes={assetTypes}
//                 onChange={(assetType) => updateField('assetTypeId', assetType)}
//                 error={error}
//             />
//            
//             {error && <p className="text-red-600">{error}</p>}
//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//                 {loading ? 'Saving...' : initialData?.id ? `Update ${pageTitle}` : `Create ${pageTitle}`}
//             </button>
//         </form>
//     )
// }
//















































//
//
//
//
//
//
//
//
//
//
//
//
//
// // 'use client'
// //
// // import {useEffect, useState} from 'react'
// // import { useRouter } from 'next/navigation'
// // import type { AssetType } from '@/sanity/types/AssetTypeType'
// // import type {AssetTypeInput} from "@/sanity/types/AssetTypeType";
// // import {generateSlug} from "@/sanity/utils/slug";
// //
// // interface AssetTypeFormProps {
// //     initialData?: AssetType
// // }
// //
// // export default function AssetTypeForm({ initialData }: AssetTypeFormProps) {
// //     const router = useRouter()
// //
// //     const [name, setName] = useState(initialData?.name || '')
// //     const [slug, setSlug] = useState(initialData?.slug?.current || '')
// //     const [description, setDescription] = useState(initialData?.description || '')
// //     const [error, setError] = useState<string | null>(null)
// //     const [loading, setLoading] = useState(false)
// //
// //     useEffect(() => {
// //         if (!initialData?._id) {
// //             setSlug(generateSlug(name))
// //         }
// //     }, [name, initialData?._id])
// //    
// //    
// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault()
// //         setError(null)
// //         setLoading(true)
// //
// //         const trimmedName = name.trim()
// //         if (!trimmedName) {
// //             setError('Name is required.')
// //             setLoading(false)
// //             return
// //         }
// //
// //         const payload: AssetTypeInput = { 
// //             _type: 'assetType',
// //             name: trimmedName,
// //             description,
// //             slug: { current: slug, _type: 'slug' },
// //             createdAt: initialData?.createdAt || new Date().toISOString(),
// //         }
// //        
// //         const url = initialData?._id
// //             ? `/api/asset-types/${initialData._id}`
// //             : '/api/asset-types'
// //
// //         const method = initialData?._id ? 'PATCH' : 'POST'
// //
// //         try {
// //             const res = await fetch(url, {
// //                 method,
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(payload),
// //             })
// //            
// //             const { success, error: apiError } = await res.json()
// //
// //             if (!success) {
// //                 setError(apiError || apiError?.join(', ') || 'Unknown error')
// //                 setLoading(false)
// //                 return
// //             }
// //
// //             router.push('/asset-types')
// //         } catch (err) {
// //             console.error('Save error:', err)
// //             setError('Something went wrong. Please try again.')
// //             //setError(`Failed to save asset-type: ${String(err)}`)
// //         } finally {
// //             setLoading(false)
// //         }
// //     }
// //
// //     return (
// //         <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
// //             <input
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 placeholder="Asset Type Name"
// //                 className="w-full border p-2 rounded"
// //                 required
// //             />
// //             <input
// //                 value={slug}
// //                 onChange={(e) => setSlug(e.target.value)}
// //                 placeholder="Slug"
// //                 className="w-full border p-2 rounded"
// //                 required
// //                 readOnly={!initialData?._id}
// //             />
// //             <textarea
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 placeholder="Description"
// //                 className="w-full border p-2 rounded"
// //             />
// //             {error && <p className="text-red-600">{error}</p>}
// //             <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //             >
// //                 {loading ? 'Saving...' : initialData?._id ? 'Update Asset Type' : 'Create Asset Type'}
// //             </button>
// //         </form>
// //     )
// // }
