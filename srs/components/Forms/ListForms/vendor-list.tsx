"use client"

import { useState } from "react"
import { Modal } from "@/srs/components/common/modal"
import {Button} from "@/srs/components/common/button";
import { Vendor_Types } from "@/srs/types/vendor.types";
import VendorDetailClient from "@/srs/components/Forms/DetailsForms/vendor-details";

interface ListProps {
    pageTitle: string;
    slug: string;
    vendors: Vendor_Types[]
}

export const VendorsList = ({ pageTitle, slug, vendors }: ListProps) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Vendor_Types | null>(null)

    const handleView = (item: Vendor_Types) => {
        setSelected(item)
        setOpen(true)
    }

    return (
        <>
            <ul className="space-y-6">
                {vendors.map((item) => (
                    <li key={item.id} className="border p-4 rounded shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">{item.vendorsName}</h2>

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

            <Modal open={open} onClose={() => setOpen(false)} size={"md"}>
                {selected && (
                    <VendorDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        vendor={selected}
                        onClose={() => setOpen(false)}
                    />
                )}
            </Modal>
        </>
    )
}