import {clientApi} from "@/srs/lib/apiClient/client";
import { formatZodErrors } from "@/srs/lib/zod";
import { institutionSchema } from "@/srs/schemas/institution.schema";
import {jsonError, jsonOk} from "@/srs/lib/apiClient/http-response";
import {InstitutionsApiResponse} from "@/srs/types/institution.types";

type RouteParams = { params: Promise<{ id: string }>; };

export async function GET(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const institution = await clientApi.institutions.getById(id);
        if (!institution) {
            return jsonError("Institution not found", 404);
        }
        return jsonOk(institution, "Institution retrieved");
    } catch (error) {
        console.error(`GET /api/institutions/${id} error:`, error);
        return jsonError("Failed to fetch institution", 500);
    }
}

// export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
//     try {
//         const {id} = await params
//         const body = await req.json() as InstitutionsApiResponse
//         const parsed = institutionSchema.safeParse(body)
//
//         if (!parsed.success) {
//             const errors = formatZodErrors(parsed.error)
//             return NextResponse.json({success: false, errors}, {status: 400})
//         }
//
//         const data = parsed.data
//
//         const doc = {
//             id,
//             ...data,
//         }
//         const result = await clientApi.institutions.update(id, doc)
//
//         return NextResponse.json({success: true, data: result}, {status: 200});
//     } catch (error) {
//         console.error(`PUT /api/institutions/[id] error: ${error}`)
//         return NextResponse.json({success: false, error: 'Failed to update institution.'}, {status: 500})
//     }
// }

export async function PUT(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {

        const body = await req.json() as InstitutionsApiResponse;
        const parsed = institutionSchema.safeParse(body);

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error);
            return jsonError("Validation failed", 400, {errors});
        }

        const data = parsed.data;
        const doc = {
            ...data,
        };

        const result = await clientApi.institutions.update(id, doc);

        return jsonOk(result, "Asset type updated", 200);
    } catch (error) {
        console.error(`PUT /api/institutions/[id] error:`, error);
        return jsonError("Failed to update institution.", 500);
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