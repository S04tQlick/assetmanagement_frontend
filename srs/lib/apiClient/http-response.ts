import { NextResponse } from "next/server";

export function jsonOk<T>(payload: T, message = "OK", status = 200) {
    return NextResponse.json(
        {
            success: true,
            message,
            ...payload
        },
        {status}
    );
}

export function  jsonError(message: string, status: number, extra?: Record<string, unknown>) {
    return NextResponse.json(
        {
            success: false,
            message,
            ...extra
        },
        {status}
    )
}