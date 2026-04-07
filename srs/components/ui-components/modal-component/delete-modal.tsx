'use client'

import { Button } from '@/srs/components/common/button'
import {ModalSize} from "@/srs/types/ui.types";
import {Modal} from "@/srs/components/common/modal";


interface DeleteModalProps {
    pageTitle: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    children: React.ReactNode;
    width?: ModalSize
}

export const DeleteModal = (
    {
        pageTitle,
        isOpen,
        onClose,
        onConfirm,
        loading,
        children,
        width,
    }: DeleteModalProps) => {
    
    if (!isOpen) return null;


        return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Delete ${pageTitle}`}
            width={width}
            footer={
                <div className="flex justify-end gap-3 w-full">
                    <Button variant="secondary" onClick={onClose} loading={loading}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onConfirm} loading={loading}>
                        Delete
                    </Button>
                </div>
            }
        >
            {children}
       </Modal>
    )
}