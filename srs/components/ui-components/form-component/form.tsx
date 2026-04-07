"use client"

import React, { useEffect, useCallback } from "react"
import { z, ZodObject } from "zod"
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error"
import { useZodForm } from "@/srs/hooks/use-zod-form"
import { useToastError } from "@/srs/hooks/use-toast-error"
import { useToastSuccess } from "@/srs/hooks/use-toast-success"
import { useCrudCallBackForm } from "@/srs/hooks/use-crud-form-call-back"

interface FormProps<TSchema extends ZodObject<any>, TEntity extends z.infer<TSchema> & { id?: string }> {
    pageTitle: string
    slug: string
    schema: TSchema
    initialData?: TEntity
    defaultValues: z.infer<TSchema>
    onSuccess?: (data: TEntity) => void
    registerSubmit?: (submitFn: () => Promise<void>) => void

    FieldsComponent: React.FC<TEntity & {
        onChange: <K extends keyof TEntity>(field: K, value: TEntity[K]) => void
        errors: Partial<Record<keyof TEntity, string>> }>
}

export function Form<TSchema extends ZodObject<any>, TEntity extends z.infer<TSchema> & { id?: string }>(
    {
        pageTitle, 
        slug, 
        schema, 
        initialData, 
        defaultValues, 
        onSuccess, 
        registerSubmit, 
        FieldsComponent,
    }: FormProps<TSchema, TEntity>
) {

    const isEdit = Boolean(initialData?.id)
    const {showError} = useToastError()
    const {showSuccess} = useToastSuccess()

    const mergedDefaults = {
        ...defaultValues,
        ...(initialData ?? {}),
    } as TEntity

    const {
        form,
        errors,
        updateField,
        validateForm,
        formError,
    } = useZodForm<TSchema, TEntity>(schema, mergedDefaults)

    const {loading, submitForm} = useCrudCallBackForm<TEntity>(
        {
            slug,
            isEdit,
            initialData,
            showError,
            showSuccess,
            onSuccess,
            pageTitle,
        }
    )

    const handleSubmit = useCallback(async () => {
        const validated = validateForm()

        if (!validated) return

        await submitForm(validated)

    }, [validateForm, submitForm])

    useEffect(() => {
        registerSubmit?.(handleSubmit)
    }, [registerSubmit, handleSubmit])

    return (
        <div className="flex flex-col gap-4 w-full p-5">
            <FieldsComponent
                {...form}
                onChange={updateField}
                errors={errors}
            />

            {formError && <ErrorForm message={formError}/>}

            {loading && <div className="text-gray-500">Saving...</div>}
        </div>
    )
}