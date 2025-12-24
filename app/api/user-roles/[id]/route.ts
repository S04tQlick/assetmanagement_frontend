import { NextResponse } from 'next/server'
import api from "@/srs/lib/apiClient/api";
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import { userRoleSchema } from "@/srs/zodValidations/userRoleSchema";
import {UserRole_Types, UserRolesApiResponse} from "@/srs/types/userRole-Types";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json(
            { 
                success: false, 
                error: 'Missing user role ID.' 
            }, 
            { status: 400 }
        )

        const response = await api.get<UserRolesApiResponse>(`/UserRoles/${id}`)
        
        if (!response) return NextResponse.json(
            { 
                success: false, 
                error: 'User role not found.' 
            }, 
            { status: 404 }
        )

        return NextResponse.json(
            {
                success: true, 
                userRole: response.data
            }, 
            { status: 200 }
        )
    } catch (error) {
        console.error(`GET user role error: ${error}`)
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
        const body = await req.json() as UserRole_Types
        const parsed = userRoleSchema.safeParse(body)

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({ success: false, errors }, { status: 400 })
        }

        const data = parsed.data  

        const doc = {
            id,
            ...data,
        }
        
        const result = await api.put(`/UserRoles/${id}`, doc)

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });
    } catch (error) {
        console.error(`PUT /api/user-roles/[id] error: ${error}`)
        return NextResponse.json({ success: false, error: 'Failed to update user role.' }, { status: 500 })
    }
}