"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import { AssetTypeForm } from "@/srs/components/Forms/DataForms/AssetTypeForm"
import { AssetType_Types } from "@/srs/types/assetType-Types"
import { ModalHeader } from "@/srs/components/common/ModalHeader"
import { ModalBody } from "@/srs/components/common/ModalBody"
import {ModalFooter} from "@/srs/components/common/ModalFooter";
import {Button} from "@/srs/components/common/Button";

interface Props {
    pageTitle: string
    slug: string
    assetType: AssetType_Types
    onClose: () => void
}

export default function AssetTypeDetailClient({ pageTitle, slug, assetType, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)

    return (
        <>
            <div className="space-y-4">
                <ModalHeader>{assetType.assetTypeName}</ModalHeader>
                <ModalBody>
                    <ul>
                        {assetType.description && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">Description:</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {assetType.description}
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
                <AssetTypeForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={assetType}
                    onSuccess={() => {
                        setEditOpen(false)
                        onClose()
                    }}
                />
            </Modal>
        </>
    )
}