"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/modal" 
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import {ModalFooter} from "@/srs/components/common/modal-footer";
import {Button} from "@/srs/components/common/button";
import {AssetCategory_Types} from "@/srs/types/asset-category.types";
import {AssetCategoryForm} from "@/srs/components/Forms/DataForms/asset-category-form";
import {AssetTypeForm} from "@/srs/components/Forms/DataForms/asset-type-form";
import {DeleteModal} from "@/srs/components/ui-components/modal-component/delete-modal"; 

interface Props {
    pageTitle: string
    slug: string
    assetCategory: AssetCategory_Types
    onClose: () => void
}

export default function AssetCategoryDetailClient({ pageTitle, slug, assetCategory, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    
    console.log("pageTitle ===:",pageTitle)
    console.log("slug ===:",slug)
    console.log("assetCategory ===:",assetCategory)

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
                            onClick={() => setDeleteOpen(true)}
                            variant={"danger"}
                        >
                            Delete
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

            <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} size={"sm"}>
                <DeleteModal
                    pageTitle={pageTitle}
                    slug={slug}
                    id={assetCategory.id}
                    recordName={assetCategory.assetCategoryName}
                    onSuccess={() => {
                        setDeleteOpen(false)
                        onClose()
                    }}
                />
            </Modal>
            
        </>
    )
}