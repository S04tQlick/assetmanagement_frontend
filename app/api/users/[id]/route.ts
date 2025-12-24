import { NextResponse } from 'next/server'
import api from "@/srs/lib/apiClient/api";
import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
import {User_Types, UsersApiResponse} from "@/srs/types/user-Types";
import {userSchema} from "@/srs/zodValidations/userSchema";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        if (!id) return NextResponse.json(
            { 
                success: false, 
                error: 'Missing user ID.' 
            }, 
            { status: 400 }
        )

        const response = await api.get<UsersApiResponse>(`/Users/${id}`)
        if (!response) return NextResponse.json(
            { 
                success: false, 
                error: 'User not found.' 
            }, 
            { status: 404 }
        )

        return NextResponse.json(
            {
                success: true,
                user: response.data
            }, 
            { status: 200 }
        )
    } catch (error) {
        console.error(`GET user error: ${error}`)
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
        const body = await req.json() as User_Types
        const parsed = userSchema.safeParse({ mode: "update", ...body })

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error)
            return NextResponse.json({ success: false, errors }, { status: 400 })
        }

        const data = parsed.data  

        const doc = {
            id,
            ...data,
        }
        
        const result = await api.put(`/Users/${id}`, doc)

        return NextResponse.json({ success: true, data: result.data }, { status: 200 });
    } catch (error) {
        console.error(`PUT /api/users/[id] error: ${error}`)
        return NextResponse.json({ success: false, error: 'Failed to update user.' }, { status: 500 })
    }
}