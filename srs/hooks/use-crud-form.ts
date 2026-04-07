// import { useState } from "react";
// import { HandleApiResponse } from "@/srs/utils/handle-api-response";
//
// interface CrudFormOptions {
//     showError: (msg: string) => void;
//     showSuccess: (msg: string) => void;
//     onSuccess?: () => void;
//     router: { push: (path: string) => void };
//     slug: string;
//     isEdit: boolean;
// }
//
// export function useCrudForm({showError, showSuccess, onSuccess, router, slug, isEdit}: CrudFormOptions) {
//     const [loading, setLoading] = useState(false);
//   
//     const submitForm = async (payload: any, id?: string) => {
//         setLoading(true);
//
//         const url = isEdit ? `/api/${slug}/${id}` : `/api/${slug}`;
//         const method = isEdit ? "PUT" : "POST";
//
//         try {
//             const res = await fetch(url, {
//                 method,
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify(payload),
//             });
//
//             const data = await res.json();
//
//             const ok = HandleApiResponse({
//                 response:data,
//                 data,
//                 action: isEdit ? "update" : "create", 
//                 pageTitle: slug.replace("-", " "),
//                 showError,
//                 showSuccess,
//                 onSuccess
//             });
//
//             if (!ok) return false;
//
//             router.push(`/${slug}`);
//             return true;
//
//         } catch (err) {
//             showError("Network error");
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return {loading, submitForm};
// }