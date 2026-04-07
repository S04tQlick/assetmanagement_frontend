import React from "react";

import {Button} from "@/srs/components/common/button";

export interface ListProps<T extends { id?: string; name?: string }> {
    items: T[];
    onView: (item: T) => void;
    getName?: (item: T) => string;
}

export function List<T extends { id?: string; name?: string }>(
    {
        items,
        onView,
        getName = (item) => item.name ?? "Record",
                                                                              
    }: ListProps<T>
) {
    
    return (
        <>
            <ul className="space-y-4">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center border p-4 rounded shadow-sm hover:bg-gray-100 transition"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-semibold">{getName(item)}</span>
                        </div>
                        <Button variant="success_bd" className="flex-shrink-0" onClick={() => onView(item)}>
                            View →
                        </Button>
                    </li>
                ))}
            </ul>
        </>
    )
}