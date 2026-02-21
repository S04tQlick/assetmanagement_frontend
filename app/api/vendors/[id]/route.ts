import { NextResponse } from 'next/server'
import { clientApi } from "@/srs/lib/apiClient/client"; 
import {formatZodErrors} from "@/srs/lib/zod";
import {jsonError, jsonOk} from "@/srs/lib/apiClient/http-response";
import {VendorsApiResponse} from "@/srs/types/vendor.types";
import {vendorSchema} from "@/srs/schemas/vendor.schema";

type RouteParams = { params: Promise<{ id: string }>; };

export async function GET(req: Request, { params }: RouteParams) {
    try {
        const {id} = await params
        const response = await clientApi.vendors.getById(id)

        if (!response.success) {
            return NextResponse.json(response, {status: response.status ?? 500})
        }

        return NextResponse.json({
            success: true,
            vendor: response.data
        })
    } catch (error) {
        console.error(`GET vendor error: ${error}`)
        return NextResponse.json(
            {
                success: false,
                error: 'Internal server error.'
            },
            {status: 500}
        )
    }
}

export async function PUT(req: Request, { params }: RouteParams) {
    try {
        const {id} = await params
        const body = await req.json() as VendorsApiResponse
        const parsed = vendorSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({success: false, errors}, {status: 400})
        }

        const data = parsed.data

        const doc = {
            id,
            ...data,
        }

        const result = await clientApi.vendors.update(id, doc)

        return NextResponse.json({success: true, data: result}, {status: 200});
    } catch (error) {
        console.error(`PUT /api/vendors/[id] error: ${error}`)
        return NextResponse.json({success: false, error: 'Failed to update vendor.'}, {status: 500})
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    const {id} = await params;

    try {
        const result = await clientApi.vendors.delete(id);

        if (!result.success) {
            return jsonError(result.error ?? "Failed to delete record", result.status ?? 500);
        }

        return jsonOk(null, "Vendor deleted", 200);
    } catch (error) {
        console.error(`DELETE /api/vendors/${id} error:`, error);
        return jsonError("Unexpected server error", 500);
    }
}