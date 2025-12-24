import { Input } from "@/srs/components/common/Input"
import React from "react";

interface Props {
    institutionName: string
    institutionEmail: string
    institutionContactNumber: string
    primaryColor: string
    secondaryColor: string
    onChange: (
        field:
            | "institutionName"
            | "institutionEmail"
            | "institutionContactNumber"
            | "primaryColor"
            | "secondaryColor",
        value: string
    ) => void

    errors?: Record<string, string>
}

export const InstitutionsFields = ({institutionName, institutionEmail, institutionContactNumber, primaryColor, secondaryColor, onChange, errors = {}}: Props) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <Input
                        type="text"
                        label="institutionName"
                        value={institutionName}
                        onChange={(val) => onChange('institutionName', val)}
                        required={true}
                        error={errors?.institutionName}
                    />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="email"
                        label="institutionEmail"
                        value={institutionEmail}
                        onChange={(val) => onChange("institutionEmail", val)}
                        required={true}
                        error={errors?.institutionEmail}
                    />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="tel"
                        label="institutionContactNumber"
                        value={institutionContactNumber}
                        onChange={(val) => onChange("institutionContactNumber", val)}
                        required={true}
                        error={errors?.institutionContactNumber}
                    />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="text"
                        label="primaryColor"
                        value={primaryColor}
                        placeholder="#000000"
                        onChange={(val) => onChange("primaryColor", val)}
                        required={true}
                        error={errors?.primaryColor}
                    />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="text"
                        label="secondaryColor"
                        value={secondaryColor}
                        placeholder="#FFFFFF"
                        onChange={(val) => onChange("secondaryColor", val)}
                        required={true}
                        error={errors?.secondaryColor}
                    />
                </div>
            </div>
        </>
    )
}