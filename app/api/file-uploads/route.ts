import { NextResponse } from "next/server";
import { clientApi } from "@/srs/lib/apiClient/client"; 
import { formatZodErrors } from "@/srs/lib/zod";
import {fileUploadSchema} from "@/srs/schemas/file-upload.Schema";

export async function GET() {
    const result = await clientApi.fileUploads.getAll();

    if (!result.success) {
        return NextResponse.json(result, { status: result.status ?? 500 });
    }

    return NextResponse.json({
        success: true,
        fileUploads: result.data
    });
}

export async function POST(req: Request) {
    try {
        const form = await req.formData();

        const file = form.get("file") as File | null;
        const institutionId = form.get("institutionId") as string | null;
        const isLogo = form.get("isLogo") === "true";

        const parsed = fileUploadSchema.safeParse({
            institutionId,
            isLogo,
            file,
        });

        if (!parsed.success) {
            const errors = formatZodErrors(parsed.error);
            return NextResponse.json({ success: false, errors }, { status: 400 });
        }

        const result = await clientApi.fileUploads.create({
            institutionId: parsed.data.institutionId, 
            isLogo: parsed.data.isLogo, 
            file: parsed.data.file!,
        });
        
        return NextResponse.json(result, { status: 200 });

    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err?.message ?? "Unknown error" },
            { status: 500 }
        );
    }
}