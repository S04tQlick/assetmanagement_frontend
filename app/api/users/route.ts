import {clientApi} from "@/srs/lib/apiClient/client";
import {jsonError, jsonOk } from "@/srs/lib/apiClient/http-response";
import { userCreateSchema } from "@/srs/schemas/user.schema";
import {formatZodErrors} from "@/srs/lib/zod";
import {NextResponse} from "next/server";
import {User_Types, User_TypesInput, UsersApiResponse} from "@/srs/types/user.types";

export async function GET() {
    const result = await clientApi.users.getAll()

    if (!result.success) {
        return NextResponse.json(result, { status: result.status ?? 500 })
    }

    return NextResponse.json({
        success: true,
        users: result.data
    })
} 

export async function POST(req: Request) {
    try {
        const json = await req.json() as User_TypesInput;

        const parsed = userCreateSchema.safeParse(json);

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error);
            return jsonError("Validation failed", 400, {errors});
        }

        const data = parsed.data;

        if (data.passwordHash !== data.confirmPassword) {
            return jsonError("Passwords do not match", 400);
        }

        const doc = {
            ...data
        };

        const result = await clientApi.users.create(doc);
 
        // return jsonOk({
        //     users: result, 
        //     status: 201,
        //     message: "User created"
        // })

        return jsonOk({
            success: true,
            message: "User created",
            data: result,
            rowCount: Array.isArray(result) ? result.length : 1
        });


    } catch (error) {
        console.error(`POST /api/users error:`, error);
        return jsonError("Failed to create user.", 500);
    }
}





// return jsonOk({ 
//     success: true, 
//     message: "User created",
//     users: result, 
//     status: 201 
// });