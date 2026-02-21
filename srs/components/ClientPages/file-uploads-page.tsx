"use client";

import { useState } from "react"; 
import { Modal } from "@/srs/components/common/modal"; 
import { ServerDataWarningModal } from "@/srs/components/ui-components/error-component/server-data-error";
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header";
import {FileUpload_Types} from "@/srs/types/file-upload.types";
import {FileUploadsList} from "@/srs/components/Forms/ListForms/file-uploads-list";
import {FileUploadForm} from "@/srs/components/Forms/DataForms/file-upload-form";

interface ClientProps {
    fileUploads: FileUpload_Types[];
    pageTitle: string;
    baseUrl: string;
    slug: string;
}

export default function FileUploadsClientPage({pageTitle, slug, baseUrl, fileUploads}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!fileUploads) { 
        return (
            <ServerDataWarningModal 
                open={true} 
                title="Data Error !" 
                message={pageTitle} 
                retryInterval={5} 
                onRetry={
                async () => { 
                    const res = await fetch(`${baseUrl}/api/${slug}`, { cache: "no-store" }); 
                    const fresh = await res.json(); 
                    if (fresh?.assetTypes) { 
                        window.location.reload(); 
                        return true; 
                    } 
                    return false; 
                }
            } 
            /> 
        ); 
    }
    
    return (
        <>
            <PageHeader
                title={pageTitle}
                onAdd={() => setIsModalOpen(true)}
            />
            
            {fileUploads.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <FileUploadsList
                    fileUploads={fileUploads}
                    pageTitle={pageTitle}
                    slug={slug}
                />
            )}
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
                <FileUploadForm
                    pageTitle={pageTitle}
                    slug={slug}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}