"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/modal"
import AssetDetailClient from "@/srs/components/Forms/DetailsForms/asset-details";
import {Button} from "@/srs/components/common/button";
import { Asset_Types } from "@/srs/types/asset.types";

interface ListProps {
    pageTitle: string;
    slug: string;
    assets: Asset_Types[]
}

export const AssetsList = ({ pageTitle, slug, assets }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Asset_Types | null>(null)

    const handleView = (item: Asset_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {assets.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">{item.assetName}</h2>

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
                    <AssetDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        asset={selected}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    )
}