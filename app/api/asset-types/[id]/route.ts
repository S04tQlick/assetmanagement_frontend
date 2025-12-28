import { clientApi } from "@/srs/lib/apiClient/client";
import { formatZodErrors } from "@/srs/lib/zod";
import {assetTypeSchema} from "@/srs/schemas/asset-type.schema";
import {jsonError, jsonOk } from "@/srs/lib/apiClient/http-response";


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

        const body = await req.json();
        const parsed = assetTypeSchema.safeParse(body);

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error);
            return jsonError("Validation failed", 400, {errors});
        }

        const data = parsed.data;
        const doc = {
            ...data,
        };

        const result = await clientApi.assetTypes.update(id, doc);

        console.log("result:: =====:::  ", result)
        return jsonOk(result, "Asset types updated", 200);
    } catch (error) {
        console.error(`PUT /api/asset-types/[id] error:`, error);
        return jsonError("Failed to update asset type.", 500);
    }
}




//
// // DELETE: Remove asset type by ID
// export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
//     try {
//         const { id } = await params
//         if (!id) return NextResponse.json({ success: false, error: 'Missing ID.' }, { status: 400 })
//
//         await sanityServerClient.delete(id)
//
//         return NextResponse.json({ success: true }, { status: 200 })
//     } catch (error) {
//         console.error('DELETE /api/asset-types/[id] error:', error)
//         return NextResponse.json({ success: false, error: 'Failed to delete asset type.' }, { status: 500 })
//     }
// }