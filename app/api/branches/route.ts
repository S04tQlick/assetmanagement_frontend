import {NextResponse} from "next/server"; 
import {clientApi} from "@/srs/lib/apiClient/client";
import { formatZodErrors } from "@/srs/lib/zod";
import { branchSchema } from "@/srs/schemas/branch.schema";
import {Branch_TypesInput} from "@/srs/types/branch.types";


export async function GET() {

    const result = await clientApi.branches.getAll()

    if (!result.success) {
        return NextResponse.json(result, {status: result.status ?? 500});
    }

    return NextResponse.json(
        {
            success: true,
            branches: result.data
        }
    )
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as Branch_TypesInput
        const parsed = branchSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json(
                { success: false, errors }, 
                { status: 400 }
            )
        }

        const data = parsed.data

        const doc = {
            ...data,
        }

        const result = await clientApi.branches.create(doc)

        return NextResponse.json(
            {
                success: true,
                data: result
            },
            {status: 201});
    } catch (error: any) {
        const backendMessage = error.response?.data;
        return NextResponse.json(
            {
                success: false,
                error: backendMessage ?? "Unknown error"
            },
            {status: 400}
        );
    }
}