import { toast } from "react-toastify";

export const useToastSuccess = () => {
    const showSuccess = (message: string) => toast.success(message);
    return { showSuccess };
};