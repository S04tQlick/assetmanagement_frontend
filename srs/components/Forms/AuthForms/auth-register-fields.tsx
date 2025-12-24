'use client'

import { Input } from "@/srs/components/common/Input"
import React from "react";

interface Props {
    emailAddress: string
    passwordHash: string
    confirmPassword: string
    onChange: (
        field:
            | "emailAddress"
            | "passwordHash"
            | "confirmPassword",
        value: string
    ) => void
    
    errors?: Record<string, string>
}

export const AuthRegisterFields = ({emailAddress, passwordHash, confirmPassword, onChange, errors = {}}: Props) => {
    const passwordsMatch = passwordHash === confirmPassword
    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <Input
                        type="email"
                        label="Email Address"
                        value={emailAddress}
                        onChange={(val) => onChange("emailAddress", val)}
                        required={true}
                        error={errors?.emailAddress}
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="password"
                        label="passwordHash"
                        value={passwordHash}
                        onChange={(val) => onChange("passwordHash", val)}
                        required={true}
                        error={errors?.passwordHash}
                    />
                </div>

                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        disabled={!passwordHash.trim()}
                        onChange={(val) => onChange("confirmPassword", val)}
                        required={true}
                        //error={errors?.confirmPassword}
                        error={
                            confirmPassword && !passwordsMatch
                                ? "Passwords do not match"
                                : null
                        }
                    />

                    {confirmPassword && !passwordsMatch && (
                        <p className="text-red-600 text-sm mt-1">
                            Passwords do not match
                        </p>
                    )}
                </div> 
                
            </div>
        </>
    )
}

































// 'use client'
//
// import { Input } from "@/srs/components/common/Input"
//
// interface Props {
//     emailAddress: string
//     passwordHash: string
//     confirmPassword: string
//     onChange: (field: 'emailAddress' | 'passwordHash' | 'confirmPassword', value: string) => void
//     error?: string | null
//     isEdit?: boolean
// }
//
// export const AuthRegisterDetails = ({emailAddress, passwordHash, confirmPassword, onChange, error,}: Props) => {
//
//     const passwordsMatch = passwordHash === confirmPassword
//
//     return (
//         <>
//             <div className="grid grid-cols-12 gap-6">
//                 <div className="col-span-12">
//                     <Input
//                         label="Email Address"
//                         type="email"
//                         value={emailAddress}
//                         placeholder="Email Address"
//                         onChange={(val) => onChange("emailAddress", val)}
//                         error={!emailAddress.trim() && error ? "Email is required" : null}
//                     />
//                 </div>
//
//                 <div className="col-span-12 sm:col-span-6">
//                     <Input
//                         label="Password"
//                         type="password"
//                         value={passwordHash}
//                         placeholder="Password"
//                         onChange={(val) => onChange("passwordHash", val)}
//                         error={!passwordHash.trim() && error ? "Password is required" : null}
//                     />
//                 </div>
//
//                 <div className="col-span-12 sm:col-span-6">
//                     <Input
//                         label="Confirm Password"
//                         type="password"
//                         value={confirmPassword}
//                         placeholder="Confirm Password"
//                         disabled={!passwordHash.trim()}
//                         onChange={(val) => onChange("confirmPassword", val)}
//                         error={
//                             confirmPassword && !passwordsMatch
//                                 ? "Passwords do not match"
//                                 : null
//                         }
//                     />
//
//                     {confirmPassword && !passwordsMatch && (
//                         <p className="text-red-600 text-sm mt-1">
//                             Passwords do not match
//                         </p>
//                     )}
//                 </div>
//             </div>
//         </>
//     )
// }











































// interface Props {
//     emailAddress: string
//     passwordHash: string
//     confirmPassword: string
//     onChange: (field: 'emailAddress' | 'passwordHash' | 'confirmPassword', value: string) => void
//     error?: string | null
//     isEdit?: boolean
// }
//
// export const AuthRegisterDetails = ({emailAddress, passwordHash, confirmPassword, onChange, error,}: Props) => {
//     const passwordsMatch = passwordHash === confirmPassword
//
//     return (
//         <>
//             <div className="mb-5">
//                 <label htmlFor="emailAddress" className="block mb-2 font-bold text-gray-500">
//                     Email Address
//                 </label>
//                 <input
//                     type="email"
//                     id="emailAddress"
//                     value={emailAddress}
//                     onChange={(e) => onChange('emailAddress', e.target.value)}
//                     placeholder="Email Address"
//                     className={`w-full border p-2 rounded ${
//                         !emailAddress.trim() && error ? 'border-red-500' : ''
//                     }`}
//                     required
//                 />
//             </div>
//
//             <div className="mb-5">
//                 <label htmlFor="passwordHash" className="block mb-2 font-bold text-gray-500">
//                     Password
//                 </label>
//                 <input
//                     type="password"
//                     id="passwordHash"
//                     value={passwordHash}
//                     onChange={(e) => onChange('passwordHash', e.target.value)}
//                     placeholder="Password"
//                     className={`w-full border p-2 rounded ${
//                         !passwordHash.trim() && error ? 'border-red-500' : ''
//                     }`}
//                     required
//                 />
//             </div>
//
//             <div className="mb-5">
//                 <label htmlFor="confirmPassword" className="block mb-2 font-bold text-gray-500">
//                     Confirm Password
//                 </label>
//                 <input
//                     type="password"
//                     id="confirmPassword"
//                     value={confirmPassword}
//                     onChange={(e) => onChange('confirmPassword', e.target.value)}
//                     placeholder="Confirm Password"
//                     disabled={!passwordHash.trim()}
//                     className={`w-full border p-2 rounded ${
//                         confirmPassword && !passwordsMatch ? 'border-red-500' : ''
//                     }`}
//                     required
//                 />
//                 {confirmPassword && !passwordsMatch && (
//                     <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
//                 )}
//             </div>
//         </>
//     )
// }
