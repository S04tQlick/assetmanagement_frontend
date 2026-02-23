"use client";

import { useState } from "react";
import { ServerDataWarningModal } from "@/srs/components/ui-components/error-component/server-data-error";
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header";
import {AssetForm} from "@/srs/components/Forms/DataForms/asset-form";
import {Asset_Types} from "@/srs/types/asset.types";
import { AssetsList } from "@/srs/components/Forms/ListForms/assets-list";
import {Modal} from "@/srs/components/common/modal";

interface ClientProps {
    assets: Asset_Types[];
    pageTitle: string;
    slug: string;
    baseUrl: string;
}

export default function AssetCategoriesPageClient({pageTitle, slug, baseUrl, assets}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!assets) {
        return (
            <ServerDataWarningModal
                open={true}
                title="Data Error!"
                message={pageTitle}
                retryInterval={5}
                onRetry={
                    async () => {
                        const res = await fetch(`${baseUrl}/api/${slug}`, {cache: "no-store"});
                        const fresh = await res.json();
                        if (fresh?.assets) {
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
            
            {assets.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <AssetsList
                    assets={assets}
                    pageTitle={pageTitle}
                    slug={slug}
                />
            )}
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
                <AssetForm
                    pageTitle={pageTitle}
                    slug={slug}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}