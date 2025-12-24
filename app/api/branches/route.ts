import {NextResponse} from "next/server";
import api from "@/srs/lib/apiClient/api";
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import {Branch_TypesInput, BranchesApiResponse} from "@/srs/types/branch-Types";
import {branchSchema} from "@/srs/zodValidations/branchSchema";


export async function GET() {
    try {
        const response = await api.get<BranchesApiResponse>('/Branches') 
        return NextResponse.json(
            {
                success: true,
                branches: response.data
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
        const body = await req.json() as Branch_TypesInput
        const parsed = branchSchema.safeParse(body)

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
        
        const result = await api.post(`/Branches`, doc)

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