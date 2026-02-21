import { clientApi } from "@/srs/lib/apiClient/client";
import { branchSchema } from "@/srs/schemas/branch.schema";
import {formatZodErrors} from "@/srs/lib/zod";
import { jsonError, jsonOk } from "@/srs/lib/apiClient/http-response";
import {BranchesApiResponse} from "@/srs/types/branch.types";

type RouteParams = { params: Promise<{ id: string }>; };

export async function GET(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const branch = await clientApi.branches.getById(id);
        if (!branch) {
            return jsonError("Branch type not found", 404);
        }
        return jsonOk(branch, "Branch type retrieved");
    } catch (error) {
        console.error(`GET /api/branches/${id} error:`, error);
        return jsonError("Failed to fetch branch", 500);
    }
}

export async function PUT(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const body = await req.json() as BranchesApiResponse;
        const parsed = branchSchema.safeParse(body);

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error);
            return jsonError("Validation failed", 400, {errors});
        }

        const data = parsed.data;
        const doc = {
            ...data,
        };

        const result = await clientApi.branches.update(id, doc);

        return jsonOk(result, "Branch type updated", 200);
    } catch (error) {
        console.error(`PUT /api/branches/[id] error:`, error);
        return jsonError("Failed to update branch.", 500);
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const result = await clientApi.branches.delete(id);

        if (!result.success) {
            return jsonError(result.error ?? "Failed to delete record", result.status ?? 500);
        }

        return jsonOk(null, "Branch deleted", 200);
    } catch (error) {
        console.error(`DELETE /api/branches/${id} error:`, error);
        return jsonError("Unexpected server error", 500);
    }
}