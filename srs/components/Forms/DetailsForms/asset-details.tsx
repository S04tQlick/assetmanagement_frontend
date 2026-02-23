"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/modal" 
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import {ModalFooter} from "@/srs/components/common/modal-footer";
import {Button} from "@/srs/components/common/button";
import {Asset_Types} from "@/srs/types/asset.types";
import {AssetForm} from "@/srs/components/Forms/DataForms/asset-form";
import {DeleteModal} from "@/srs/components/ui-components/modal-component/delete-modal"; 

interface Props {
    pageTitle: string
    slug: string
    asset: Asset_Types
    onClose: () => void
}

export default function AssetDetailClient({ pageTitle, slug, asset, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
            <div className="space-y-4">
                <ModalHeader>{asset.assetName}</ModalHeader>
                <ModalBody>
                    <ul>
                        {asset.assetTypes && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Asset Type:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {asset.assetTypes.assetTypeName}
                                </p>
                            </li>
                        )}
                        {asset.institutions && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Institution:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {asset.institutions.institutionName}
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
                <AssetForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={asset}
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
                    id={asset.id}
                    recordName={asset.assetName}
                    onSuccess={() => {
                        setDeleteOpen(false)
                        onClose()
                    }}
                />
            </Modal>
            
        </>
    )
}