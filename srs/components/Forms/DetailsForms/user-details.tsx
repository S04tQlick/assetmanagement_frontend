"use client"

import React, { useState } from "react"
import { Modal } from "@/srs/components/common/Modal" 
import { ModalHeader } from "@/srs/components/common/ModalHeader"
import { ModalBody } from "@/srs/components/common/ModalBody"
import {ModalFooter} from "@/srs/components/common/ModalFooter"; 
import {Button} from "@/srs/components/common/Button"; 
import { User_Types } from "@/srs/types/user-Types"
import {UserForm} from "@/srs/components/Forms/DataForms/UserForm";

interface Props {
    pageTitle: string
    slug: string
    user: User_Types
    onClose: () => void
}

export default function UserDetailClient({ pageTitle, slug, user, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)

    return (
        <>
            <div className="flex flex-col flex-1 min-h-0">
                <ModalHeader>
                    {user.displayName}
                </ModalHeader>
                <ModalBody>
                    <ul>
                        {user.emailAddress && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Email Address:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {user.emailAddress}
                                </p>
                            </li>
                        )}
                        {user.phoneNumber && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Phone Number:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {user.phoneNumber}
                                </p>
                            </li>
                        )}
                        {user.institutions && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Institution:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {user.institutions.institutionName}
                                </p>
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
                <UserForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={user}
                    onSuccess={() => {
                        setEditOpen(false)
                        onClose()
                    }}
                />
            </Modal>
        </>
    )
}