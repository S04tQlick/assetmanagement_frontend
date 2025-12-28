export function filterWithPreserve<T extends { id: string }, TForm extends Record<string, any>>(
    items: T[],
    predicate: (item: T) => boolean,
    currentId: string,
    updateField: (field: keyof TForm, value: string) => void,
    fieldName: keyof TForm
): T[] {
    const filtered = items.filter(predicate)

    if (currentId && !filtered.some((i) => i.id === currentId)) {
        updateField(fieldName, "")
    }

    return filtered
}