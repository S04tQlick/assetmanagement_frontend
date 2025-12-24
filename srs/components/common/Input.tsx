'use client'

import React from "react";
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";

interface InputProps {
    label?: string
    value: string | number
    onChange: (value: string) => void
    placeholder?: string
    type?: string
    error?: string | null
    disabled?: boolean
    required?: boolean
    className?: string
}

export const Input: React.FC<InputProps> = ({label, value, onChange, placeholder, type = "text", error, disabled = false, required, className = "",}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        if (raw.trim() === "") {
            onChange("")
            return
        }
        onChange(raw)
    }

    return (
        <div className="flex flex-col gap-1 w-full mb-3">
            {label && (
                <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            )}
            <input
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`
                    shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm
                    w-full rounded border p-2 text-sm
                    focus:outline-none focus:ring-2
                    ${error ? "border-red-500 focus:ring-red-300" : "border-gray-900 focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"}
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