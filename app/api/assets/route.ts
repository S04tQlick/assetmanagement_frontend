import {NextResponse} from "next/server";
import {clientApi} from "@/srs/lib/apiClient/client";
import { assetSchema } from "@/srs/schemas/asset.schema";
import {AssetsApiResponse} from "@/srs/types/asset.types";
import { formatZodErrors } from "@/srs/lib/zod";
import {jsonError, jsonOk} from "@/srs/lib/apiClient/http-response";

export async function GET() {
    const result = await clientApi.assets.getAll()

    if (!result.success) {
        return NextResponse.json(result, { status: result.status ?? 500 })
    }

    return NextResponse.json({
        success: true,
        assets: result.data
    })
}

export async function POST(req: Request) {
    try {
        const json = await req.json() as AssetsApiResponse
        const parsed = assetSchema.safeParse(json)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return jsonError("Validation failed", 400, {errors});
        }

        const data = parsed.data

        const doc = {
            ...data,
        }

        const result = await clientApi.assets.create(doc)

        return jsonOk({
            users: result,
            status: 201,
            message: "Asset created"
        })

    } catch (error) {
        console.error(`POST /api/asset error:`, error);
        return jsonError("Failed to create asset.", 500);
    }
}