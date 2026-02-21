import { Input } from "@/srs/components/common/input"

interface Props {
    vendorsName: string
    emailAddress: string
    contactInfo: string
    onChange: (
        field:
            | "vendorsName" | "emailAddress" | "contactInfo",
        value: string
    ) => void

    errors?: Record<string, string>
}

export const VendorsFields = ({vendorsName, emailAddress, contactInfo, onChange, errors = {}}: Props) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <Input
                        label={"vendorsName"}
                        value={vendorsName}
                        onChange={(val) => onChange("vendorsName", val)}
                        required={true}
                        error={errors?.vendorsName}
                    />
                
                    <Input
                        type={"email"}
                        label={"emailAddress"}
                        value={emailAddress}
                        onChange={(val) => onChange("emailAddress", val)}
                        required={true}
                        error={errors?.emailAddress}
                    />
                
                    <Input
                        label={"contactInfo"}
                        value={contactInfo}
                        onChange={(val) => onChange("contactInfo", val)}
                        required={true}
                        error={errors?.contactInfo}
                    />
                </div>
            </div>
        </>
    )
}












