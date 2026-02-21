'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'

export const  Breadcrumb = () => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    return (
        <div className="sticky top-[64px] z-40 bg-amber-800 py-3 px-4 text-sm text-white shadow-sm">
            <nav className="flex items-center space-x-2">
                <Link href="/" className="hover:underline">Home</Link>
                {segments.map((segment, index) => {
                    const href = '/' + segments.slice(0, index + 1).join('/')
                    const label = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                    return (
                        <span key={href} className="flex items-center space-x-2">
                            <span>/</span>
                            <Link href={href} className="hover:underline">{label}</Link>
                        </span>
                    )
                })}
            </nav>
        </div>
    )
}
