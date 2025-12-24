"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import { AssetTypeForm } from "@/srs/components/Forms/DataForms/AssetTypeForm"
import { AssetType_Types } from "@/srs/types/assetType-Types"
import { ModalHeader } from "@/srs/components/common/ModalHeader"
import { ModalBody } from "@/srs/components/common/ModalBody"
import {ModalFooter} from "@/srs/components/common/ModalFooter";
import {Button} from "@/srs/components/common/Button";
import {AssetCategory_Types} from "@/srs/types/assetCategory-Types";
import {AssetCategoryForm} from "@/srs/components/Forms/DataForms/AssetCategoryForm";

interface Props {
    pageTitle: string
    slug: string
    assetCategory: AssetCategory_Types
    onClose: () => void
}

export default function AssetCategoryDetailClient({ pageTitle, slug, assetCategory, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)

    return (
        <>
            <div className="space-y-4">
                <ModalHeader>{assetCategory.assetCategoryName}</ModalHeader>
                <ModalBody>
                    <ul>
                        {assetCategory.assetTypes && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Asset Type:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {assetCategory.assetTypes.assetTypeName}
                                </p>
                            </li>
                        )}
                        {assetCategory.institutions && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Institution:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {assetCategory.institutions.institutionName}
                                </p>
                            </li>
                        )}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <div className="flex mt-4 space-x-3">
                        <Button
                            onClick={() => setEditOpen(true)}
                            variant={"success"}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={onClose}
                            variant={"secondary"}
                        >
                            Close
                        </Button>
                    </div>
                </ModalFooter>
            </div>

            <Modal open={editOpen} onClose={() => setEditOpen(false)} size={"md"}>
                <AssetCategoryForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={assetCategory}
                    onSuccess={() => {
                        setEditOpen(false)
                        onClose()
                    }}
                />
            </Modal>
        </>
    )
}