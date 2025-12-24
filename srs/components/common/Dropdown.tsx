import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";
import React from "react";

interface DropdownProps<T> {
    label: string
    value: string
    options: T[]
    optionLabel: (item: T) => string
    optionValue: (item: T) => string
    onChange: (value: string) => void
    required?: boolean
    error?: string
}

export function Dropdown<T> ({label, value, options, optionLabel, optionValue, onChange, required = false, error}: DropdownProps<T>) {
    return (
        <div className="grid grid-cols-12 gap-6 mb-5">
            <div className="col-span-12">
                <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    className={`
                    shadow-sm bg-gray-50 border-gray-300 text-gray-900 sm:text-sm
                    w-full rounded border p-2 text-sm
                    focus:outline-none focus:ring-2
                    ${error ? "border-red-500 focus:ring-red-300" : "border-gray-900 focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"}
                `}
                >
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                        <option key={optionValue(opt)} value={optionValue(opt)}>
                            {optionLabel(opt)}
                        </option>
                    ))}
                </select>
                {error && <ErrorForm message={error}/>}
            </div>
        </div>
    )
}