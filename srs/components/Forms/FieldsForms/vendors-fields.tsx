interface Props {
    vendorsName: string
    emailAddress: string
    contactInfo: string
    onChange: (field: 'vendorsName'|'emailAddress'|'contactInfo', value: string) => void
    error?: string | null
}

export const VendorsFields = ({ vendorsName, emailAddress, contactInfo, onChange, error }: Props) => {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="vendorsName" className="block mb-2 font-bold text-gray-500">Vendors Name</label>
                <input
                    value={vendorsName}
                    onChange={(e) => onChange('vendorsName', e.target.value)}
                    placeholder="vendorsName"
                    className={`w-full border p-2 rounded ${!vendorsName.trim() && error ? 'border-red-500' : ''}`}
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="emailAddress" className="block mb-2 font-bold text-gray-500">emailAddress</label>
                <input
                    value={emailAddress}
                    onChange={(e) => onChange('emailAddress', e.target.value)}
                    placeholder="emailAddress"
                    className={`w-full border p-2 rounded ${!emailAddress.trim() && error ? 'border-red-500' : ''}`}
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="contactInfo" className="block mb-2 font-bold text-gray-500">contactInfo</label>
                <input
                    value={contactInfo}
                    onChange={(e) => onChange('contactInfo', e.target.value)}
                    placeholder="contactInfo"
                    className={`w-full border p-2 rounded ${!contactInfo.trim() && error ? 'border-red-500' : ''}`}
                    required
                />
            </div>
        </>
    )
}
