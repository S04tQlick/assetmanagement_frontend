"use client";

import { useState } from "react"; 
import { Modal } from "@/srs/components/common/Modal"; 
import { ServerDataWarningModal } from "@/srs/components/ui-components/error-component/server-data-error";
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header";
import {User_Types} from "@/srs/types/user-Types";
import {UsersList} from "@/srs/components/Forms/ListForms/UsersList";
import {UserForm} from "@/srs/components/Forms/DataForms/UserForm";

interface ClientProps {
    users: User_Types[];
    pageTitle: string;
    slug: string;
    baseUrl: string;
}

export default function UsersPageClient({pageTitle, slug, baseUrl, users}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!users) {
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
                        if (fresh?.users) {
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
            
            {users.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <UsersList
                    users={users}
                    pageTitle={pageTitle}
                    slug={slug}
                />
            )}
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
                <UserForm
                    pageTitle={pageTitle}
                    slug={slug}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}