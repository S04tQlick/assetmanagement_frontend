import { NextResponse } from 'next/server'
import api from "@/srs/lib/apiClient/api";
import {Asset_Types, AssetsApiResponse} from "@/srs/types/asset-Types";
import {assetSchema} from "@/srs/zodValidations/assetSchema";
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json(
            { 
                success: false, 
                error: 'Missing asset ID.' 
            }, 
            { status: 400 }
        )

        const response = await api.get<AssetsApiResponse>(`/Assets/${id}`)
        
        if (!response) return NextResponse.json(
            { 
                success: false, 
                error: 'Asset not found.' 
            }, 
            { status: 404 }
        )

        return NextResponse.json(
            {
                success: true, 
                asset: response.data
            }, 
            { status: 200 }
        )
    } catch (error) {
        console.error(`GET asset error: ${error}`)
        return NextResponse.json(
            { 
                success: false, 
                error: 'Internal server error.' 
            }, 
            { status: 500 }
        )
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const body = await req.json() as Asset_Types
        const parsed = assetSchema.safeParse(body)
        
        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({ success: false, errors }, { status: 400 })
        }

        const data = parsed.data

        const doc = {
            id,
            ...data,
        }
        
        const result = await api.put(`/Assets/${id}`, doc)

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });
    } catch (error) {
        console.error(`PUT /api/assets/[id] error: ${error}`)
        return NextResponse.json({ success: false, error: 'Failed to update asset.' }, { status: 500 })
    }
}