import {NextResponse} from "next/server";
import api from "@/srs/lib/apiClient/api"; 
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import {AssetsApiResponse, Asset_Types} from "@/srs/types/asset-Types";
import {assetSchema} from "@/srs/zodValidations/assetSchema";


export async function GET() {
    try {
        const response = await api.get<AssetsApiResponse>('/Assets')  
        return NextResponse.json(
            {
                success: true,
                assets: response.data
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
        const body = await req.json() as Asset_Types
        const parsed = assetSchema.safeParse(body)

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
        
        console.log("doc ===: ", doc)
        
        const result = await api.post(`/Assets`, doc)
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