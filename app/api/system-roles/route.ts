import {NextResponse} from "next/server";
import api from "@/srs/lib/apiClient/api"; 
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors"; 
import {UserRole_Types} from "@/srs/types/userRole-Types";
import {userRoleSchema} from "@/srs/zodValidations/userRoleSchema";
import {Role_Types, RolesApiResponse} from "@/srs/types/role-Types";


export async function GET() {
    try {
        const response = await api.get<RolesApiResponse>('/Roles')  
        return NextResponse.json(
            {
                success: true,
                roles: response.data
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