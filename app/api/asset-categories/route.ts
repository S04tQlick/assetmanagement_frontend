import {NextResponse} from "next/server";
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import {clientApi} from "@/srs/lib/apiClient/client";
import {assetCategorySchema} from "@/srs/zodValidations/assetCategorySchema";
import {AssetCategory_Types} from "@/srs/types/assetCategory-Types";


export async function GET() {
    const result = await clientApi.assetCategories.getAll()

    if (!result.success) {
        return NextResponse.json(result, { status: result.status ?? 500 })
    }

    return NextResponse.json({
        success: true,
        assetCategories: result.data
    })
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as AssetCategory_Types
        const parsed = assetCategorySchema.safeParse(body)

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

        const result = await clientApi.assetCategories.create(doc)

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