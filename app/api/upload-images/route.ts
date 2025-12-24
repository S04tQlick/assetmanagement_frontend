import {NextResponse} from "next/server";
import api from "@/srs/lib/apiClient/api";


export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("File") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file provided" },
                { status: 400 }
            );
        }
 
        const backendRes = await api.post(
            `/Images/upload-image`,
            formData,
            {
                headers: { 
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return NextResponse.json(
            {
                success: true,
                data: backendRes.data
            },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Upload proxy failed:", err.message);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}















// export async function POST(req: Request) {
//     try {
//         const formData = await req.formData();
//         const file = formData.get("File") as File | null;
//
//         if (!file) {
//             return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
//         }
//
//         // Forward to ASP.NET Core backend
//         const result = await api.post(`/Images/upload-image`, formData);
//
//         return NextResponse.json(
//             {
//                 success: true,
//                 data: result.data
//             },
//             { status: 201 });
//        
//     } catch (err: any) {
//         return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//     }
// }


















// import {NextResponse} from 'next/server'
// import {Institution_Types} from "@/srs/types/institution-Types";
// import {institutionSchema} from "@/srs/zodValidations/institutionSchema";
// import {formatZodErrors} from "@/srs/zodValidations/formatZodErrors";
// import api from "@/srs/lib/apiClient/api";


// export async function POST(req: Request) {
//     try {
//         const body = await req.json() as Institution_Types
//         const parsed = institutionSchema.safeParse(body)
//
//         if (!parsed.success) {
//             const errors = formatZodErrors(parsed.error)
//             return NextResponse.json(
//                 { success: false, errors },
//                 { status: 400 }
//             )
//         }
//
//         const data = parsed.data
//
//         const doc = {
//             ...data,
//         }
//
//         const result = await api.post(`/Images/upload-image`, doc)
// 
//         return NextResponse.json(
//             {
//                 success: true,
//                 data: result.data
//             },
//             { status: 201 });
//     } catch (error: any) {
//         const backendMessage = error.response?.data;
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: backendMessage ?? "Unknown error"
//             },
//             {status: 400}
//         );
//     }
// }





















// export async function POST(req: NextRequest) {
//     const formData = await req.formData()
//     const file = formData.get('image') as File
//
//     if (!file || file.type.indexOf('image/') !== 0) {
//         return new Response(JSON.stringify({ error: 'Invalid image file' }), { status: 400 })
//     }
//
//     const asset = await sanityServer.assets.upload('image', file, {
//         filename: file.name ?? undefined,
//     })
//
//     return new Response(
//         JSON.stringify({
//             sanityAssetId: asset._id,
//             sanityUrl: asset.url,
//             logoAssetRef: {
//                 _type: 'image',
//                 asset: { _ref: asset._id },
//             },
//         }),
//         { status: 200 }
//     )
// }