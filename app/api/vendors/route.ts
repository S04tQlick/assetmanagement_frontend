import {NextResponse} from "next/server";
import {clientApi} from "@/srs/lib/apiClient/client";
import { formatZodErrors } from "@/srs/lib/zod"; 
import { vendorSchema } from "@/srs/schemas/vendor.schema";
import {VendorsApiResponse} from "@/srs/types/vendor.types";

export async function GET() {
    const result = await clientApi.vendors.getAll()

    if (!result.success) {
        return NextResponse.json(result, {
            status: result.status ?? 500
        })
    }

    return NextResponse.json({
        success: true,
        vendors: result.data
    })
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as VendorsApiResponse
        const parsed = vendorSchema.safeParse(body)

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

        const result = await clientApi.vendors.create(doc)

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