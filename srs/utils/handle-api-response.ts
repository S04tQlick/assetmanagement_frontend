export const HandleApiResponse = ({data, isEdit, pageTitle, showError, showSuccess, onSuccess}: {
    data: any;
    isEdit: boolean;
    pageTitle: string;
    showError: (msg: string) => void;
    showSuccess: (msg: string) => void;
    onSuccess?: () => void;
}) => {
    if (!data?.success) {
        showError(data?.error || "Something went wrong");
        return false;
    }

    showSuccess(
        isEdit
            ? `${pageTitle} updated successfully`
            : `${pageTitle} created successfully`
    );

    onSuccess?.();
    return true;
}
