import { NextResponse } from 'next/server'
import {clientApi} from "@/srs/lib/apiClient/client";
import { formatZodErrors } from "@/srs/lib/zod";
import { institutionSchema } from "@/srs/schemas/institution.schema";
import {Institution_TypesInput} from "@/srs/types/institution.types"; 

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const {id} = await params
        const response = await clientApi.institutions.getById(id)

        if (!response.success) {
            return NextResponse.json(response, {status: response.status ?? 500})
        }

        return NextResponse.json({
            success: true,
            institution: response.data
        })

    } catch (error) {
        console.error(`GET institution error: ${error}`)
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
        const body = await req.json() as Institution_TypesInput
        const parsed = institutionSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({success: false, errors}, {status: 400})
        }

        const data = parsed.data

        const doc = {
            id,
            ...data,
        }
        const result = await clientApi.institutions.update(id, doc)

        return NextResponse.json({success: true, data: result}, {status: 200});
    } catch (error) {
        console.error(`PUT /api/institutions/[id] error: ${error}`)
        return NextResponse.json({success: false, error: 'Failed to update institution.'}, {status: 500})
    }
}