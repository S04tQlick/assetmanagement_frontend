import { ReactNode } from "react"

interface ModalHeaderProps {
    children: ReactNode
}
 

export const ModalHeader = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-between p-4 border-b-3 border-gray-300 flex-shrink-0 text-lg font-semibold">
        {children}
    </div>
);


// export const ModalHeader = ({ children }: { children: React.ReactNode }) => (
//     <div className="flex items-center justify-between p-4 border-b-3 border-gray-300 flex-shrink-0">
//         <span className="text-lg font-semibold">
//             {children}
//         </span>
//     </div>
// );