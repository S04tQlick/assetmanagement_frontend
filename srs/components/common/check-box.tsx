"use client";

import React from "react";
import { ErrorForm } from "@/srs/components/Forms/ErrorForms/form-error";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    error?: string;
}

export function Checkbox({
                             label,
                             checked,
                             onChange,
                             disabled = false,
                             error
                         }: CheckboxProps) {
    return (
        <div className="grid grid-cols-12 gap-6 mb-5">
            <div className="col-span-12 flex items-center">
                <input
                    id={label}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked)}
                    className={`h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600
                        ${error ? "border-red-500 focus:ring-red-300" : ""}`}
                />

                <label
                    htmlFor={label}
                    className="ml-2 text-sm font-medium text-gray-900"
                >
                    {label}
                </label>
            </div>

            {error && (
                <div className="col-span-12">
                    <ErrorForm message={error} />
                </div>
            )}
        </div>
    );
}
