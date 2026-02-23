import { Input } from "@/srs/components/common/input"

interface Props {
    assetName: string
    serialNumber: string
    purchaseDate: string
    purchasePrice: number
    usefulLifeYears: number
    unitsTotal: number
    currentUnits: number
    maintenanceDueDate: string
    salvageValue: number
    currentValue: number
    accumulatedDepreciation: number
    nextMaintenanceDate: string
    onChange: (
        field:
            | "assetName"
            | "serialNumber"
            | "purchaseDate"
            | "purchasePrice"
            | "usefulLifeYears"
            | "unitsTotal"
            | "currentUnits"
            | "maintenanceDueDate"
            | "salvageValue"
            | "currentValue"
            | "accumulatedDepreciation"
            | "nextMaintenanceDate",
        value: string
    ) => void

    errors?: Record<string, string>
}

export const AssetsFields = ({assetName, serialNumber, purchaseDate, purchasePrice, usefulLifeYears, unitsTotal, currentUnits, maintenanceDueDate, salvageValue, currentValue, accumulatedDepreciation, nextMaintenanceDate, onChange, errors = {}}: Props) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6"> 
                    <Input
                        label="Asset Name"
                        value={assetName}
                        onChange={(val) => onChange("assetName", val)}
                        required={true}
                        error={errors?.assetName}
                    />

                    <Input
                        label="Serial Number"
                        value={serialNumber}
                        onChange={(val) => onChange("serialNumber", val)}
                        required={true}
                        error={errors?.serialNumber}
                    />

                    <Input
                        label="Purchase Date"
                        type="date"
                        value={purchaseDate}
                        onChange={(val) => onChange("purchaseDate", val)}
                        required={true}
                        error={errors?.purchaseDate}
                    />

                    <Input
                        label="Purchase Price"
                        type="number"
                        value={purchasePrice}
                        onChange={(val) => onChange("purchasePrice", val)}
                        required={true}
                        error={errors?.purchasePrice}
                    />

                    <Input
                        label="Useful Life (Years)"
                        type="number"
                        value={usefulLifeYears}
                        onChange={(val) => onChange("usefulLifeYears", val)}
                        required={true}
                        error={errors?.usefulLifeYears}
                    />

                    <Input
                        label="Units Total"
                        type="number"
                        value={unitsTotal}
                        onChange={(val) => onChange("unitsTotal", val)}
                        required={true}
                        error={errors?.unitsTotal}
                    />

                    <Input
                        label="Current Units"
                        type="number"
                        value={currentUnits}
                        onChange={(val) => onChange("currentUnits", val)}
                        required={true}
                        error={errors?.currentUnits}
                    />

                    <Input
                        label="Maintenance Due Date"
                        type="date"
                        value={maintenanceDueDate}
                        onChange={(val) => onChange("maintenanceDueDate", val)}
                        required={true}
                        error={errors?.maintenanceDueDate}
                    />

                    <Input
                        label="Salvage Value"
                        type="number"
                        value={salvageValue}
                        onChange={(val) => onChange("salvageValue", val)}
                        required={true}
                        error={errors?.salvageValue}
                    />

                    <Input
                        label="Current Value"
                        type="number"
                        value={currentValue}
                        onChange={(val) => onChange("currentValue", val)}
                        required={true}
                        error={errors?.currentValue}
                    />

                    <Input
                        label="Accumulated Depreciation"
                        type="number"
                        value={accumulatedDepreciation}
                        onChange={(val) => onChange("accumulatedDepreciation", val)}
                        required={true}
                        error={errors?.accumulatedDepreciation}
                    />

                    <Input
                        label="Next Maintenance Date"
                        type="date"
                        value={nextMaintenanceDate}
                        onChange={(val) => onChange("nextMaintenanceDate", val)}
                        required={true}
                        error={errors?.nextMaintenanceDate}
                    />
                    
                </div>
            </div>
        </>
    )
}