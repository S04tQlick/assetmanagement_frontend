import {NextResponse} from "next/server"; 
import {clientApi} from "@/srs/lib/apiClient/client";
import {assetTypeSchema} from "@/srs/schemas/asset-type.schema";
import {formatZodErrors} from "@/srs/lib/zod";
import {jsonError, jsonOk} from "@/srs/lib/apiClient/http-response";
import {AssetTypesApiResponse} from "@/srs/types/asset-type.types";

export async function GET() {
    const result = await clientApi.assetTypes.getAll()

    if (!result.success) {
        return NextResponse.json(result, { status: result.status ?? 500 })
    }

    return NextResponse.json({
        success: true,
        assetTypes: result.data
    })
}

export async function POST(req: Request) {
    try {
        const json = await req.json() as AssetTypesApiResponse
        const parsed = assetTypeSchema.safeParse(json)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return jsonError("Validation failed", 400, {errors});
        }

        const data = parsed.data

        const doc = {
            ...data,
        }

        const result = await clientApi.assetTypes.create(doc)

        return jsonOk({
            data: result,
            status: 201,
            message: "Asset type created"
        })
    } catch (error) {
        console.error(`POST /api/assetTypes error:`, error);
        return jsonError("Failed to create assetType.", 500);
    }
}