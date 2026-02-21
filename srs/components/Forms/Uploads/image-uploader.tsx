"use client";

import React, { useState } from "react";
import { ImageInput } from "@/srs/components/common/image-input";

interface ImageUploaderProps {
    initialImage?: string;
    disabled?: boolean;

    // Parent receives the raw File object
    onFileSelected?: (file: File | null) => void;
}

export const ImageUploader = ({initialImage, disabled, onFileSelected}: ImageUploaderProps) => {
    const [preview, setPreview] = useState<string | null>(initialImage ?? null);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (file: File | null) => {
        if (!file) {
            onFileSelected?.(null);
            return;
        }

        setError(null);

        // Preview
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);

        // Pass file back to parent form
        onFileSelected?.(file);
    };

    return (
        <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
                <ImageInput
                    label="Upload Logo"
                    preview={preview}
                    onChange={handleFileSelect}
                    error={error}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

































// "use client";
//
// import React, { useState } from "react";
// import { ImageInput } from "@/srs/components/common/image-input";
//
// interface ImageUploaderProps {
//     institutionId: string;
//     isLogo?: boolean;
//     initialImage?: string;
//     disabled?: boolean;
//     onUploaded?: (file: { id: string; s3Key: string }) => void;
// }
//
// export const ImageUploader = ({institutionId, isLogo = true, initialImage, disabled, onUploaded,}: ImageUploaderProps) => {
//     const [preview, setPreview] = useState<string | null>(initialImage ?? null);
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//
//     const handleFileSelect = async (file: File | null) => {
//         if (!file) return;
//
//         setUploading(true);
//         setError(null);
//
//         try {
//             const reader = new FileReader();
//             reader.onloadend = () => setPreview(reader.result as string);
//             reader.readAsDataURL(file);
//
//             const formData = new FormData();
//             formData.append("File", file);
//             formData.append("InstitutionId", institutionId);
//             formData.append("IsLogo", String(isLogo));
//
//             const res = await fetch("/api/file-uploads", {
//                 method: "POST",
//                 body: formData,
//             });
//
//             const data = await res.json();
//
//             if (!data.success) {
//                 setError(data.error || "Upload failed");
//                 return;
//             }
//
//             onUploaded?.({
//                 id: data.data.id,
//                 s3Key: data.data.s3Key,
//             });
//         } catch (err: any) {
//             setError(err.message || "Unexpected error");
//         } finally {
//             setUploading(false);
//         }
//     };
//
//     return (
//         <div className="grid grid-cols-12 gap-6 mt-5">
//             <div className="col-span-12">
//                 <ImageInput
//                     label="Upload Logo"
//                     preview={preview}
//                     onChange={handleFileSelect}
//                     error={error}
//                     disabled={uploading || disabled}
//                 />
//
//                 {uploading && (
//                     <p className="text-blue-600 text-sm mt-2">Uploading...</p>
//                 )}
//             </div>
//         </div>
//     );
// }


















































// "use client";
//
// import React, { useState } from "react";
//
// interface ImageUploaderProps {
//     institutionId: string;
//     isLogo?: boolean;
//     onUploaded?: (file: { id: string; s3Key: string }) => void;
// }
//
// export function ImageUploader({ institutionId, isLogo = true, onUploaded }: ImageUploaderProps) {
//     const [preview, setPreview] = useState<string | null>(null);
//     const [file, setFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState(false);
//
//     const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const f = e.target.files?.[0];
//         if (!f) return;
//
//         setFile(f);
//         setPreview(URL.createObjectURL(f));
//     };
//
//     const handleUpload = async () => {
//         if (!file) return;
//
//         setLoading(true);
//
//         const form = new FormData();
//         form.append("File", file);
//         form.append("InstitutionId", institutionId);
//         form.append("IsLogo", String(isLogo));
//
//         const res = await fetch("/api/file-uploads", {
//             method: "POST",
//             body: form,
//         });
//
//         const data = await res.json();
//         setLoading(false);
//
//         if (!data.success) {
//             alert(data.error || "Upload failed");
//             return;
//         }
//
//         onUploaded?.({
//             id: data.data.id,
//             s3Key: data.data.s3Key,
//         });
//     };
//
//     return (
//         <div className="space-y-4">
//             <label className="block text-sm font-medium text-gray-700">
//                 Upload Logo
//             </label>
//
//             <input type="file" accept="image/*" onChange={handleSelect} />
//
//             {preview && (
//                 <img
//                     src={preview}
//                     className="h-20 w-20 rounded-full object-cover border"
//                  alt={institutionId}/>
//             )}
//
//             <button
//                 type="button"
//                 onClick={handleUpload}
//                 disabled={!file || loading}
//                 className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
//             >
//                 {loading ? "Uploading..." : "Upload"}
//             </button>
//         </div>
//     );
// }


























// "use client";
//
// import React, { useState } from "react";
// import { UploadImageResponse_Types } from "@/srs/types/upload-image-response.types";
// import { ImageInput } from "@/srs/components/common/image-input";
//
// interface ImageUploaderProps {
//     initialImage?: string;
//     onUpload: (asset: { logoSanityId: string; logoUrl: string }) => void;
//     disabled?: boolean;
// }
//
// export const ImageUploader = ({ onUpload, initialImage, disabled }: ImageUploaderProps) => {
//     const [preview, setPreview] = useState<string | null>(initialImage || null);
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//
//     const handleFileSelect = async (file: File | null) => {
//         if (!file) return;
//
//         setUploading(true);
//         setError(null);
//
//         try {
//             // Local preview
//             const reader = new FileReader();
//             reader.onloadend = () => setPreview(reader.result as string);
//             reader.readAsDataURL(file);
//
//             // Upload
//             const formData = new FormData();
//             formData.append("File", file);
//
//             const res = await fetch("/api/upload-images", {
//                 method: "POST",
//                 body: formData,
//             });
//
//             const data: UploadImageResponse_Types = await res.json();
//
//             if (data.success && data.data?.document) {
//                 const doc = data.data.document;
//                 onUpload({
//                     logoSanityId: doc._id,
//                     logoUrl: doc.url,
//                 });
//             } else {
//                 setError(data.error || "Upload failed");
//             }
//         } catch (err: any) {
//             setError(err.message || "Unexpected error");
//         } finally {
//             setUploading(false);
//         }
//     };
//
//     return (
//         <div className="grid grid-cols-12 gap-6 mt-5">
//             <div className="col-span-12">
//             <ImageInput
//                 label="Upload Image"
//                 preview={preview}
//                 onChange={handleFileSelect}
//                 error={error}
//                 disabled={uploading || disabled}
//             />
//
//             {uploading && <p className="text-blue-600 text-sm">Uploading...</p>}
//         </div>
//         </div>
//     );
// };