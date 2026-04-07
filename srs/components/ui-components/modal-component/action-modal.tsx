'use client'

import { ReactNode } from 'react'
import { Button } from '@/srs/components/common/button'
import { Modal } from '@/srs/components/common/modal'
import { ModalSize } from '@/srs/types/ui.types'

type ModalMode = 'view' | 'edit' | 'delete' | 'custom'

interface ActionModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    mode?: ModalMode

    children?: ReactNode
 
    onSave?: () => void
    onEdit?: () => void
    onDelete?: () => void

    loading?: boolean
    width?: ModalSize
    height?: string | 'auto'

    primaryLabel?: string
    secondaryLabel?: string
}

export const ActionModal = (
    {
        isOpen,
        onClose,
        title,
        mode = 'view',
        children,
        onSave,
        onEdit,
        onDelete,
        loading = false,
        width = '2xl', 
        primaryLabel,
        secondaryLabel,
    }: ActionModalProps) => {

    const renderFooter = () => {
        switch (mode) {
            case 'view':
                return (
                    <div className="flex justify-between w-full">
                        <div className="flex gap-3">
                            {onEdit && (
                                <Button
                                    variant="success"
                                    onClick={onEdit}
                                    loading={loading}
                                >
                                    Edit
                                </Button>
                            )}

                            {onDelete && (
                                <Button
                                    variant="danger"
                                    onClick={onDelete}
                                    loading={loading}
                                >
                                    Delete
                                </Button>
                            )}
                        </div>

                        <Button
                            onClick={onClose}
                            className="bg-black text-white"
                            loading={loading}
                        >
                            Close
                        </Button>
                    </div>
                )

            case 'edit':
                return (
                    <div className="flex justify-end gap-3 w-full">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            loading={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="success"
                            onClick={onSave}
                            loading={loading}
                        >
                            {primaryLabel ?? 'Save'}
                        </Button>
                    </div>
                )

            case 'delete':
                return (
                    <div className="flex justify-end gap-3 w-full">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            loading={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="danger"
                            onClick={onDelete}
                            loading={loading}
                        >
                            {primaryLabel ?? 'Delete'}
                        </Button>
                    </div>
                )

            case 'custom':
                return (
                    <div className="flex justify-end gap-3 w-full">
                        {secondaryLabel && (
                            <Button
                                variant="secondary"
                                onClick={onClose}
                                loading={loading}
                            >
                                {secondaryLabel}
                            </Button>
                        )}

                        {primaryLabel && onSave && (
                            <Button
                                variant="success"
                                onClick={onSave}
                                loading={loading}
                            >
                                {primaryLabel}
                            </Button>
                        )}
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title ?? 'Modal'}
            width={width}
            footer={renderFooter()}
        >
            {children}
        </Modal>
    )
}