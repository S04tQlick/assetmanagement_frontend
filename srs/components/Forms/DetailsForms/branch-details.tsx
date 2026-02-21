"use client"

import React, {useState} from "react"
import { Modal } from "@/srs/components/common/modal" 
import { Branch_Types } from "@/srs/types/branch.types"
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import {ModalFooter} from "@/srs/components/common/modal-footer"; 
import {Button} from "@/srs/components/common/button";
import DynamicGeolocationPicker from "@/srs/components/Maps/dynamic-geolocation-picker";
import {BranchForm} from "@/srs/components/Forms/DataForms/branch-form";
import {InstitutionLogoFetch} from "@/srs/lib/awsS3Bucket/institution-logo-fetch";
import {useDropdowns} from "@/srs/hooks/use-dropdowns";

interface Props {
    pageTitle: string
    slug: string
    logoSlug: string
    branch: Branch_Types
    onClose: () => void
}

export default function BranchDetailClient({ pageTitle, slug, logoSlug, branch, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)
    
    const {data: dropdowns} = useDropdowns(
        [`institutions/${branch.institutionId}`],
        (data) => ({
            institutions: data[0].data ?? [],
        })
    )
    
    console.log("dropdowns.institutions   ==:", dropdowns)
    
    return (
        <>
            <div className="flex flex-col flex-1 min-h-0">
                <ModalHeader>
                    {branch.branchName}
                </ModalHeader>
                <ModalBody>
                    <ul>
                        {branch.isHeadOffice && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"isHeadOffice:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {branch.isHeadOffice ? "True" : "False"}
                                </p>
                            </li>
                        )}
                        {branch.latitude && branch.longitude && (
                            <li>
                                <div className="relative z-0">
                                    <DynamicGeolocationPicker
                                        logo={InstitutionLogoFetch(dropdowns?.institutions, logoSlug)}
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