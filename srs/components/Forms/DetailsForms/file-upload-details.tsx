"use client"

import React, { useState } from "react"
import { Modal } from "@/srs/components/common/modal"
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import {ModalFooter} from "@/srs/components/common/modal-footer";
import {Button} from "@/srs/components/common/button";
import {DeleteModal} from "@/srs/components/ui-components/modal-component/delete-confirm-modal";
import {FileUpload_Types} from "@/srs/types/file-upload.types";
import {FileUploadForm} from "@/srs/components/Forms/DataForms/file-upload-form";
import {FileUploadPreview} from "@/srs/lib/awsS3Bucket/file-upload-preview";

interface Props {
    pageTitle: string
    slug: string
    fileUpload: FileUpload_Types
    onClose: () => void
}

export default function FileUploadDetailClient({ pageTitle, slug, fileUpload, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
            <div className="space-y-4">
                <ModalHeader>{fileUpload.institutionId}</ModalHeader>
                <ModalBody>
                    <ul>
                        {fileUpload.s3Key && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">Image:</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {fileUpload.s3Key}
                                </p>
                                <img
                                    className="rounded-full h-10 w-10 object-cover bg-gray-100 flex-shrink-0"
                                    src={FileUploadPreview(fileUpload, slug)}
                                    alt={`${fileUpload.institutionId} logo`}
                                />
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
                <FileUploadForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={fileUpload}
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
                    id={fileUpload.id}
                    recordName={fileUpload.institutionId}  
                    onSuccess={() => {
                        setDeleteOpen(false)
                        onClose() 
                    }}
                />
            </Modal>
        </>
    )
}