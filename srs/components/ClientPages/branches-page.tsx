"use client";

import { useState } from "react"; 
import { Modal } from "@/srs/components/common/modal"; 
import { ServerDataWarningModal } from "@/srs/components/ui-components/error-component/server-data-error";
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header"; 
import { Branch_Types } from "@/srs/types/branch.types";
import {BranchesList} from "@/srs/components/Forms/ListForms/branches-list";
import {BranchForm} from "@/srs/components/Forms/DataForms/branch-form"; 

interface ClientProps {
    branches: Branch_Types[];
    pageTitle: string;
    slug: string;
    logoSlug: string;
    baseUrl: string;
}

export default function BranchesPageClient({pageTitle, slug, logoSlug, baseUrl, branches}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!branches) {
        return (
            <ServerDataWarningModal
                open={true}
                title="Data Error !"
                message={pageTitle}
                retryInterval={5}
                onRetry={
                    async () => {
                        const res = await fetch(`${baseUrl}/api/${slug}`, {cache: "no-store"});
                        const fresh = await res.json();
                        if (fresh?.branches) {
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
            
            {branches.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <BranchesList
                    branches={branches}
                    pageTitle={pageTitle}
                    slug={slug}
                    logoSlug={logoSlug}
                />
            )}
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
                <BranchForm
                    pageTitle={pageTitle}
                    slug={slug}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}