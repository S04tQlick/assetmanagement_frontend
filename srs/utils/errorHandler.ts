export function handleErrors(
    data: any,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) {
    // Reset previous errors
    setErrors({})
    setError(null)

    if (data?.error?.errors) {
        // Zod-style field-level errors
        const fieldErrors: Record<string, string> = {}
        data.error.errors.forEach((e: any) => {
            const field = e.path[0] // usually the field name
            fieldErrors[field] = e.message
        })
        setErrors(fieldErrors)
    } else if (data?.error) {
        // Global error message
        setError(typeof data.error === 'string' ? data.error : 'Failed to save asset.')
    } else {
        // Fallback
        setError('Unknown error occurred')
    }
}