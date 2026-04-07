import { clientApi } from "@/srs/lib/apiClient/client";
import { formatZodErrors } from "@/srs/lib/zod";
import {assetTypeSchema} from "@/srs/schemas/asset-type.schema";
import {jsonError, jsonOk } from "@/srs/lib/apiClient/http-response";
import {AssetTypesApiResponse} from "@/srs/types/asset-type.types";

type RouteParams = { params: Promise<{ id: string }>; };

export async function GET(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const assetType = await clientApi.assetTypes.getById(id);
        
        if (!assetType) {
            return jsonError("Asset type not found", 404);
        }
        
        return jsonOk(assetType, "Asset type retrieved");
    } catch (error) {
        console.error(`GET /api/asset-types/${id} error:`, error);
        return jsonError("Failed to fetch asset type", 500);
    }
}

export async function PUT(req: Request, { params }: RouteParams) {
    const {id} = await params;
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

        const result = await clientApi.assetTypes.update(id, doc)

        return jsonOk({
            data: result,
            status: 201,
            message: "Asset type updated"
        })

    } catch (error) {
        console.error(`POST /api/assetTypes/[id] error:`, error);
        return jsonError("Failed to update assetType.", 500);
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const result = await clientApi.assetTypes.delete(id);
        
        if (!result.success) {
            return jsonError(result.error ?? "Failed to delete record", result.status ?? 500);
        }
        
        return jsonOk(null, "Asset type deleted", 200);
    } catch (error) {
        console.error(`DELETE /api/asset-types/${id} error:`, error);
        return jsonError("Unexpected server error", 500);
    }
}