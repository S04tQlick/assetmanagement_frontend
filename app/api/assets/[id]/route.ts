import {clientApi} from "@/srs/lib/apiClient/client";
import {jsonError, jsonOk} from "@/srs/lib/apiClient/http-response";
import { assetSchema } from "@/srs/schemas/asset.schema";
import { formatZodErrors } from "@/srs/lib/zod";
import {AssetsApiResponse} from "@/srs/types/asset.types";

type RouteParams = { params: Promise<{ id: string }>; };

export async function GET(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const asset = await clientApi.assets.getById(id);
        if (!asset) {
            return jsonError("Asset not found", 404);
        }
        return jsonOk(asset, "Asset retrieved");
    } catch (error) {
        console.error(`GET /api/assets/${id} error:`, error);
        return jsonError("Failed to fetch asset", 500);
    }
}

export async function PUT(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const body = await req.json() as AssetsApiResponse;
        const parsed = assetSchema.safeParse(body);

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error);
            return jsonError("Validation failed", 400, {errors});
        }

        const data = parsed.data;
        
        const doc = {
            ...data,
        };

        const result = await clientApi.assets.update(id, doc);

        return jsonOk(result, "Asset updated", 200);
    } catch (error) {
        console.error(`PUT /api/assets/[id] error:`, error);
        return jsonError("Failed to update asset.", 500);
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    const {id} = await params;

    try {
        const result = await clientApi.assets.delete(id);

        if (!result.success) {
            return jsonError(result.error ?? "Failed to delete record", result.status ?? 500);
        }

        return jsonOk(null, "Asset deleted", 200);
    } catch (error) {
        console.error(`DELETE /api/assets/${id} error:`, error);
        return jsonError("Unexpected server error", 500);
    }
}