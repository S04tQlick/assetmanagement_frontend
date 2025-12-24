"use client";

import React, { useState } from "react";
import { UploadImageResponse_Types } from "@/srs/types/UploadImageResponse-Types";
import { ImageInput } from "@/srs/components/common/ImageInput";

interface ImageUploaderProps {
    initialImage?: string;
    onUpload: (asset: { logoSanityId: string; logoUrl: string }) => void;
    disabled?: boolean;
}

export const ImageUploader = ({ onUpload, initialImage, disabled }: ImageUploaderProps) => {
    const [preview, setPreview] = useState<string | null>(initialImage || null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (file: File | null) => {
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            // Local preview
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);

            // Upload
            const formData = new FormData();
            formData.append("File", file);

            const res = await fetch("/api/upload-images", {
                method: "POST",
                body: formData,
            });

            const data: UploadImageResponse_Types = await res.json();

            if (data.success && data.data?.document) {
                const doc = data.data.document;
                onUpload({
                    logoSanityId: doc._id,
                    logoUrl: doc.url,
                });
            } else {
                setError(data.error || "Upload failed");
            }
        } catch (err: any) {
            setError(err.message || "Unexpected error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12">
            <ImageInput
                label="Upload Image"
                preview={preview}
                onChange={handleFileSelect}
                error={error}
                disabled={uploading || disabled}
            />

            {uploading && <p className="text-blue-600 text-sm">Uploading...</p>}
        </div>
        </div>
    );
};