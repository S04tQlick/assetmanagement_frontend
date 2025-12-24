import { Input } from "@/srs/components/common/Input"

interface Props {
    branchName: string
    onChange: (
        field:
        | "branchName" ,
        value: string
    ) => void

    errors?: Record<string, string>
}

export const BranchesFields = ({branchName, onChange, errors = {},}: Props) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-6 mb-5">
                <div className="col-span-12">
                    <Input
                        label="branchName"
                        value={branchName}
                        onChange={(val) => onChange("branchName", val)}
                        required
                        error={errors?.branchName}
                    />
                </div>
            </div>
        </>
    )
}