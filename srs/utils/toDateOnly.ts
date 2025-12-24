export const toDateOnly = (date: string | null | undefined): string => {
    if (!date) return ""
    return new Date(date).toISOString().split("T")[0]
}