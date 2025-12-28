import { vendorSchema } from "@/srs/schemas/vendor.schema";
import {Vendor_Types, VendorsApiResponse } from "@/srs/types/vendor.types";
import {NextResponse} from "next/server";
import {formatZodErrors} from "@/srs/lib/zod";
import {clientApi} from "@/srs/lib/apiClient/client"; 


export async function GET() {
    try {
        const response = await clientApi.vendors.getAll()  
        return NextResponse.json(
            {
                success: true,
                vendors: response
            }
        )
    } catch (err) {
        console.error(`API error: ${err}`)
        return NextResponse.json(
            {success: false, error: String(err)},
            {status: 500}
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json() as Vendor_Types
        const parsed = vendorSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json(
                { success: false, errors }, 
                { status: 400 }
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
            { status: 201 });
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