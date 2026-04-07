// "use client"
//
// import React, { useCallback, useState, useRef } from "react"
// import { Button } from "@/srs/components/common/button"
// import { DeleteConfirmModal } from "@/srs/components/ui-components/modal-component/delete-confirm-modal"
// import { useCrudDelete } from "@/srs/hooks/use-crud-delete"
// import { useToastError } from "@/srs/hooks/use-toast-error"
// import { useToastSuccess } from "@/srs/hooks/use-toast-success"
// import { DeleteModal } from "@/srs/components/ui-components/modal-component/delete-modal"
// import {EditModal} from "@/srs/components/ui-components/modal-component/edit-modal"
// import { ViewModal } from "@/srs/components/ui-components/modal-component/view-modal"
// import {useCrudFormSuccess} from "@/srs/hooks/use-crud-form-success";
// import { AssetType_Types } from "@/srs/types/asset-type.types"
// import {AssetTypeDetailClient} from "@/srs/components/Forms/DetailsForms/asset-type-details";
// import {AssetTypeForm} from "@/srs/components/Forms/DataForms/asset-type-form";
//
// interface ListProps {
//     pageTitle: string
//     slug: string 
//     assetTypes: AssetType_Types[]
//     onView: (item: AssetType_Types) => void;
// }
//
// export const AssetTypesList = ({pageTitle, slug, assetTypes, onView}: ListProps) => {
//     const [assetTypesState, setAssetTypesState] = useState<AssetType_Types[]>(assetTypes)
//     const [selected, setSelected] = useState<AssetType_Types | null>(null)
//     const [viewOpen, setViewOpen] = useState(false)
//     const [editOpen, setEditOpen] = useState(false)
//     const [deleteOpen, setDeleteOpen] = useState(false)
//
//     const formSubmitFnRef = useRef<(() => Promise<void>) | null>(null)
//
//     const {showError} = useToastError()
//     const {showSuccess} = useToastSuccess()
//
//     const handleView = (item: AssetType_Types) => {
//         setSelected(item)
//         setViewOpen(true)
//     }
//
//     const registerSubmit = useCallback((fn: () => Promise<void>) => {
//         formSubmitFnRef.current = fn
//     }, [])
//
//     const handleFormSuccess = useCrudFormSuccess<AssetType_Types>({
//         setItems: setAssetTypesState,
//         setEditOpen,
//         setViewOpen,
//         selectedId: selected?.id,
//         setSelected,
//     })
//
//     const {loading: deleting, deleteItem} = useCrudDelete({
//         slug,
//         showError,
//         showSuccess,
//         onSuccess: () => {
//             setAssetTypesState((prev) => prev.filter((i) => i.id !== selected?.id))
//             setDeleteOpen(false)
//             setViewOpen(false)
//             setSelected(null)
//         },
//         router: {
//             push: () => {
//             }
//         },
//     })
//
//     const handleDelete = async () => {
//         if (!selected) return
//         await deleteItem(selected.id!)
//     }
//
//     return (
//         <>
//             <ul className="space-y-4">
//                 {assetTypesState.map((item) => (
//                     <li
//                         key={item.id}
//                         className="flex justify-between items-center border p-4 rounded shadow-sm hover:bg-gray-100 transition"
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="font-semibold">{item.assetTypeName}</span>
//                         </div>
//                         <Button variant="success_bd" className="flex-shrink-0" onClick={() => onView(item)}>
//                             View →
//                         </Button>
//                     </li>
//                 ))}
//             </ul>
//
//             <ViewModal
//                 isOpen={viewOpen}
//                 onClose={() => setViewOpen(false)}
//                 title={selected?.assetTypeName}
//                 onEdit={() => setEditOpen(true)}
//                 onDelete={() => setDeleteOpen(true)}
//                 width={"2xl"} 
//             >
//                 {selected && (
//                     <AssetTypeDetailClient
//                         assetType={selected}
//                     />
//                 )}
//             </ViewModal>
//
//             <EditModal
//                 isOpen={editOpen}
//                 onClose={() => setEditOpen(false)}
//                 entityName={selected?.assetTypeName}
//                 onSave={() => formSubmitFnRef.current?.()}
//                 width={"lg"} 
//             >
//                 {selected && (
//                     <AssetTypeForm
//                         pageTitle={pageTitle}
//                         slug={slug}
//                         initialData={selected}
//                         onSuccess={handleFormSuccess}
//                         registerSubmit={registerSubmit}
//                     />
//                 )}
//             </EditModal>
//
//             <DeleteModal
//                 isOpen={deleteOpen}
//                 onClose={() => setDeleteOpen(false)}
//                 recordName={selected?.assetTypeName}
//                 onDelete={handleDelete}
//                 loading={deleting}
//                 width={"sm"}
//             >
//                 {selected && <DeleteConfirmModal recordName={selected.assetTypeName}/>}
//             </DeleteModal>
//         </>
//     )
// }