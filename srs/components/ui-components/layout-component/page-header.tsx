import {Button} from "@/srs/components/common/button";
import React from "react";

export const PageHeader =({title, onAdd}: { title: string; onAdd: () => void; })=> {
    return (
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>

            <Button
                onClick={onAdd}
                variant={"secondary"}
                size={"md"}
            >
                Add New
            </Button>
        </div>
    );
}








// <div className="bg-gray-100 py-2 px-4">
//     <h2 className="text-xl font-semibold text-gray-800">Top Users</h2>
// </div>