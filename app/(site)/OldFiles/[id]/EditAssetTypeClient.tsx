"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import { AssetTypeForm } from "@/srs/components/Forms/DataForms/AssetTypeForm"
import { AssetType_Types } from "@/srs/types/assetType-Types"

interface EditAssetTypeClientProps {
    pageTitle: string
    slug: string
    assetType: AssetType_Types
}

export default function EditAssetTypeClient({pageTitle, slug, assetType}: EditAssetTypeClientProps) {
    const [open, setOpen] = useState(true)

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <AssetTypeForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={assetType}
                    onSuccess={() => setOpen(false)}
                />
            </Modal>
        </>
    )
}
