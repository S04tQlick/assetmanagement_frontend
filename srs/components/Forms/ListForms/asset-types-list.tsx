"use client"

import React, { useState } from "react"
import { Modal } from "@/srs/components/common/modal"
import {AssetType_Types} from "@/srs/types/asset-type.types";
import AssetTypeDetailClient from "@/srs/components/Forms/DetailsForms/asset-type-details";
import {Button} from "@/srs/components/common/button";

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
                    <li key={item.id}
                        className="border p-4 rounded shadow-sm hover:bg-gray-200 transition-colors flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
                        <div className="flex items-start gap-3 md:items-center md:flex-1">
                            <p className="text-sm font-bold text-gray-900 leading-snug break-words md:text-balance">
                                {item.assetTypeName}
                            </p>
                        </div>
                        <div className="flex justify-end md:justify-end">
                            <Button
                                onClick={() => handleView(item)}
                                variant="success_bd"
                                className="flex-shrink-0"
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
