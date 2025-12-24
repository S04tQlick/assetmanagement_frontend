import { NextResponse } from 'next/server'
import api from "@/srs/lib/apiClient/api";
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import {branchSchema} from "@/srs/zodValidations/branchSchema";
import {Branch_Types, BranchesApiResponse} from "@/srs/types/branch-Types";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json(
            { 
                success: false, 
                error: 'Missing branch ID.' 
            }, 
            { status: 400 }
        )
        const response = await api.get<BranchesApiResponse>(`/Branches/${id}`) 
        if (!response) return NextResponse.json(
            { 
                success: false,
                error: 'Branch not found.' 
            }, 
            { status: 404 }
        )

        return NextResponse.json(
            {
                success: true,
                branch: response.data
            }, 
            { status: 200 }
        )
    } catch (error) {
        console.error(`GET branches error: ${error}`)
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
        const body = await req.json() as Branch_Types
        const parsed = branchSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({ success: false, errors }, { status: 400 })
        }

        const data = parsed.data  

        const doc = {
            id,
            ...data,
        }
        
        const result = await api.put(`/Branches/${id}`, doc)

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });
    } catch (error) {
        console.error(`PUT /api/branches/[id] error: ${error}`)
        return NextResponse.json({ success: false, error: 'Failed to update branch.' }, { status: 500 })
    }
}



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