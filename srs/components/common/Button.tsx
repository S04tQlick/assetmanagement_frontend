"use client";

import clsx from "clsx";
import React from "react";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: 
        "primary" |
        "primary_bd" |
        "secondary" |
        "secondary_bd" |
        "warning" |
        "warning_bd" |
        "success" |
        "success_bd" |
        "danger" |
        "danger_bd" |
        "ghost" |
        "ghost_bd" ;
    
    size?: 
        "sm" | 
        "md" | 
        "lg";
    
    loading?: boolean;
    isDisabled?: boolean;
    isEdit?: boolean;
    pageTitle?: string;
    className?: string;
    
    type?: 
        "button" | 
        "submit" | 
        "reset";
}

export const Button = ({
                           children,
                           onClick,
                           type = "button",
                           variant = "primary",
                           size = "md",
                           loading = false,
                           isDisabled = false,
                           isEdit = false,
                           pageTitle,
                           className = "",
                       }: ButtonProps) => { 
    const autoLabel = loading
        ? "Saving..."
        : isEdit
            ? `Update ${pageTitle}`
            : `Add ${pageTitle}`;

    const label = children ?? autoLabel;

    const base =
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:ring-2";

    const variants = {
        primary: "border bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
        primary_bd: "border bg-transparent text-blue-700 border border-blue-600 hover:text-blue-900 hover:border-blue-900 focus:ring-blue-400",
        
        secondary: "border bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
        secondary_bd: "border bg-transparent text-gray-700 border border-gray-600 hover:text-gray-900 hover:border-gray-900 focus:ring-gray-400",
        
        success: "border bg-green-700 text-white hover:bg-green-800 focus:ring-green-400",
        success_bd: "border bg-transparent text-green-700 border border-green-600 hover:text-green-900 hover:border-green-900 focus:ring-green-400",

        warning: "border bg-orange-700 text-white hover:bg-orange-800 focus:ring-orange-400",
        warning_bd: "border bg-transparent text-orange-700 border border-orange-600 hover:text-orange-900 hover:border-orange-900 focus:ring-orange-400",
        
        danger: "border bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
        danger_bd: "border bg-transparent text-red-700 border border-red-600 hover:text-red-900 hover:border-red-900 focus:ring-red-400",
        
        ghost: "border bg-transparent text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
        ghost_bd: "border bg-transparent text-gray-700 border border-gray-600 hover:text-gray-900 hover:border-gray-900 focus:ring-gray-400",
    };

    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2 text-md",
        lg: "px-4 py-3 text-base",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled || loading}
            className={clsx(
                base,
                variants[variant],
                sizes[size],
                (isDisabled || loading) && "opacity-30 cursor-not-allowed",
                className
            )}
        >
            {loading ? "Loading..." : label}
        </button>
    );
};