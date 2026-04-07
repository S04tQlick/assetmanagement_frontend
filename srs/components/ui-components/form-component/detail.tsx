import React from "react";

import { DetailGrid, field } from "@/srs/components/common/detail-grid";
import { useModalSize } from "@/srs/context/modal-size-context";

export interface GenericDetailProps<T extends { id?: string | number }> {
    item: T;
    fields?: (keyof T)[];
    fieldLabels?: Partial<Record<keyof T, string>>;
}

export function Detail<T extends { id?: string | number }>(
    {
        item,
        fields,
        fieldLabels = {},
    }: GenericDetailProps<T>
) {

    const size = useModalSize();

    const keys = fields ?? (Object.keys(item) as (keyof T)[]);

    const items = keys.map((key) =>
        field(
            fieldLabels[key] ?? String(key),
            item[key] as React.ReactNode
        )
    );

    return (
        <DetailGrid
            size={size}
            items={items}
        />
    );
}