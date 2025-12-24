"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import {Button} from "@/srs/components/common/Button";
import { Branch_Types } from "@/srs/types/branch-Types";
import BranchDetailClient from "@/srs/components/Forms/DetailsForms/branch-details";

interface ListProps {
    pageTitle: string;
    slug: string;
    branches: Branch_Types[]
}

export const BranchesList = ({ pageTitle, slug, branches }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Branch_Types | null>(null)

    const handleView = (item: Branch_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {branches.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">{item.branchName}</h2>

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

            <Modal open={open} onClose={() => setOpen(false)} size="xl">
                {selected && (
                    <BranchDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        branch={selected}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    )
}