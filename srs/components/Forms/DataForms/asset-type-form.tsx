"use client"

import React from "react"
import { AssetType_Types } from "@/srs/types/asset-type.types"
import { assetTypeSchema } from "@/srs/schemas/asset-type.schema"
import { AssetTypesFields } from "@/srs/components/Forms/FieldsForms/asset-type-fields"
import {Form} from "@/srs/components/ui-components/form-component/form";

interface Props {
    pageTitle: string
    slug: string
    initialData?: AssetType_Types
    onSuccess?: (data: AssetType_Types) => void
    registerSubmit?: (submitFn: () => Promise<void>) => void
}

export const AssetTypeForm = (props: { 
    pageTitle: string
    slug: string
    initialData?: AssetType_Types
    onSuccessAction?: (data: AssetType_Types) => void
    registerSubmitAction?: (submitFn: () => Promise<void>) => void 
}) => {
    
    return (
        <Form
            pageTitle={props.pageTitle}
            slug={props.slug}
            schema={assetTypeSchema}
            initialData={props.initialData}
            defaultValues={{
                assetTypeName: "",
                description: "",
            }}
            onSuccess={props.onSuccessAction}
            registerSubmit={props.registerSubmitAction}
            FieldsComponent={AssetTypesFields}
        />
    )
}