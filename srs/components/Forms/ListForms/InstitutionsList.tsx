"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/Modal"
import { Institution_Types } from "@/srs/types/institution-Types";
import InstitutionDetailClient from "@/srs/components/Forms/DetailsForms/institution-details";
import {Button} from "@/srs/components/common/Button";

interface ListProps {
    pageTitle: string;
    slug: string;
    institutions: Institution_Types[]
}

export const InstitutionsList = ({ pageTitle, slug, institutions }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Institution_Types | null>(null)

    const handleView = (item: Institution_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {institutions.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">{item.institutionName}</h2>

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
                    <InstitutionDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        institution={selected}
                        onClose={() => setOpen(false)}
                    />
                )}

            </Modal>
        </>
    )
}