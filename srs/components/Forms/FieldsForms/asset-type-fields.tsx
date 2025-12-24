import {Input} from "@/srs/components/common/Input";
import { Textarea } from "@/srs/components/common/Textarea";

interface Props {
    assetTypeName: string
    description: string
    onChange: (
        field:
            | "assetTypeName"
            | "description",
        value: string
    ) => void

    errors?: Record<string, string>
}

export const AssetTypesFields = ({assetTypeName, description, onChange, errors = {},}: Props) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <Input
                        label="assetTypeName"
                        value={assetTypeName}
                        onChange={(val) => onChange("assetTypeName", val)}
                        required={true}
                        error={errors?.assetTypeName}
                    />
                </div>
                <div className="col-span-12">
                    <Textarea
                        label="Description"
                        value={description}
                        onChange={(val) => onChange("description", val)}
                        placeholder="Enter description..."
                        error={errors?.description}
                        required={true}
                        disabled={false}
                        rows={4}
                    />
                </div>
            </div>
        </>
    )
}