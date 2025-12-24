import { Input } from "../../common/Input"

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

export const AssetsFields = (
    {
        assetName, serialNumber, purchaseDate, purchasePrice, usefulLifeYears, unitsTotal, currentUnits, maintenanceDueDate, salvageValue, currentValue, accumulatedDepreciation, nextMaintenanceDate, onChange, errors = {},
    }: Props) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Asset Name"
                        value={assetName}
                        onChange={(val) => onChange("assetName", val)}
                        required
                        error={errors?.assetName}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Serial Number"
                        value={serialNumber}
                        onChange={(val) => onChange("serialNumber", val)}
                        required
                        error={errors?.serialNumber}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Purchase Date"
                        type="date"
                        value={purchaseDate}
                        onChange={(val) => onChange("purchaseDate", val)}
                        required
                        error={errors?.purchaseDate}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Purchase Price"
                        type="number"
                        value={purchasePrice}
                        onChange={(val) => onChange("purchasePrice", val)}
                        required
                        error={errors?.purchasePrice}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Useful Life (Years)"
                        type="number"
                        value={usefulLifeYears}
                        onChange={(val) => onChange("usefulLifeYears", val)}
                        required
                        error={errors?.usefulLifeYears}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Units Total"
                        type="number"
                        value={unitsTotal}
                        onChange={(val) => onChange("unitsTotal", val)}
                        required
                        error={errors?.unitsTotal}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Current Units"
                        type="number"
                        value={currentUnits}
                        onChange={(val) => onChange("currentUnits", val)}
                        required
                        error={errors?.currentUnits}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Maintenance Due Date"
                        type="date"
                        value={maintenanceDueDate}
                        onChange={(val) => onChange("maintenanceDueDate", val)}
                        required
                        error={errors?.maintenanceDueDate}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Salvage Value"
                        type="number"
                        value={salvageValue}
                        onChange={(val) => onChange("salvageValue", val)}
                        required
                        error={errors?.salvageValue}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Current Value"
                        type="number"
                        value={currentValue}
                        onChange={(val) => onChange("currentValue", val)}
                        required
                        error={errors?.currentValue}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Accumulated Depreciation"
                        type="number"
                        value={accumulatedDepreciation}
                        onChange={(val) => onChange("accumulatedDepreciation", val)}
                        required
                        error={errors?.accumulatedDepreciation}
                    />
                </div>
                
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        label="Next Maintenance Date"
                        type="date"
                        value={nextMaintenanceDate}
                        onChange={(val) => onChange("nextMaintenanceDate", val)}
                        required
                        error={errors?.nextMaintenanceDate}
                    />
                </div>
            </div>
        </>
    )
}