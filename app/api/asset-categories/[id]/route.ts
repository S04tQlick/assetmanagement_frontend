import { NextResponse } from 'next/server'
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import { clientApi } from "@/srs/lib/apiClient/client";
import {AssetCategory_TypesInput} from "@/srs/types/assetCategory-Types";
import {assetCategorySchema} from "@/srs/zodValidations/assetCategorySchema";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const {id} = await params
        const response = await clientApi.assetCategories.getById(id)

        if (!response.success) {
            return NextResponse.json(response, {status: response.status ?? 500})
        }

        return NextResponse.json({
            success: true,
            assetCategory: response.data
        })

    } catch (error) {
        console.error(`GET asset category error: ${error}`)
        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error.'
            },
            {status: 500}
        )
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params
        const body = await req.json() as AssetCategory_TypesInput
        const parsed = assetCategorySchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({success: false, errors}, {status: 400})
        }

        const data = parsed.data

        const doc = {
            id,
            ...data,
        }
        const result = await clientApi.assetCategories.update(id, doc)

        return NextResponse.json({success: true, data: result}, {status: 200});
    } catch (error) {
        console.error(`PUT /api/asset-categories/[id] error: ${error}`)
        return NextResponse.json({success: false, error: 'Failed to update asset category.'}, {status: 500})
    }
}