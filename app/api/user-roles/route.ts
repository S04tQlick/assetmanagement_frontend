import {NextResponse} from "next/server";
import api from "@/srs/lib/apiClient/api";   
import {UserRolesApiResponse} from "@/srs/types/userRole-Types";
import {Role_Types} from "@/srs/types/role-Types";
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import {userSchema} from "@/srs/zodValidations/userSchema";
import {userRoleSchema} from "@/srs/zodValidations/userRoleSchema"; 


export async function GET() {
    try {
        const response = await api.get<UserRolesApiResponse>('/UserRoles')  
        return NextResponse.json(
            {
                success: true,
                userRoles: response.data
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
        const body = await req.json() as Role_Types
        const parsed = userRoleSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json(
                {success: false, errors},
                {status: 400}
            )
        }

        const data = parsed.data

        const doc = {
            ...data,
        }

        const result = await api.post(`/UserRoles`, doc)
        return NextResponse.json(
            {
                success: true,
                data: result.data
            },
            {status: 201});
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