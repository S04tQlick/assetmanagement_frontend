import {ModalSize} from "@/srs/types/ui.types";
 
export const gridBySize = (size: ModalSize) => {
    const map: Partial<Record<ModalSize, string>> = {
        sm: "grid grid-cols-1",
        md: "grid grid-cols-1 sm:grid-cols-2",
        lg: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        xl: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        full: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    };
    return map[size] ?? "grid grid-cols-1";
}