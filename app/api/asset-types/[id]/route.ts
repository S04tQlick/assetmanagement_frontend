import { NextResponse } from 'next/server'
import { AssetType_TypesInput} from "@/srs/types/assetType-Types";
import {assetTypeSchema} from "@/srs/zodValidations/assetTypeSchema";
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import { clientApi } from "@/srs/lib/apiClient/client";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const {id} = await params
        const response = await clientApi.assetTypes.getById(id)

        if (!response.success) {
            return NextResponse.json(response, {status: response.status ?? 500})
        }

        return NextResponse.json({
            success: true,
            assetType: response.data
        })

    } catch (error) {
        console.error(`GET asset type error: ${error}`)
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
        const body = await req.json() as AssetType_TypesInput
        const parsed = assetTypeSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({success: false, errors}, {status: 400})
        }

        const data = parsed.data

        const doc = {
            id,
            ...data,
        }
        const result = await clientApi.assetTypes.update(id, doc)

        return NextResponse.json({success: true, data: result}, {status: 200});
    } catch (error) {
        console.error(`PUT /api/asset-types/[id] error: ${error}`)
        return NextResponse.json({success: false, error: 'Failed to update asset type.'}, {status: 500})
    }
}





//
// // DELETE: Remove asset type by ID
// export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
//     try {
//         const { id } = await params
//         if (!id) return NextResponse.json({ success: false, error: 'Missing ID.' }, { status: 400 })
//
//         await sanityServerClient.delete(id)
//
//         return NextResponse.json({ success: true }, { status: 200 })
//     } catch (error) {
//         console.error('DELETE /api/asset-types/[id] error:', error)
//         return NextResponse.json({ success: false, error: 'Failed to delete asset type.' }, { status: 500 })
//     }
// }