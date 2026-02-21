'use client'

import { useState } from "react"
import { z } from "zod"

type FieldErrors<T> = Partial<Record<keyof T, string>>

export function useZodForm<T extends z.ZodTypeAny, O extends Record<string, any> = z.infer<T> & Record<string, any>>(schema: T, initial: O) {
    const [form, setForm] = useState<O>(initial)
    const [errors, setErrors] = useState<FieldErrors<O>>({})
    const [formError, setFormError] = useState<string | null>(null)

    const normalize = (value: any) => {
        if (typeof value === "string") return value.trimStart()
        return value
    }

    const updateField = <K extends keyof O>(field: K, value: O[K]) => {
        const normalized = normalize(value)

        setForm(prev => ({
            ...prev,
            [field]: normalized,
        }))

        const shape = (schema as any)?.shape
        if (shape && shape[field as string]) {
            const fieldSchema = shape[field as string] as z.ZodTypeAny
            const result = fieldSchema.safeParse(normalized)

            if (!result.success) {
                const issue = result.error.issues[0]
                setErrors(prev => ({ ...prev, [field]: issue.message }))
            } else {
                setErrors(prev => ({ ...prev, [field]: "" }))
            }
        }
    }

    const validateForm = () => {
        const result = schema.safeParse(form)

        if (!result.success) {
            const fieldErrors: FieldErrors<O> = {}

            result.error.issues.forEach(issue => {
                const field = issue.path[0] as keyof O
                fieldErrors[field] = issue.message
            })

            setErrors(fieldErrors)
            return null
        }

        setErrors({})
        return result.data
    }

    return {
        form,
        errors,
        formError,
        setFormError,
        updateField,
        validateForm,
        setForm,
    }
}





















// 'use client'
//
// import { useState } from "react"
// import { ZodObject, ZodRawShape, ZodTypeAny } from "zod" 
//
// type FieldErrors<T> = Partial<Record<keyof T, string>>
//
// export function useZodForm<T extends ZodRawShape>(schema: ZodObject<T>, initial: { [K in keyof T]: any }) {
//     const [form, setForm] = useState(initial)
//     const [errors, setErrors] = useState<FieldErrors<typeof initial>>({})
//     const [formError, setFormError] = useState<string | null>(null)
//
//     const normalize = (value: any) => {
//         if (typeof value === "string") return value.trimStart()
//         return value
//     }
//
//     const updateField = <K extends keyof typeof initial>(field: K, value: (typeof initial)[K]) => {
//         const normalized = normalize(value)
//
//         setForm(prev => ({ ...prev, [field]: normalized }))
//
//         const fieldSchema = schema.shape[field as string] as ZodTypeAny
//
//         const result = fieldSchema.safeParse(normalized)
//
//         if (!result.success) {
//             const issue = result.error.issues[0]
//             setErrors(prev => ({ ...prev, [field]: issue.message }))
//         } else {
//             setErrors(prev => ({ ...prev, [field]: "" }))
//         }
//     }
//
//     const validateForm = () => {
//         const result = schema.safeParse(form)
//
//         if (!result.success) {
//             const fieldErrors: FieldErrors<typeof initial> = {}
//
//             result.error.issues.forEach(issue => {
//                 const field = issue.path[0] as keyof typeof initial
//                 fieldErrors[field] = issue.message
//             })
//
//             setErrors(fieldErrors)
//             return null
//         }
//
//         setErrors({})
//         return result.data
//     }
//
//     return {
//         form,
//         errors,
//         formError,
//         setFormError,
//         updateField,
//         validateForm,
//         setForm,
//     }
// }