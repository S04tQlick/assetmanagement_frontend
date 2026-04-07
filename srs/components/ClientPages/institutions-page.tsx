"use client"

import { useState } from "react"
import {InstitutionsList} from "@/srs/components/Forms/ListForms/institutions-list"; 
import {Institution_Types} from "@/srs/types/institution.types"; 
import {ServerDataWarningModal} from "@/srs/components/ui-components/error-component/server-data-error"; 
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header"; 

interface ClientProps {
    institutions: Institution_Types[]
    pageTitle: string
    baseUrl: string
    slug: string
    logoSlug: string
}

export default function InstitutionsPageClient({pageTitle, slug,logoSlug,baseUrl, institutions}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!institutions) {
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
                        if (fresh?.institutions) {
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

            {institutions.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <InstitutionsList
                    institutions={institutions}
                    pageTitle={pageTitle}
                    slug={slug}
                    logoSlug={logoSlug}
                />
            )}

            {/*<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">*/}
            {/*    <InstitutionForm*/}
            {/*        pageTitle={pageTitle}*/}
            {/*        slug={slug}*/}
            {/*        logoSlug={logoSlug}*/}
            {/*        onSuccess={() => setIsModalOpen(false)}*/}
            {/*    />*/}
            {/*</Modal>*/}
        </>
    )
}