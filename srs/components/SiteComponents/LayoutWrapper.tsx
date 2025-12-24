'use client'


import { usePathname } from 'next/navigation'
import {ToastContainer} from "react-toastify";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isHome = pathname === '/'

    return isHome ? (
        <main>{children}</main>
    ) : (
        <main>
            <div className="min-h-screen py-10 px-10">
                {children}
                <ToastContainer position="top-right" autoClose={5000}/>
            </div>
        </main>
    )
}
