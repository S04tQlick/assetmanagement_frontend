'use client'

import { ReactNode, useState } from 'react'
import { Button } from '@/srs/components/common/button'
import { Modal } from '@/srs/components/common/modal'
import { ModalSize } from "@/srs/types/ui.types"

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    entityName?: string
    onSave?: () => Promise<void> | void
    children?: ReactNode
    width?: ModalSize
}

export const EditModal = (
    {
        isOpen,
        onClose,
        entityName,
        onSave,
        children,
        width = '2xl',
    }: EditModalProps) => {

    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        if (!onSave) return

        try {
            setSaving(true)
            await onSave()
        } finally {
            setSaving(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={entityName ? `Edit ${entityName}` : 'Edit'}
            width={width}
            footer={
                <div className="flex justify-end gap-3 w-full">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        loading={saving}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="success"
                        onClick={handleSave}
                        loading={saving}
                    >
                        Save
                    </Button>
                </div>
            }
        >
            {children}
        </Modal>
    )
}