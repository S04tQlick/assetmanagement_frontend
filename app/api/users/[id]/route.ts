import {clientApi} from "@/srs/lib/apiClient/client"; 
import { jsonError, jsonOk } from "@/srs/lib/apiClient/http-response";
import {userUpdateSchema} from "@/srs/schemas/user.schema";
import {formatZodErrors} from "@/srs/lib/zod";

type RouteParams = { params: Promise<{ id: string }>; };

export async function GET(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const user = await clientApi.users.getById(id);
        if (!user) {
            return jsonError("User not found", 404);
        }
        return jsonOk(user, "User retrieved");
    } catch (error) { 
        console.error(`GET /api/users/${id} error:`, error);
        return jsonError("Failed to fetch user", 500);
    }
}

export async function PUT(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {

        const body = await req.json();

        const parsed = userUpdateSchema.safeParse(body);

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error);
            return jsonError("Validation failed", 400, {errors});
        }

        const data = parsed.data;
        const doc = {
            id,
            ...data,
        };

        const result = await clientApi.users.update(id, doc);

        return jsonOk(result, "User updated", 200);
    } catch (error) {
        console.error(`PUT /api/users/[id] error:`, error);
        return jsonError("Failed to update user.", 500);
    }
}