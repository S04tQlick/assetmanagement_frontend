"use client";

import React from "react";
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/FormError";

interface ImageInputProps {
    label?: string;
    preview?: string | null;
    onChange: (file: File | null) => void;
    error?: string | null;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({label, preview, onChange, error, disabled = false, required, className = "",}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            )}
            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-contain rounded border"
                />
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={disabled}
                required={required}
                className={`
                    shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm 
                    w-full rounded border px-3 py-2 text-sm
                    focus:outline-none focus:ring-2
                    ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-cyan-600"}
                    ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    ${className}
                `}
            />
            {error && <ErrorForm message={error} />}
        </div>
    );
};
