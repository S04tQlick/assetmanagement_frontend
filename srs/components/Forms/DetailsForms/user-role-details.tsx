"use client"

import React, { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"  
import { ModalHeader } from "@/srs/components/common/ModalHeader"
import { ModalBody } from "@/srs/components/common/ModalBody"
import {ModalFooter} from "@/srs/components/common/ModalFooter"; 
import {Button} from "@/srs/components/common/Button"; 
import {UserRole_Types} from "@/srs/types/userRole-Types";
import { UserRoleForm } from "../AuthForms/user-role-form"

interface Props {
    pageTitle: string
    slug: string
    userRole: UserRole_Types
    onClose: () => void
}

export default function UserRoleDetailClient({ pageTitle, slug, userRole, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)

    return (
        <>
            <div className="flex flex-col flex-1 min-h-0">
                <ModalHeader>
                    {userRole.users.displayName}
                </ModalHeader>
                <ModalBody>
                    <ul>
                        {userRole.users && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Institution:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {userRole.users.emailAddress}
                                </p>
                            </li>
                        )}
                        {userRole.roles && (
                            <li>
                                <span className="font-bold text-black dark:text-gray-900">{"Institution:"}</span>
                                <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
                                    {userRole.roles.roleName}
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

            <Modal open={editOpen} onClose={() => setEditOpen(false)} size={"sm"}>
                <UserRoleForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={userRole}
                    onSuccess={() => {
                        setEditOpen(false)
                        onClose()
                    }}
                />
            </Modal>
        </>
    )
}