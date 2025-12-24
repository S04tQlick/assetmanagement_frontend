import { z } from "zod"

export const assetSchema = z.object({
    assetName: z.string()
        .trim()
        .min(1, "Asset name is required")
        .max(200, "Asset name must be at most 200 characters"),

    institutionId: z.string().uuid("Institution ID must be valid"),
    branchId: z.string().uuid("Branch ID must be valid"),
    assetCategoryId: z.string().uuid("Asset Category ID must be valid"),
    assetTypeId: z.string().uuid("Asset Type ID must be valid"),
    vendorId: z.string().uuid("Vendor ID must be valid"),

    serialNumber: z.string()
        .trim().min(1, "Serial number is required"),

    purchaseDate: z.coerce.date(), // coerces ISO string → Date
    purchasePrice: z.number().nonnegative("Purchase price must be non-negative"),

    usefulLifeYears: z.number().int().nonnegative("Useful life must be non-negative"),
    unitsTotal: z.number().int().nonnegative("Units total must be non-negative"),
    currentUnits: z.number().int().nonnegative("Current units must be non-negative"),

    //sanityAssetId: z.string().optional(),
    //sanityUrl: z.string().url("Sanity URL must be valid").optional(),

    maintenanceDueDate: z.coerce.date(),
    nextMaintenanceDate: z.coerce.date(),

    salvageValue: z.number().nonnegative("Salvage value must be non-negative"), 

    depreciationMethod: z.enum(["StraightLine", "DecliningBalance", "SumOfYearsDigits"])
        .refine((val) => !!val, { message: "Depreciation method is required" }),

    currentValue: z.number().nonnegative("Current value must be non-negative"),
    accumulatedDepreciation: z.number().nonnegative("Accumulated depreciation must be non-negative"),
})

// Type inference
export type AssetSchemaInput = z.infer<typeof assetSchema>
