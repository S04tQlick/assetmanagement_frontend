import {ZodError} from 'zod'

export function formatZodErrors(error: ZodError): string[] {
    return error.issues.map((e) => {
        const path = e.path.join('.')
        const message = e.message
        return path ? `${path}: ${message}` : message
    })
}