"use client"

import { ReactNode } from "react"
import {Button} from "@/srs/components/common/Button";

interface ModalProps {
    open: boolean
    onClose: () => void
    children: ReactNode
    size?: "sm" | "md" | "lg" | "xl" | "full"
}

const sizeClasses = {
    sm:  "max-w-sm",
    md:  "max-w-md",
    lg:  "max-w-lg",
    xl:  "max-w-2xl",
    full: "max-w-full h-full rounded-none"
}


export const Modal = ({ open, onClose, children, size = "xl" }: ModalProps) => {
    if (!open) return null;

    const sizeClass = sizeClasses[size];

    return (
        <div className={"fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center overflow-y-auto"}>
            <div
                className={`
                    bg-white shadow-lg relative
                    w-full ${sizeClass}
                    max-h-[90vh]
                    flex flex-col overflow-hidden min-h-0
                    m-6
                `}
            >
                <Button
                    onClick={onClose}
                    size={"sm"}
                    variant={"ghost"}
                    className="absolute top-3 right-3 p-1.5"
                >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>

                {children}
            </div>
        </div>
    );
};