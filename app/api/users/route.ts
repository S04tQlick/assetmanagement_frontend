import {clientApi} from "@/srs/lib/apiClient/client";
import {jsonError, jsonOk } from "@/srs/lib/apiClient/http-response";
import { userCreateSchema } from "@/srs/schemas/user.schema";
import {formatZodErrors} from "@/srs/lib/zod";

export async function GET() {
    const result = await clientApi.users.getAll()

    if (!result.success) {
        return jsonError(
            result.error ?? "Failed to fetch users",
            result.status ?? 500
        )
    }

    return jsonOk({
        users: result.data, 
        status: 200, 
        message: "Users retrieved"
    })
}

export async function POST(req: Request) {
    try {
        const json = await req.json();

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
            ...data,
        };

        const result = await clientApi.users.create(doc);
 
        return jsonOk({
            users: result, 
            status: 201,
            message: "User created"
        })

    } catch (error) {
        console.error(`POST /api/users error:`, error);
        return jsonError("Failed to create user.", 500);
    }
}
    

// export async function POST(req: Request) {
//     try {
//         const body = await req.json() as User_Types
//         const parsed = userSchema.safeParse(body)
//
//         if (!parsed.success) {
//             const errors = formatZodErrors(parsed.error)
//             return NextResponse.json(
//                 {success: false, errors},
//                 {status: 400}
//             )
//         }
//
//         const data = parsed.data
//
//         const doc = {
//             ...data,
//         }
//
//         const result = await clientApi.users.create(doc)
//
//         return NextResponse.json(
//             {
//                 success: true,
//                 data: result
//             },
//             {status: 201});
//     } catch (error: any) {
//         const backendMessage = error.response?.data;
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: backendMessage ?? "Unknown error"
//             },
//             {status: 400}
//         );
//     }
// }