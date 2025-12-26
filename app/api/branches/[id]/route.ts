import { NextResponse } from 'next/server'
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import { clientApi } from "@/srs/lib/apiClient/client";
import {Branch_TypesInput} from "@/srs/types/branch-Types";
import {branchSchema} from "@/srs/zodValidations/branchSchema";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const {id} = await params
        const response = await clientApi.branches.getById(id)

        if (!response.success) {
            return NextResponse.json(response, {status: response.status ?? 500})
        }

        return NextResponse.json({
            success: true,
            branch: response.data
        })

    } catch (error) {
        console.error(`GET branch error: ${error}`)
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
        const body = await req.json() as Branch_TypesInput
        const parsed = branchSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({success: false, errors}, {status: 400})
        }

        const data = parsed.data

        const doc = {
            id,
            ...data,
        }
        const result = await clientApi.branches.update(id, doc)

        return NextResponse.json({success: true, data: result}, {status: 200});
    } catch (error) {
        console.error(`PUT /api/branches/[id] error: ${error}`)
        return NextResponse.json({success: false, error: 'Failed to update branch.'}, {status: 500})
    }
}