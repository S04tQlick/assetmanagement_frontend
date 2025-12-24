"use client"

export const ModalBody = ({ children }: { children: React.ReactNode }) => (
    <div className="flex-1 overflow-y-auto p-5">
        {children}
    </div>
);