'use client'

import { useState } from "react";
import { Asset_Types } from "@/srs/types/asset.types"
import { ModalHeader } from "@/srs/components/common/modal-header"
import { ModalBody } from "@/srs/components/common/modal-body"
import { ModalFooter } from "@/srs/components/common/modal-footer";
import { DetailGrid } from "@/srs/components/common/detail-grid"
import { toDateOnly } from "@/srs/utils/to-date-only"
import { Button } from "@/srs/components/common/button";
import { Modal } from "@/srs/components/common/modal";
import { AssetForm } from "@/srs/components/Forms/DataForms/asset-form";
import {DeleteConfirmModal} from "@/srs/components/ui-components/modal-component/delete-confirm-modal"

interface Props {
    pageTitle: string
    slug: string
    asset: Asset_Types
    onClose: () => void
}

export default function AssetDetailClient({ pageTitle, slug, asset, onClose }: Props) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    
    return (
        <>
            <div className="flex flex-col flex-1 min-h-0">
                <ModalHeader>{asset.assetName}</ModalHeader>
                
                <ModalBody>
                    <DetailGrid items={
                        [
                            {label: "serialNumber", value: asset.serialNumber},
                            {label: "purchaseDate", value: toDateOnly(asset.purchaseDate)},
                            {label: "purchasePrice", value: Number(asset.purchasePrice)},
                            {label: "usefulLifeYears", value: Number(asset.usefulLifeYears)},
                            {label: "unitsTotal", value: Number(asset.unitsTotal)},
                            {label: "currentUnits", value: Number(asset.currentUnits)},
                            {label: "maintenanceDueDate", value: toDateOnly(asset.maintenanceDueDate)},
                            {label: "salvageValue", value: Number(asset.salvageValue)},
                            {label: "depreciationMethod", value: asset.depreciationMethod},
                            {label: "currentValue", value: Number(asset.currentValue)},
                            {label: "accumulatedDepreciation", value: Number(asset.accumulatedDepreciation)},
                            {label: "nextMaintenanceDate", value: toDateOnly(asset.nextMaintenanceDate)},
                            {label: "branchId", value: asset.branchId},
                            {label: "assetCategoryId", value: asset.assetCategoryId},
                            {label: "assetTypeId", value: asset.assetTypeId},
                            {label: "vendorId", value: asset.vendorId},
                            {label: "institutionId", value: asset.institutionId},
                        ]}
                    />
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
                <AssetForm
                    pageTitle={pageTitle}
                    slug={slug}
                    initialData={asset}
                    onSuccess={() => {
                        setEditOpen(false)
                        onClose()
                    }}
                />
            </Modal>
            
            <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} size={"sm"}>
                <DeleteConfirmModal
                    pageTitle={pageTitle}
                    slug={slug}
                    id={asset.id}
                    recordName={asset.assetName}
                    onSuccess={() => {
                        setDeleteOpen(false)
                        onClose()
                    }}
                />
            </Modal>
        </>
    )
}