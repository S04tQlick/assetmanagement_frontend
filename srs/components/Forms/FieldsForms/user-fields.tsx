'use client'

import { Input } from "@/srs/components/common/Input"
import React from "react";

interface Props {
    firstName: string
    lastName: string
    phoneNumber: string 
    onChange: (
        field:
            | "firstName"
            | "lastName"
            | "phoneNumber",
        value: string
    ) => void

    errors?: Record<string, string>
}

export const UserFields = ({firstName, lastName, phoneNumber, onChange, errors = {}}: Props) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="text"
                        label="First Name"
                        value={firstName}
                        onChange={(val) => onChange("firstName", val)}
                        required={true}
                        error={errors?.firstName}
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="text"
                        label="Last Name"
                        value={lastName}
                        onChange={(val) => onChange("lastName", val)}
                        required={true}
                        error={errors?.lastName}
                    />
                </div>

                <div className="col-span-12">
                    <Input
                        type="tel"
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(val) => onChange("phoneNumber", val)}
                        required={true}
                        error={errors?.phoneNumber}
                    />
                </div>
            </div>
        </>
    )
}