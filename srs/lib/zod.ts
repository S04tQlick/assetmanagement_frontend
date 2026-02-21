import type { ZodError } from "zod";

export function formatZodErrors(error: ZodError) {
    return error.issues.map(issue => ({
        path: issue.path.join("."),
        message: issue.message,
    }));
}

// export function formatZodErrors(error: ZodError): string[] {
//     return error.issues.map((e) => {
//         const path = e.path.join('.')
//         const message = e.message
//         return path ? `${path}: ${message}` : message
//     })
// }