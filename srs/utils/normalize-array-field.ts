export function normalizeArrayField(input: unknown): string[] {
    if (!Array.isArray(input)) return []

    return input
        .filter((item): item is string => typeof item === 'string')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
}