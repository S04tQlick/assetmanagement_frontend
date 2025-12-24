'use client'

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useToastError } from "@/srs/hooks/useToastError";
import { useZodForm } from "@/srs/hooks/useZodForm";
import { ModalHeader } from "@/srs/components/common/ModalHeader";
import { ModalTitle } from "@/srs/components/common/ModalTitle";
import {ModalBody} from "@/srs/components/common/ModalBody";
import { ModalFooter } from "@/srs/components/common/ModalFooter";
import { Button } from "@/srs/components/common/Button";
import { userSchema } from "@/srs/zodValidations/userSchema";
import { User_Types } from "@/srs/types/user-Types";
import { Institution_Types } from "@/srs/types/institution-Types";
import {AuthRegisterFields} from "@/srs/components/Forms/AuthForms/auth-register-fields";
import { UserFields } from "../FieldsForms/user-fields";
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";
import {Dropdown} from "@/srs/components/common/Dropdown";

interface Props {
    pageTitle: string;
    slug: string;
    initialData?: User_Types;
    onSuccess?: () => void;
}

export const UserForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
    const router = useRouter();
    const isEdit = Boolean(initialData?.id);
    const {showError} = useToastError();

    const {
        form,
        errors,
        formError,
        setFormError,
        updateField,
        validateForm,
    } = useZodForm(userSchema, {
        mode: initialData ? "update" : "create",
        firstName: initialData?.firstName ?? "",
        lastName: initialData?.lastName ?? "",
        emailAddress: initialData?.emailAddress ?? "",
        phoneNumber: initialData?.phoneNumber ?? "",
        passwordHash: "",
        confirmPassword: "",
        institutionId: initialData?.institutions.id ?? "",
    });

    const [loading, setLoading] = useState(false);

    const [dropdowns, setDropdowns] = useState({
        institutions: [] as Institution_Types[],
    })

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const endpoints = ["institutions"]
                const responses = await Promise.all(endpoints.map((e) => fetch(`/api/${e}`)))
                const data = await Promise.all(responses.map((r) => r.json()))

                setDropdowns({
                    institutions: data[0].institutions ?? [],
                });
            } catch (err) {
                console.error("Failed to load dropdowns:", err);
                setFormError("Failed to load dropdowns");
            }
        };

        fetchDropdowns();
    }, [setFormError]);

    const requiredFields = [
        form.firstName,
        form.lastName,
        form.phoneNumber,
        form.institutionId,
        ...(isEdit ? [] : [form.emailAddress, form.passwordHash, form.confirmPassword]),
    ];

    const isFormIncomplete = requiredFields.some((v) => !v?.trim());

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFormError(null);

        const payload = validateForm();
        if (!payload) {
            setLoading(false);
            return;
        }

        const url = isEdit
            ? `/api/${slug}/${initialData!.id}`
            : `/api/${slug}`;

        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!data.success) {
                showError(data);
                return;
            }

            if (onSuccess) onSuccess();

            router.push(`/${slug}`);
        } catch (err) {
            showError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <ModalHeader>
                <ModalTitle isEdit={isEdit} pageTitle={pageTitle}/>
            </ModalHeader>

            <ModalBody>
                <UserFields
                    {...form}
                    onChange={updateField}
                    errors={errors}
                />

                {!isEdit && (
                    <AuthRegisterFields
                        {...form}
                        onChange={updateField}
                        errors={errors}
                    />
                )}

                <Dropdown
                    label="Institution"
                    value={form.institutionId}
                    options={dropdowns.institutions}
                    optionLabel={(val) => val.institutionName}
                    optionValue={(val) => val.id}
                    onChange={(val) => updateField("institutionId", val)}
                    required
                    error={errors.institutionId}
                />

                {formError && <ErrorForm message={formError}/>}
            </ModalBody>

            <ModalFooter>
                <Button
                    type="submit"
                    loading={loading}
                    isDisabled={isFormIncomplete}
                    isEdit={isEdit}
                    pageTitle={pageTitle}
                />
            </ModalFooter>
        </form>
    );
}