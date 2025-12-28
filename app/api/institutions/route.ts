import {NextResponse} from "next/server"; 
import {clientApi} from "@/srs/lib/apiClient/client";
import { formatZodErrors } from "@/srs/lib/zod";
import { institutionSchema } from "@/srs/schemas/institution.schema";
import {Institution_Types} from "@/srs/types/institution.types";


export async function GET() {
    const result = await clientApi.institutions.getAll()

    if (!result.success) {
        return NextResponse.json(result, { status: result.status ?? 500 })
    }

    return NextResponse.json({
        success: true,
        institutions: result.data
    })
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as Institution_Types
        const parsed = institutionSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json(
                {success: false, errors},
                {status: 400}
            )
        }

        const data = parsed.data

        const doc = {
            ...data,
        }

        const result = await clientApi.institutions.create(doc)

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