import { useMemo, useEffect } from "react"

interface UseDependentDropdownProps<T> {
    parentValues: any[]
    selectedValue: string
    data: T[]
    filterFn: (item: T) => boolean
    getId: (item: T) => string
    reset: () => void
}

export function useDependentDropdown<T>({
                                            parentValues,
                                            selectedValue,
                                            data,
                                            filterFn,
                                            getId,
                                            reset,
                                        }: UseDependentDropdownProps<T>) {

    const filtered = useMemo(() => {
        if (parentValues.some(v => !v)) return []
        return data.filter(filterFn)
    }, [data, ...parentValues])

    useEffect(() => {
        if (
            selectedValue &&
            !filtered.some(item => getId(item) === selectedValue)
        ) {
            reset()
        }
    }, [filtered])

    return filtered
}