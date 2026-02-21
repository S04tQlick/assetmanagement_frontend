import { NextResponse } from "next/server";
import { clientApi } from "@/srs/lib/apiClient/client";
import {fileUploadSchema} from "@/srs/schemas/file-upload.Schema";
import {formatZodErrors} from "@/srs/lib/zod";
import {jsonError, jsonOk} from "@/srs/lib/apiClient/http-response";

type RouteParams = { params: Promise<{ id: string }>; };

export async function GET(req: Request, { params }: RouteParams) {
    try {
        const {id} = await params;
        
        const res = await clientApi.fileUploads.preview(id);
        if (!res.ok) {
            return NextResponse.json({success: false, error: "File not found"}, {status: res.status});
        }
        const contentType = res.headers.get("Content-Type") ?? "application/octet-stream";
        const arrayBuffer = await res.arrayBuffer();
        return new NextResponse(arrayBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000"
            }
        });
    } catch (error: any) {
        return NextResponse.json({success: false, error: error?.message ?? "Unknown server error",}, {status: 500});
    }
}

export async function PUT(req: Request, { params }: RouteParams) {
    try {
        const {id} = await params;
        const form = await req.formData();

        const file = form.get("file") as File | null;
        const institutionId = form.get("institutionId") as string | null;
        const isLogo = form.get("isLogo") === "true";

        const parsed = fileUploadSchema.safeParse({
            institutionId,
            isLogo,
            file: file ?? undefined,
        });

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error);
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        const payload = { 
            institutionId: parsed.data.institutionId,
            isLogo: parsed.data.isLogo,
            file: parsed.data.file,
        };

        const result = await clientApi.fileUploads.update(id, payload);

        return NextResponse.json(result, { status: 200 });

    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err?.message ?? "Unknown error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    const {id} = await params;
    try {
        const result = await clientApi.fileUploads.delete(id);

        if (!result.success) {
            return jsonError(result.error ?? "Failed to delete record", result.status ?? 500);
        }

        return jsonOk(null, "File upload deleted", 200);
    } catch (error) {
        console.error(`DELETE /api/file-uploads/${id} error:`, error);
        return jsonError("Unexpected server error", 500);
    }
}
