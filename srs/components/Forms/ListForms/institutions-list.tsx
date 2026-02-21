// "use client";
//
// import React, { useState } from "react";
// import { Modal } from "@/srs/components/common/modal";
// import { Institution_Types } from "@/srs/types/institution.types";
// import InstitutionDetailClient from "@/srs/components/Forms/DetailsForms/institution-details";
// import { Button } from "@/srs/components/common/button";
//
// interface ListProps {
//     pageTitle: string;
//     slug: string;
//     logoSlug: string;
//     institutions: Institution_Types[];
// }
//
// export const InstitutionsList = ({ pageTitle, slug, logoSlug, institutions }: ListProps) => {
//     const [open, setOpen] = useState(false);
//     const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
//     const [selected, setSelected] = useState<Institution_Types | null>(null);
//    
//
//     const handleView = (institution: Institution_Types) => {
//         setSelected(institution);
//         setOpen(true);
//     };
//
//     const getLogoSrc = (item: Institution_Types)=>
//     {
//        return item.fileUploads?.[0]?.id
//             ? `/api/${logoSlug}/${item.fileUploads[0].id}`
//             : "/placeholder-logo.png";
//     }  
//    
//
//     return (
//         <>
//             <ul className="space-y-6">
//                 {institutions.map((item) => (
//                     <li
//                         key={item.id}
//                         className="border p-4 rounded shadow-sm hover:bg-gray-200 transition-colors flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
//                     >
//                         <div className="flex items-start gap-3 md:items-center md:flex-1">
//                             <img
//                                 className="rounded-full h-10 w-10 object-cover bg-gray-100 flex-shrink-0"
//                                 src={getLogoSrc(item)}
//                                 alt={`${item.institutionName} logo`}
//                             />
//
//                             <p className="text-sm font-bold text-gray-900 leading-snug break-words md:text-balance">
//                                 {item.institutionName}
//                             </p>
//                         </div>
//
//                         <Button
//                             onClick={() => handleView(item)}
//                             variant="success_bd"
//                             className="flex-shrink-0"
//                         >
//                             View →
//                         </Button>
//                     </li>
//                 ))}
//             </ul>
//
//             <Modal open={open} onClose={() => setOpen(false)} size="xl">
//                 {selected && (
//                     <InstitutionDetailClient
//                         pageTitle={pageTitle}
//                         slug={slug}
//                         institution={selected}
//                         onClose={() => setOpen(false)}
//                     />
//                 )}
//             </Modal>
//         </>
//     );
// };























"use client"

import React, { useState } from "react"
import { Modal } from "@/srs/components/common/modal"
import { Institution_Types } from "@/srs/types/institution.types";
import InstitutionDetailClient from "@/srs/components/Forms/DetailsForms/institution-details";
import {Button} from "@/srs/components/common/button";
import {InstitutionLogoFetch} from "@/srs/lib/awsS3Bucket/institution-logo-fetch";

interface ListProps {
    pageTitle: string;
    slug: string;
    logoSlug: string;
    institutions: Institution_Types[]
}


export const InstitutionsList = ({ pageTitle, slug,logoSlug, institutions }: ListProps) => {
    const [open, setOpen] = useState(false)
    //const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
    const [selected, setSelected] = useState<Institution_Types | null>(null)
    
    const handleView = (item: Institution_Types) => {
        setSelected(item)
        setOpen(true)
    }
    

    return (
        <>
            <ul className="space-y-6">
                {institutions.map((item) => (
                    <li key={item.id}
                        className="border p-4 rounded shadow-sm hover:bg-gray-200 transition-colors flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
                        <div className="flex items-start gap-3 md:items-center md:flex-1">
                            <img
                                className="rounded-full h-10 w-10 object-cover bg-gray-100 flex-shrink-0"
                                src={InstitutionLogoFetch(item, logoSlug)}
                                alt={`${item.institutionName} logo`}
                            />

                            <p className="text-sm font-bold text-gray-900 leading-snug break-words md:text-balance">
                                {item.institutionName}
                            </p>
                        </div>
                        <div className="flex justify-end md:justify-end">
                            <Button
                                onClick={() => handleView(item)}
                                variant="success_bd"
                                className="flex-shrink-0"
                            >
                                View →
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal open={open} onClose={() => setOpen(false)} size="xl">
                {selected && (
                    <InstitutionDetailClient
                        pageTitle={pageTitle}
                        slug={slug}
                        logoSlug={logoSlug}
                        institution={selected}
                        onClose={() => setOpen(false)}
                    />
                )}

            </Modal>
        </>
    )
}