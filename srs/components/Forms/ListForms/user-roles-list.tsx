"use client"

import { useState } from "react" 
import {Button} from "@/srs/components/common/button";
import { UserRole_Types } from "@/srs/types/user-role.types";
import UserRoleDetailClient from "@/srs/components/Forms/DetailsForms/user-role-details";
import {Modal} from "@/srs/components/common/modal";

interface ListProps {
    pageTitle: string;
    slug: string;
    userRoles: UserRole_Types[]
}

export const UserRolesList = ({ pageTitle, slug, userRoles }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<UserRole_Types | null>(null)

    const handleView = (item: UserRole_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {userRoles.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">{item.users.displayName}</h2>

                            <Button
                                onClick={() => handleView(item)}
                                variant={"success_bd"}
                            >
                                View →
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal open={open} onClose={() => setOpen(false)} size="sm">
                {selected && (
                    <UserRoleDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        userRole={selected}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    )
}
