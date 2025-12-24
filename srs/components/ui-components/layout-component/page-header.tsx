import {Button} from "@/srs/components/common/Button";

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