import { toast } from "react-toastify";

export const useToastError = () => {
    const showError = (err: any) => {
        if (!err) {
            toast.error("Unknown error");
            return;
        }

        // 1. Already a string
        if (typeof err === "string") {
            toast.error(err);
            return;
        }

        // 2. Global exception middleware:
        // { statusCode: 409, error: "message" }
        if (err.statusCode && typeof err.error === "string") {
            toast.error(err.error);
            return;
        }

        // 3. API-level failure with nested error:
        // { success: false, error: { statusCode, error } }
        if (err.error && typeof err.error === "object") {
            if (typeof err.error.error === "string") {
                toast.error(err.error.error);
                return;
            }
        }

        // 4. API-level failure with simple string:
        // { success: false, error: "message" }
        if (typeof err.error === "string") {
            toast.error(err.error);
            return;
        }

        // 5. JS Error object
        if (err.message) {
            toast.error(err.message);
            return;
        }

        // 6. ModelState errors:
        // { errors: { field: ["msg"] } }
        if (err.errors && typeof err.errors === "object") {
            const firstKey = Object.keys(err.errors)[0];
            const firstMessage = err.errors[firstKey][0];
            toast.error(firstMessage);
            return;
        }

        // 7. Fallback
        toast.error(JSON.stringify(err));
    };

    return { showError };
};