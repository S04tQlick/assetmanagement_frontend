"use client";

import React from "react";
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error";

interface ImageInputProps {
    label?: string;
    preview?: string | null;
    onChange: (file: File | null) => void;
    error?: string | null;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({label, preview, onChange, error, disabled = false, required = false, className = "" }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onChange(file);
    };

    const hasPreview = Boolean(preview && preview.trim() !== "");

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-900">
                    {label}
                </label>
            )}

            {hasPreview && (
                <img src={preview!}
                     alt="Selected image preview"
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
                    w-full rounded border px-3 py-2 text-sm shadow-sm
                    focus:outline-none focus:ring-2
                    ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-cyan-600"}
                    ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    ${className}
                `}
            />

            {error && <ErrorForm message={error}/>}
        </div>
    );
}