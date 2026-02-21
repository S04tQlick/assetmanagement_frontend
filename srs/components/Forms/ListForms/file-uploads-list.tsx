"use client"

import React, { useState } from "react"
import { Modal } from "@/srs/components/common/modal"
import {Button} from "@/srs/components/common/button";
import { FileUpload_Types } from "@/srs/types/file-upload.types";
import FileUploadDetailClient from "@/srs/components/Forms/DetailsForms/file-upload-details";
import {FileUploadPreview} from "@/srs/lib/awsS3Bucket/file-upload-preview";

interface ListProps {
    pageTitle: string;
    slug: string;
    fileUploads: FileUpload_Types[]
}

export const FileUploadsList = ({ pageTitle, slug, fileUploads }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<FileUpload_Types | null>(null)

    const handleView = (item: FileUpload_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {fileUploads.map((item) => (
                    <li key={item.id}
                        className="border p-4 rounded shadow-sm hover:bg-gray-200 transition-colors flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
                        
                        <div className="flex items-start gap-3 md:items-center md:flex-1">
                            <img
                                className="rounded-full h-10 w-10 object-cover bg-gray-100 flex-shrink-0"
                                src={FileUploadPreview(item, slug)}
                                alt={`${item.institutionId} logo`}
                            />

                            <p className="text-sm font-bold text-gray-900 leading-snug break-words md:text-balance">
                                {item.s3Key}
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
                    <FileUploadDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        fileUpload={selected}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    )
}
