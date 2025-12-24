"use client";

import { useState } from "react";
import { AssetTypeForm } from "@/srs/components/Forms/DataForms/AssetTypeForm";
import { Modal } from "@/srs/components/common/Modal";
import { AssetTypesList } from "@/srs/components/Forms/ListForms/AssetTypesList";
import { AssetType_Types } from "@/srs/types/assetType-Types";
import { ServerDataWarningModal } from "@/srs/components/ui-components/error-component/server-data-error";
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header"; 

interface ClientProps {
    assetTypes: AssetType_Types[];
    pageTitle: string;
    baseUrl: string;
    slug: string;
}

export default function AssetTypesPageClient({pageTitle, slug, baseUrl, assetTypes}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!assetTypes) { 
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
            
            {assetTypes.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <AssetTypesList
                    assetTypes={assetTypes}
                    pageTitle={pageTitle}
                    slug={slug}
                />
            )}
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
                <AssetTypeForm
                    pageTitle={pageTitle}
                    slug={slug}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}