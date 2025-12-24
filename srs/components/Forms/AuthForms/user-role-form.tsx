'use client'

import {useState, FormEvent, useEffect} from 'react'
import { useRouter } from 'next/navigation' 
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";
import {UserRole_Types} from "@/srs/types/userRole-Types";
import { User_Types } from "@/srs/types/user-Types";
import { Role_Types } from "@/srs/types/role-Types";
import {useToastError} from "@/srs/hooks/useToastError";
import {useZodForm} from "@/srs/hooks/useZodForm";
import {userRoleSchema} from "@/srs/zodValidations/userRoleSchema";
import {ModalHeader} from "@/srs/components/common/ModalHeader";
import {ModalTitle} from "@/srs/components/common/ModalTitle";
import { ModalBody } from "../../common/ModalBody";
import {ModalFooter} from "@/srs/components/common/ModalFooter";
import {Button} from "@/srs/components/common/Button";
import {Dropdown} from "@/srs/components/common/Dropdown";

interface Props {
    pageTitle: string
    slug: string
    initialData?: UserRole_Types
    onSuccess?: () => void;
}

export const UserRoleForm = ({ pageTitle, slug, initialData, onSuccess }: Props) => {
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
    } = useZodForm(userRoleSchema, {
        userId: initialData?.users.id ?? "",
        roleId: initialData?.roles.id ?? "",
    })

    const [loading, setLoading] = useState(false)

    const [dropdowns, setDropdowns] = useState({
        roles: [] as Role_Types[],
        users: [] as User_Types[]
    })


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const endpoints = ["users", "system-roles"]
                const response = await Promise.all(endpoints.map((e) => fetch(`/api/${e}`)))
                const data = await Promise.all(response.map((r) => r.json()))

                setDropdowns({
                    users: data[0].users ?? [],
                    roles: data[1].roles ?? []
                })
            } catch (err) {
                console.error("Failed to load dropdowns:", err);
                setFormError("Failed to load dropdowns");
            }
        }
        fetchOptions()
    }, [setFormError])

    const requiredFields = [
        form.userId,
        form.roleId,
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
                <Dropdown
                    label="User"
                    value={form.userId}
                    options={dropdowns.users}
                    optionLabel={(val) => val.emailAddress}
                    optionValue={(val) => val.id}
                    onChange={(val) => updateField("userId", val)}
                    required
                    error={errors.userId}
                />
                <Dropdown
                    label="Role"
                    value={form.roleId}
                    options={dropdowns.roles}
                    optionLabel={(val) => val.roleName}
                    optionValue={(val) => val.id}
                    onChange={(val) => updateField("roleId", val)}
                    required
                    error={errors.roleId}
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
    )
}