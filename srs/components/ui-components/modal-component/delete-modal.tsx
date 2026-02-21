"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; 
import { useToastError } from "@/srs/hooks/use-toast-error";
import { Button } from "@/srs/components/common/button";
import { ModalHeader } from "@/srs/components/common/modal-header";
import { ModalBody } from "@/srs/components/common/modal-body";
import { ModalFooter } from "@/srs/components/common/modal-footer";
import {useToastSuccess} from "@/srs/hooks/use-toast-success"; 

interface Props {
    pageTitle: string;
    slug: string;
    id?: string
    recordName: string 
    onSuccess?: () => void;
}

export const DeleteModal = ({ pageTitle, slug, id, recordName, onSuccess }: Props) => {
    const router = useRouter();
    const {showError} = useToastError();
    const {showSuccess} = useToastSuccess();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = `/api/${slug}/${id}`;

        try {
            const res = await fetch(url, {method: "DELETE"});
            const data = await res.json();

            if (!data.success) {
                showError(data.error || "Failed to delete record");
                return;
            }

            showSuccess(`${pageTitle} deleted successfully`);
            onSuccess?.();

            router.push(`/${slug}`);
        } catch (err) {
            showError(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <ModalHeader>
                <div className="flex items-center justify-center w-full">
                    <span className="text-2xl text-red-700 font-bold">Delete {pageTitle}</span>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="flex justify-center">
                    <div className=" rounded-lg shadow-2xl max-w-sm w-full p-6 text-center">
                        <svg className="w-20 h-20 text-red-700 mx-auto" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>

                        <p className="text-gray-700 mt-5 mb-3 text-md">
                            Are you sure you want to delete
                        </p>

                        <p className="font-semibold text-md text-red-700">
                            <strong>{recordName}?</strong>
                        </p>

                        <p className="text-gray-700 mt-3 text-md">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    type="submit"
                    variant="danger"
                    loading={loading}
                >
                    Delete
                </Button>
            </ModalFooter>
        </form>
    )
}