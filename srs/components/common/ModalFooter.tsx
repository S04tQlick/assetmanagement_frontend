"use client"

import { ReactNode } from "react"

interface ModalFooterProps {
    children: ReactNode
}

export const ModalFooter = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center gap-3 p-4 border-t-3 border-gray-300 flex-shrink-0">
        {children}
    </div>
);