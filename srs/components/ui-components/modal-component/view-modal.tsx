'use client'

import { ReactNode } from 'react'
import { Button } from '@/srs/components/common/button'
import { Modal } from '@/srs/components/common/modal'
import { ModalSize } from '@/srs/types/ui.types'

interface ViewModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    onEdit?: () => void
    onDelete?: () => void
    loading?: boolean
    width?: ModalSize
}

export const ViewModal = (
    {
        isOpen,
        onClose,
        title,
        children,
        onEdit,
        onDelete,
        loading = false,
        width = '2xl'
    }: ViewModalProps) => {  
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Details of :- { ${title} }`}
            width={width}
            footer={
                <div className="flex justify-between w-full">
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={onClose} loading={loading}>
                            Cancel
                        </Button>
                    </div>

                    <div className="flex gap-3">
                        {onEdit && (
                            <Button variant="success" onClick={onEdit} loading={loading}>
                                Edit
                            </Button>
                        )}

                        {onDelete && (
                            <Button variant="danger" onClick={onDelete} loading={loading}>
                                Delete
                            </Button>
                        )}
                    </div>
                </div>
            }
        >
            {children}
        </Modal>
    )
}