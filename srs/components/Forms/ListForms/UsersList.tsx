"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import {Button} from "@/srs/components/common/Button";
import { User_Types } from "@/srs/types/user-Types";
import UserDetailClient from "@/srs/components/Forms/DetailsForms/user-details";

interface ListProps {
    pageTitle: string;
    slug: string;
    users: User_Types[]
}

export const UsersList = ({ pageTitle, slug, users }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<User_Types | null>(null)

    const handleView = (item: User_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {users.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">{item.displayName}</h2>

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

            <Modal open={open} onClose={() => setOpen(false)} size="md">
                {selected && (
                    <UserDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        user={selected}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    )
}