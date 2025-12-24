import {NextResponse} from "next/server";
import api from "@/srs/lib/apiClient/api"; 
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import {Vendor_Types, VendorsApiResponse} from "@/srs/types/vendor-Types";
import {vendorSchema} from "@/srs/zodValidations/vendorSchema";


export async function GET() {
    try {
        const response = await api.get<VendorsApiResponse>('/Vendors')  
        return NextResponse.json(
            {
                success: true,
                vendors: response.data
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
        
        const result = await api.post(`/Vendors`, doc)
        return NextResponse.json(
            { 
                success: true, 
                data: result.data 
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