"use client";

import { useState } from "react"; 
import { Modal } from "@/srs/components/common/Modal"; 
import { ServerDataWarningModal } from "@/srs/components/ui-components/error-component/server-data-error";
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header"; 
import {UserRole_Types} from "@/srs/types/userRole-Types";
import {UserRolesList} from "@/srs/components/Forms/ListForms/UserRolesList";
import {UserRoleForm} from "@/srs/components/Forms/AuthForms/user-role-form";

interface ClientProps {
    userRoles: UserRole_Types[];
    pageTitle: string;
    slug: string;
    baseUrl: string;
}

export default function UserRolesPageClient({pageTitle, slug, baseUrl, userRoles}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!userRoles) {
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
            
            {userRoles.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <UserRolesList
                    userRoles={userRoles}
                    pageTitle={pageTitle}
                    slug={slug}
                />
            )}
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="sm">
                <UserRoleForm
                    pageTitle={pageTitle}
                    slug={slug}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}