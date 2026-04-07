import {ModalSize} from "@/srs/types/ui.types";
import {gridBySize} from "@/srs/components/ui-components/grid-component/grid-by-size";
import {ReactNode} from "react"; 

interface DetailItem {
    label?: string;
    value?: ReactNode;
    custom?: ReactNode;
} 

interface DetailGridProps {
    items: DetailItem[];
    size?: ModalSize
}

export const field = (label: string, value: ReactNode): DetailItem => ({
    label,
    value,
});

export const imageBlock = (src: string, alt?: string): DetailItem => ({
    custom: (
        <img
            src={src}
            alt={alt ?? "Image"}
            className="w-full h-auto object-contain rounded"
        />
    ),
});

export const DetailGrid = ({ items, size = "sm" }: DetailGridProps) => {
    const filtered = items.filter(
        item => item.custom || (
            item.value !== undefined &&
            item.value !== null &&
            item.value !== ""
        )
    );
    return (
        <main className={`my-8 mx-2 md:mx-4 ${gridBySize(size)} gap-6`}>
            {filtered.map((item, index) => (
                <div key={index} className="p-3 rounded border-b-2 border-gray-200 shadow-gray-200 shadow-2xl py-6">
                    {item.custom ? (item.custom) : (
                        <>
                            <h2 className="text-md font-bold text-pink-800 mb-2"> 
                                {item.label} {":-"}
                            </h2>
                            
                            <p className="text-md font-semibold">
                                {item.value}
                            </p>
                        </>
                    )}
                </div>
            ))}
        </main>
    )
}