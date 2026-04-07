"use client";

import { InstitutionLogoFetch } from "@/srs/lib/awsS3Bucket/institution-logo-fetch";
import { DetailGrid, field, imageBlock } from "@/srs/components/common/detail-grid";
import { Institution_Types } from "@/srs/types/institution.types";
import { useModalSize } from "@/srs/context/modal-size-context";

interface Props {
    logoSlug: string;
    institution: Institution_Types;
}

export default function InstitutionDetailClient({logoSlug, institution,}: Props) {
    const logoUrl =
        institution.fileUploads?.[0]?.id &&
        InstitutionLogoFetch(institution, logoSlug);

    return (
        <div className="w-full">
            <DetailGrid
                size={useModalSize()}
                items={[
                    field("Email", institution.institutionEmail),
                    field("Contact", institution.institutionContactNumber),
                    field("Primary Color", institution.primaryColor),
                    field("Secondary Color", institution.secondaryColor),
                    logoUrl &&
                    imageBlock(
                        logoUrl,
                        `${institution.institutionName} logo`
                    ),
                ].filter(Boolean) as any}
            />
        </div>
    );
}































































// "use client";
//
// import { useState } from "react";
// import { Modal } from "@/srs/components/common/modal";
// import { ModalHeader } from "@/srs/components/common/modal-header";
// import { ModalBody } from "@/srs/components/common/modal-body";
// import { ModalFooter } from "@/srs/components/common/modal-footer";
// import { Button } from "@/srs/components/common/button";
// import { DeleteModal } from "@/srs/components/ui-components/modal-component/delete-modal";
// import { InstitutionLogoFetch } from "@/srs/lib/awsS3Bucket/institution-logo-fetch";
// import { DetailGrid, field, imageBlock } from "@/srs/components/common/detail-grid";
// import { Institution_Types } from "@/srs/types/institution.types";
// import {InstitutionForm} from "@/srs/components/Forms/DataForms/institution-form ";
// import {useModalSize} from "@/srs/context/modal-size-context";
//
// interface Props {
//     pageTitle: string;
//     slug: string;
//     logoSlug: string;
//     institution: Institution_Types;
//     onClose: () => void;
// }
//
// export default function InstitutionDetailClient({pageTitle, slug, logoSlug, institution, onClose }: Props) { 
//     const modalSize = useModalSize();
//     const [editOpen, setEditOpen] = useState(false);
//     const [deleteOpen, setDeleteOpen] = useState(false);
//
//     const logoUrl =
//         institution.fileUploads?.[0]?.id &&
//         InstitutionLogoFetch(institution, logoSlug);
//
//     return (
//         <>
//             <div className="flex flex-col flex-1 min-h-0">
//                 <ModalHeader>{institution.institutionName}</ModalHeader>
//
//                 <ModalBody>
//                     <DetailGrid
//                         size={modalSize}
//                         items={[
//                             field("Email", institution.institutionEmail),
//                             field("Contact", institution.institutionContactNumber),
//                             field("Primary Color", institution.primaryColor),
//                             field("Secondary Color", institution.secondaryColor),
//                             logoUrl && imageBlock(logoUrl, `${institution.institutionName} logo`),
//                         ].filter(Boolean) as any}
//                     />
//                 </ModalBody>
//
//                 <ModalFooter>
//                     <div className="flex mt-4 space-x-3">
//                         <Button onClick={() => setEditOpen(true)} variant="success">
//                             Edit
//                         </Button>
//
//                         <Button onClick={() => setDeleteOpen(true)} variant="danger">
//                             Delete
//                         </Button>
//                     </div>
//                 </ModalFooter>
//             </div>
//
//             {/*<Modal open={editOpen} onClose={() => setEditOpen(false)} size="lg">*/}
//             {/*    <InstitutionForm*/}
//             {/*        pageTitle={pageTitle}*/}
//             {/*        slug={slug}*/}
//             {/*        logoSlug={logoSlug}*/}
//             {/*        initialData={institution}*/}
//             {/*        onSuccess={() => {*/}
//             {/*            setEditOpen(false);*/}
//             {/*            onClose();*/}
//             {/*        }}*/}
//             {/*    />*/}
//             {/*</Modal>*/}
//
//             {/*<Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} size="lg">*/}
//             {/*    <DeleteModal*/}
//             {/*        pageTitle={pageTitle}*/}
//             {/*        slug={slug}*/}
//             {/*        id={institution.id}*/}
//             {/*        recordName={institution.institutionName}*/}
//             {/*        onSuccess={() => {*/}
//             {/*            setDeleteOpen(false);*/}
//             {/*            onClose();*/}
//             {/*        }}*/}
//             {/*    />*/}
//             {/*</Modal>*/}
//         </>
//     );
// }













// items={[field("Email", institution.institutionEmail),
//     field("Contact", institution.institutionContactNumber),
//     field("Primary Color", institution.primaryColor),
//     field("Secondary Color", institution.secondaryColor),
//     logoUrl && imageBlock(logoUrl),].filter(Boolean) as DetailItem[]
// }

























// "use client"
//
// import React, { useState } from "react"
// import { Modal } from "@/srs/components/common/modal" 
// import { Institution_Types } from "@/srs/types/institution.types"
// import { ModalHeader } from "@/srs/components/common/modal-header"
// import { ModalBody } from "@/srs/components/common/modal-body"
// import {ModalFooter} from "@/srs/components/common/modal-footer"; 
// import {Button} from "@/srs/components/common/button";
// import {InstitutionForm} from "@/srs/components/Forms/DataForms/institution-form ";
// import {DeleteModal} from "@/srs/components/ui-components/modal-component/delete-modal";
// import {InstitutionLogoFetch} from "@/srs/lib/awsS3Bucket/institution-logo-fetch";
//
// interface Props {
//     pageTitle: string
//     slug: string
//     logoSlug: string
//     institution: Institution_Types
//     onClose: () => void
// }
//
// export default function InstitutionDetailClient({ pageTitle, slug, logoSlug, institution, onClose }: Props) {
//     const [editOpen, setEditOpen] = useState(false)
//     const [deleteOpen, setDeleteOpen] = useState(false)
//
//     return (
//         <>
//             <div className="flex flex-col flex-1 min-h-0">
//                 <ModalHeader>
//                     {institution.institutionName}
//                 </ModalHeader>
//                 <ModalBody>
//                     <ul>
//                         {institution.institutionEmail && (
//                              <li>
//                                 <span className="font-bold text-black dark:text-gray-900">Description:</span>
//                                 <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
//                                     {institution.institutionEmail}
//                                 </p>
//                             </li>
//                         )}
//                         {institution.institutionContactNumber && (
//                             <li>
//                                 <span
//                                     className="font-bold text-black dark:text-gray-900">institutionContactNumber:</span>
//                                 <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
//                                     {institution.institutionContactNumber}
//                                 </p>
//                             </li>
//                         )}
//                         {institution.primaryColor && (
//                             <li>
//                                 <span className="font-bold text-black dark:text-gray-900">primaryColor:</span>
//                                 <p className="text-black dark:text-gray-900 text-sm mt-2 mb-2">
//                                     {institution.primaryColor}
//                                 </p>
//                             </li>
//                         )}
//                         {institution.secondaryColor && (
//                             <li>
//                                 <span className="font-bold text-black dark:text-gray-900">secondaryColor:</span>
//                                 <p className="text-black dark:text-gray-900 text-sm mt-2">
//                                     {institution.secondaryColor}
//                                 </p>
//                             </li>
//                         )}
//                         {institution.fileUploads?.[0]?.id && (
//                             <li>
//                                 <span className="font-bold text-black dark:text-gray-900">logoUrl:</span>
//                                 <img src={InstitutionLogoFetch(institution, logoSlug)}
//                                      alt={`${institution.institutionName} logo`}
//                                      className="max-w-xs md:max-w-sm m-auto"
//                                 /> 
//                                
//                             </li>
//                         )}
//                     </ul>
//
//                 </ModalBody>
//                 <ModalFooter>
//                     <div className="flex mt-4 space-x-3">
//                         <div className="flex mt-4 space-x-3">
//                             <Button
//                                 onClick={() => setEditOpen(true)}
//                                 variant={"success"}
//                             >
//                                 Edit
//                             </Button>
//
//                             <Button
//                                 onClick={() => setDeleteOpen(true)}
//                                 variant={"danger"}
//                             >
//                                 Delete
//                             </Button>
//                         </div>
//                     </div>
//                 </ModalFooter>
//             </div>
//
//             <Modal open={editOpen} onClose={() => setEditOpen(false)} size={"xl"}>
//                 <InstitutionForm
//                     pageTitle={pageTitle}
//                     slug={slug}
//                     logoSlug={logoSlug}
//                     initialData={institution}
//                     onSuccess={() => {
//                         setEditOpen(false)
//                         onClose()
//                     }}
//                 />
//             </Modal>
//
//             <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} size={"sm"}>
//                 <DeleteModal
//                     pageTitle={pageTitle}
//                     slug={slug}
//                     id={institution.id}
//                     recordName={institution.institutionName}
//                     onSuccess={() => {
//                         setDeleteOpen(false)
//                         onClose()
//                     }}
//                 />
//             </Modal>
//         </>
//     )
// }