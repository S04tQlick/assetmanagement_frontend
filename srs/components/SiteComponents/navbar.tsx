'use client'

import { useState, useEffect, useRef } from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

type NavItem = {
    label: string
    href?: string
    children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
    // { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Vendors', href: '/vendors' },
    { label: 'Assets', href: '/assets' },
    { label: 'Providers', href: '/maintenance-providers' },
    {
        label: 'System Settings',
        children: [
            { label: 'Asset Types', href: '/asset-types' },
            { label: 'Institutions', href: '/institutions' },
            { label: 'Asset Categories', href: '/asset-categories' },
            { label: 'Branches', href: '/branches' },
            { label: 'Users', href: '/users' },
            { label: 'UserRoles', href: '/user-roles' },
        ],
    },
]

const NavLink = ({
                     label,
                     href,
                     className = '',
                 }: {
    label: string
    href: string
    className?: string
}) => (
    <Link href={href} className={`relative group ${className}`}>
        <span className="text-blue-100 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/20 group-hover:w-full transition-all duration-500 delay-100" />
    </Link>
)

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [dropdownDirection, setDropdownDirection] = useState<'left' | 'right'>('right')

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <header className="bg-blue-950 text-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="text-xl font-bold"><Link href={'/'}>OceanUI</Link></div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8" ref={dropdownRef}>
                    {navItems.map(({label, href, children}) =>
                        children ? (
                            <div key={label} className="relative">
                                <button
                                    onClick={() => {
                                        if (dropdownRef.current) {
                                            const rect = dropdownRef.current.getBoundingClientRect()
                                            const spaceRight = window.innerWidth - rect.right
                                            const spaceLeft = rect.left
                                            setDropdownDirection(spaceRight < 200 && spaceLeft > 200 ? 'left' : 'right')
                                        }
                                        setOpenDropdown(openDropdown === label ? null : label)
                                    }
                                } 
                                    className="text-blue-100 hover:text-white transition-colors duration-300"
                                >
                                    {/*{label}*/}
                                    <Cog6ToothIcon className="w-5 h-5"/>
                                </button>
                                {openDropdown === label && (
                                    <div
                                        className={`absolute mt-2 w-48 bg-blue-900 border border-blue-500/20 rounded shadow-lg z-10 ${
                                            dropdownDirection === 'left' ? 'right-0' : 'left-0'
                                        }`}
                                    >
                                        <ul className="py-2">
                                            {children.map((child) => (
                                                <li key={child.label}>
                                                    <a
                                                        href={child.href}
                                                        className="block px-4 py-2 text-blue-100 hover:text-white hover:bg-blue-800/50 transition"
                                                    >
                                                        {child.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink key={label} label={label} href={href!}/>
                        )
                    )}

                    <div
                        className="group flex h-15 w-15 cursor-pointer items-center justify-center rounded-3xl bg-white p-2 hover:bg-slate-200">
                        <div className="space-y-2">
                            <span className="block h-1 w-10 origin-center rounded-full bg-slate-500 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
                            <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
                        </div>
                    </div>
                    
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-blue-100 hover:text-white"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    className="md:hidden px-4 pb-4 space-y-2 bg-blue-900/80 backdrop-blur-sm border-t border-blue-500/10">
                    {navItems.map(({label, href, children}) =>
                        children ? (
                            <div key={label}>
                                <button
                                    onClick={() =>
                                        setOpenDropdown(openDropdown === label ? null : label)
                                    }
                                    className="w-full flex justify-between items-center text-blue-100 hover:text-white px-3 py-2 rounded-md transition"
                                >
                                    <span>{label}</span>
                                    <span>{openDropdown === label ? '▲' : '▼'}</span>
                                </button>
                                {openDropdown === label && (
                                    <ul className="pl-4 space-y-1">
                                        {children.map((child) => (
                                            <li key={child.label}>
                                                <a
                                                    href={child.href}
                                                    className="block px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-md transition"
                                                >
                                                    {child.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                key={label}
                                label={label}
                                href={href!}
                                className="block px-3 py-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-800/50 transition"
                            />
                        )
                    )}
                </div>
            )}
        </header>
    )
}




















// <header className="bg-white shadow-md sticky top-0 z-50">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
//         <Link href="/" className="flex items-center gap-2">
//             {/*<Image src="/logo.svg" alt="Logo" width={32} height={32} />*/}
//             <span className="font-bold text-lg text-gray-800">AssetFlow</span>
//         </Link>
//
//         <nav className="hidden md:flex gap-6 items-center">
//             <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
//             <Link href="/institutions" className="text-gray-700 hover:text-blue-600">Institutions</Link>
//             <Link href="/branches" className="text-gray-700 hover:text-blue-600">Branches</Link>
//             <Link href="/asset-types" className="text-gray-700 hover:text-blue-600">Asset Types</Link>
//             <Link href="/asset-categories" className="text-gray-700 hover:text-blue-600">Asset Categories</Link>
//             <Link href="/vendors" className="text-gray-700 hover:text-blue-600">Vendors</Link>
//             <Link href="/assets" className="text-gray-700 hover:text-blue-600">Assets</Link>
//             <Link href="/maintenance-providers" className="text-gray-700 hover:text-blue-600">Maintenance Provider</Link>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign In</button>
//         </nav>
//
//         <button
//             className="md:hidden text-gray-700 focus:outline-none"
//             onClick={() => setMenuOpen(!menuOpen)}
//         >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 {menuOpen ? (
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//             </svg>
//         </button>
//     </div>
//
//     {menuOpen && (
//         <nav className="md:hidden bg-white border-t">
//             <div className="px-4 py-2 space-y-2">
//                 <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
//                 <Link href="/institutions" className="text-gray-700 hover:text-blue-600">Institutions</Link>
//                 <Link href="/branches" className="text-gray-700 hover:text-blue-600">Branches</Link>
//                 <Link href="/asset-types" className="text-gray-700 hover:text-blue-600">Asset Types</Link>
//                 <Link href="/asset-categories" className="text-gray-700 hover:text-blue-600">Asset Categories</Link>
//                 <Link href="/vendors" className="text-gray-700 hover:text-blue-600">Vendors</Link>
//                 <Link href="/assets" className="text-gray-700 hover:text-blue-600">Assets</Link>
//                 <Link href="/maintenance-providers" className="text-gray-700 hover:text-blue-600">Maintenance Provider</Link>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign In</button>
//             </div>
//         </nav>
//     )}
// </header>




// const navItems = [
//     {label: 'Home', href: '/'},
//     {label: 'Dashboard', href: '/dashboard'},
//     {
//         label: 'System Settings',
//         children:
//             [
//                 {label: 'Institutions', href: '/institutions'},
//                 {label: 'Branches', href: '/branches'},
//                 {label: 'Asset Types', href: '/asset-types'},
//                 {label: 'Asset Categories', href: '/asset-categories'},
//             ],
//     },
//     {label: 'Vendors', href: '/vendors'},
//     {label: 'Assets', href: '/assets'},
//     {label: 'Maintenance Provider', href: '/maintenance-providers'},
// ]