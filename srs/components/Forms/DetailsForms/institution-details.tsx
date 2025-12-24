"use client"

import React, { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import { InstitutionForm } from "@/srs/components/Forms/DataForms/InstitutionForm "
import { Institution_Types } from "@/srs/types/institution-Types"
import { ModalHeader } from "@/srs/components/common/ModalHeader"
import { ModalBody } from "@/srs/components/common/ModalBody"
import {ModalFooter} from "@/srs/components/common/ModalFooter";
import {ModalTitle} from "@/srs/components/common/ModalTitle";
import {InstitutionsFields} from "@/srs/components/Forms/FieldsForms/institution-fields";
import {ImageUploader} from "@/srs/components/Forms/Uploads/ImageUploader";
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";
import {Button} from "@/srs/components/common/Button";

interface Props {
    pageTitle: string
    slug: string
    institution: Institution_Types
    onClose: () => void
}

export default function InstitutionDetailClient({ pageTitle, slug, institution, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)

    return (
        <>
            <div className="flex flex-col flex-1 min-h-0">
                <ModalHeader>
                    {institution.institutionName}
                </ModalHeader>
                <ModalBody>
                    <ul>
                        {institution.institutionEmail && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">Description:</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {institution.institutionEmail}
                                </p>
                            </li>
                        )}
                            {institution.institutionContactNumber && (
                                <li>
                                    <span className="font-bold text-black dark:text-gray-900">institutionContactNumber:</span>
                                    <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                        {institution.institutionContactNumber}
                                    </p>
                                </li>
                            )}
                            {institution.primaryColor && (
                                <li>
                                    <span className="font-bold text-black dark:text-gray-900">primaryColor:</span>
                                    <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                        {institution.primaryColor}
                                    </p>
                                </li>
                            )}
                            {institution.secondaryColor && (
                                <li>
                                    <span className="font-bold text-black dark:text-gray-900">secondaryColor:</span>
                                    <p className="text-black dark:text-gray-900 text-sm mt-2">
                                        {institution.secondaryColor}
                                    </p>
                                </li>
                            )}
                            {institution.logoUrl && (
                                <li>
                                    <span className="font-bold text-black dark:text-gray-900">logoUrl:</span>
                                    <p className="text-black dark:text-gray-900 text-sm mt-2">
                                        {institution.logoUrl}
                                    </p>
                                    <img src={institution.logoUrl}
                                         alt={`${institution.institutionName} logo`}
                                         className="max-w-xs md:max-w-sm m-auto"
                                    />
                                </li>
                            )}
                    </ul>

                </ModalBody>
                <ModalFooter>
                    <div className="flex mt-4 space-x-3">
                        <Button variant="success" onClick={() => setEditOpen(true)} > Edit </Button>
                        <Button variant="secondary" onClick={onClose} > Close </Button>
                    </div> 
                </ModalFooter>
            </div>
            
            <Modal open={editOpen} onClose={() => setEditOpen(false)} size={"xl"}>
                <InstitutionForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={institution}
                    onSuccess={() => {
                        setEditOpen(false)
                        onClose()
                    }}
                />
            </Modal>
        </>
    )
}