interface HandleApiResponseOptions {
    response?: Response;       
    data?: any;                 
    action: "create" | "update" | "delete";
    pageTitle: string;
    showError: (msg: string) => void;
    showSuccess: (msg: string) => void;
    onSuccess?: () => void;
}

export const HandleApiResponse = ({
                                      response,
                                      data,
                                      action,
                                      pageTitle,
                                      showError,
                                      showSuccess,
                                      onSuccess,
                                  }: HandleApiResponseOptions): boolean => {

    if (response && !response.ok) {
        const msg = data?.error || `Failed to ${action} ${pageTitle}`;
        showError(msg);
        return false;
    }

    if (data && data.success === false) {
        showError(data.error || `Failed to ${action} ${pageTitle}`);
        return false;
    }

    const actionMessage = {
        create: `${pageTitle} created successfully`,
        update: `${pageTitle} updated successfully`,
        delete: `${pageTitle} deleted successfully`,
    }[action];

    showSuccess(actionMessage);
    onSuccess?.();
    return true;
}


























// export const HandleApiResponse = ({data, isEdit, pageTitle, showError, showSuccess, onSuccess}: {
//     data: any;
//     isEdit: boolean;
//     pageTitle: string;
//     showError: (msg: string) => void;
//     showSuccess: (msg: string) => void;
//     onSuccess?: () => void;
// }) => {
//     if (!data?.success) {
//         showError(data?.error || "Something went wrong");
//         return false;
//     }
//
//     showSuccess(
//         isEdit
//             ? `${pageTitle} updated successfully`
//             : `${pageTitle} created successfully`
//     );
//
//     onSuccess?.();
//     return true;
// }
