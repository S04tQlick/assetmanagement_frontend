import { Input } from "@/srs/components/common/Input"

interface Props {
    assetCategoryName: string 
    onChange: (
        field:
            | "assetCategoryName" ,
        value: string
    ) => void

    errors?: Record<string, string>
}

export const AssetCategoriesFields = ({assetCategoryName, onChange, errors = {}}: Props) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <Input
                        label="assetCategoryName"
                        value={assetCategoryName}
                        onChange={(val) => onChange("assetCategoryName", val)}
                        required={true}
                        error={errors?.assetCategoryName}
                    />
                </div>
            </div>
        </>
    )
}