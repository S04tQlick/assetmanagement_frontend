"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/Modal" 
import { AssetCategory_Types } from "@/srs/types/assetCategory-Types";
import AssetCategoryDetailClient from "@/srs/components/Forms/DetailsForms/asset-category-details";
import {Button} from "@/srs/components/common/Button";

interface ListProps {
    pageTitle: string;
    slug: string;
    assetCategories: AssetCategory_Types[]
}

export const AssetCategoriesList = ({ pageTitle, slug, assetCategories }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<AssetCategory_Types | null>(null)

    const handleView = (item: AssetCategory_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {assetCategories.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">{item.assetCategoryName}</h2>

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
                    <AssetCategoryDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        assetCategory={selected}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    )
}