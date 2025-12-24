'use client'

import React from "react";
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";

interface TextareaProps {
    label?: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    error?: string | null
    rows?: number
    required?: boolean
    disabled?: boolean
    className?: string
}

export const Textarea: React.FC<TextareaProps> = ({label, value, onChange, placeholder, error, rows = 4, required, disabled, className = "",}) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const raw = e.target.value
        if (raw.trim() === "") {
            onChange("")
            return
        }

        onChange(raw)
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            )}
            <textarea
                rows={rows}
                value={value}
                onChange={handleChange}
                required={required}
                disabled={disabled}
                className={`
                    shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm 
                    w-full rounded border px-3 py-2 text-sm
                    focus:outline-none focus:ring-2
                    ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"}
                    ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-transparent"}
                    ${className}
                `}
            />

            {error && (
                <ErrorForm message={error}/>
            )}
        </div>
    )
}