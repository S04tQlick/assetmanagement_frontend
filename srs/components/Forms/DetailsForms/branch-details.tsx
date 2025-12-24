"use client"

import React, { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import { BranchForm } from "@/srs/components/Forms/DataForms/BranchForm"
import { Branch_Types } from "@/srs/types/branch-Types"
import { ModalHeader } from "@/srs/components/common/ModalHeader"
import { ModalBody } from "@/srs/components/common/ModalBody"
import {ModalFooter} from "@/srs/components/common/ModalFooter"; 
import {Button} from "@/srs/components/common/Button";
import DynamicGeolocationPicker from "@/srs/components/Maps/DynamicGeolocationPicker";

interface Props {
    pageTitle: string
    slug: string
    branch: Branch_Types
    onClose: () => void
}

export default function BranchDetailClient({ pageTitle, slug, branch, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)

    return (
        <>
            <div className="flex flex-col flex-1 min-h-0">
                <ModalHeader>
                    {branch.branchName}
                </ModalHeader>
                <ModalBody>
                    <ul>
                        {branch.institutions && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Institution:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {branch.institutions.institutionName}
                                </p>
                            </li>
                        )}
                        {branch.isHeadOffice && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Institution:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {branch.isHeadOffice ? "True" : "False"}
                                </p>
                            </li>
                        )}
                        {branch.latitude && branch.longitude && (
                            <li>
                                <div className="relative z-0">
                                    <DynamicGeolocationPicker
                                        logo={branch.institutions.logoUrl}
                                        lat={branch.latitude}
                                        lng={branch.longitude}
                                        readOnly
                                    />
                                </div>
                                <small>
                                    ({branch.latitude}, {branch.longitude})
                                </small>
                            </li>
                        )}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <div className="flex mt-4 space-x-3">
                        <Button variant="success" onClick={() => setEditOpen(true)}> Edit </Button>
                        <Button variant="secondary" onClick={onClose}> Close </Button>
                    </div>
                </ModalFooter>
            </div>

            <Modal open={editOpen} onClose={() => setEditOpen(false)} size={"xl"}>
                <BranchForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={branch}
                    onSuccess={() => {
                        setEditOpen(false)
                        onClose()
                    }}
                />
            </Modal>
        </>
    )
}