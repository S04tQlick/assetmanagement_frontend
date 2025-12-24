"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import {AssetType_Types} from "@/srs/types/assetType-Types";
import AssetTypeDetailClient from "@/srs/components/Forms/DetailsForms/asset-type-details";
import {Button} from "@/srs/components/common/Button";

interface ListProps {
    pageTitle: string;
    slug: string;
    assetTypes: AssetType_Types[]
}

export const AssetTypesList = ({ pageTitle, slug, assetTypes }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<AssetType_Types | null>(null)

    const handleView = (item: AssetType_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {assetTypes.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">{item.assetTypeName}</h2>

                            <Button
                                onClick={() => handleView(item)}
                                variant={"success_bd"}
                            >
                                View →
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal open={open} onClose={() => setOpen(false)} size={"md"}>
                {selected && (
                    <AssetTypeDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        assetType={selected}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    )
}
