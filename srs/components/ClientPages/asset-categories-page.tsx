"use client";

import { useState } from "react";
import { AssetCategoryForm } from "@/srs/components/Forms/DataForms/AssetCategoryForm";
import { Modal } from "@/srs/components/common/Modal";
import { AssetCategoriesList } from "@/srs/components/Forms/ListForms/AssetCategoriesList";
import { ServerDataWarningModal } from "@/srs/components/ui-components/error-component/server-data-error";
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header";
import {AssetCategory_Types} from "@/srs/types/assetCategory-Types";

interface ClientProps {
    assetCategories: AssetCategory_Types[];
    pageTitle: string;
    slug: string;
    baseUrl: string;
}

export default function AssetCategoriesPageClient({pageTitle, slug, baseUrl, assetCategories}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!assetCategories) {
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
                        if (fresh?.assetCategories) {
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
            
            {assetCategories.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <AssetCategoriesList
                    assetCategories={assetCategories}
                    pageTitle={pageTitle}
                    slug={slug}
                />
            )}
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
                <AssetCategoryForm
                    pageTitle={pageTitle}
                    slug={slug}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}