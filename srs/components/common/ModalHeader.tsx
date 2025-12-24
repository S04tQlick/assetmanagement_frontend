"use client"

import { ReactNode } from "react"

interface ModalHeaderProps {
    children: ReactNode
}
export const ModalHeader = ({ children }: { children: React.ReactNode }) => ( 
    <div className="flex items-center justify-between p-4 border-b-3 border-gray-300 flex-shrink-0"> 
        <h2 className="text-lg font-semibold">
            {children}
        </h2> 
    </div> 
);