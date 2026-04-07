'use client'

import { ReactNode } from 'react'
import { ModalSize } from '@/srs/types/ui.types'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    footer?: ReactNode
    width?: ModalSize
}

const widthMap: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    full: 'w-full'
}

export const Modal = (
    {
        isOpen,
        onClose,
        title,
        children,
        footer,
        width = '4xl'
    }: ModalProps) => {

    if (!isOpen) return null

    const widthClass = widthMap[width]

    return (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`bg-white w-full ${widthClass} max-h-[90vh] rounded-xl flex flex-col overflow-hidden`}
            >
                <div className="flex-shrink-0 px-6 py-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-black text-lg"
                    >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-4">
                    {children}
                </div>

                {footer && (
                    <div className="flex-shrink-0 px-6 py-4 border-t">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}