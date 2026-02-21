"use client";

import { useState } from "react";
import { ServerDataWarningModal } from "@/srs/components/ui-components/error-component/server-data-error";
import {PageHeader} from "@/srs/components/ui-components/layout-component/page-header";
import {Modal} from "@/srs/components/common/modal";
import {Vendor_Types} from "@/srs/types/vendor.types";
import {VendorsList} from "@/srs/components/Forms/ListForms/vendor-list";
import {VendorForm} from "@/srs/components/Forms/DataForms/vendor-form";

interface ClientProps {
    vendors: Vendor_Types[];
    pageTitle: string;
    slug: string;
    baseUrl: string;
}

export default function VendorsPageClient({pageTitle, slug, baseUrl, vendors}: ClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!vendors) {
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
                        if (fresh?.vendors) {
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
            
            {vendors.length === 0 ? (
                <p>No {pageTitle} found.</p>
            ) : (
                <VendorsList
                    vendors={vendors}
                    pageTitle={pageTitle}
                    slug={slug}
                />
            )}
            
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
                <VendorForm
                    pageTitle={pageTitle}
                    slug={slug}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}