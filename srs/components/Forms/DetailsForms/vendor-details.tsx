"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/modal" 
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import {ModalFooter} from "@/srs/components/common/modal-footer";
import {Button} from "@/srs/components/common/button";
import {DeleteModal} from "@/srs/components/ui-components/modal-component/delete-modal";
import {Vendor_Types} from "@/srs/types/vendor.types";
import {VendorForm} from "@/srs/components/Forms/DataForms/vendor-form"; 

interface Props {
    pageTitle: string
    slug: string
    vendor: Vendor_Types
    onClose: () => void
}

export default function VendorDetailClient({ pageTitle, slug, vendor, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
        <>
            <div className="space-y-4">
                <ModalHeader>{vendor.vendorsName}</ModalHeader>
                <ModalBody>
                    <ul>
                        {vendor.emailAddress && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Email Address:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {vendor.emailAddress}
                                </p>
                            </li>
                        )}
                        {vendor.contactInfo && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Contact Info:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {vendor.contactInfo}
                                </p>
                            </li>
                        )}
                        {vendor.institutions && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Institution:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {vendor.institutions.institutionName}
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
                <VendorForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={vendor}
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
                    id={vendor.id}
                    recordName={vendor.vendorsName}
                    onSuccess={() => {
                        setDeleteOpen(false)
                        onClose()
                    }}
                />
            </Modal>
            
        </>
    )
}