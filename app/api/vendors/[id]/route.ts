import { NextResponse } from 'next/server'
import {clientApi} from "@/srs/lib/apiClient/client";
import { Vendor_TypesInput } from "@/srs/types/vendor.types";
import { vendorSchema } from "@/srs/schemas/vendor.schema";
import { formatZodErrors } from "@/srs/lib/zod";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json(
            { 
                success: false, 
                error: 'Missing vendor ID.' 
            }, 
            { status: 400 }
        )

        const response = await clientApi.vendors.getById(id)
        
        if (!response) return NextResponse.json(
            { 
                success: false, 
                error: 'Vendor not found.' 
            }, 
            { status: 404 }
        )

        return NextResponse.json(
            {
                success: true,
                vendor: response
            }, 
            { status: 200 }
        )
    } catch (error) {
        console.error(`GET vendor error: ${error}`)
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
        const body = await req.json() as Vendor_TypesInput
        const parsed = vendorSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({ success: false, errors }, { status: 400 })
        }

        const data = parsed.data  

        const doc = {
            id,
            ...data,
        }
        
        const result = await clientApi.vendors.update(id, doc)

        return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
        console.error(`PUT /api/vendors/[id] error: ${error}`)
        return NextResponse.json({ success: false, error: 'Failed to update asset category.' }, { status: 500 })
    }
}