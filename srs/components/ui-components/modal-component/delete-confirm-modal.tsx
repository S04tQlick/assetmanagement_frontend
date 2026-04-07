interface DeleteConfirmModalProps {
    title?: string;
    description?: string;
    recordName?: string;
}

export const DeleteConfirmModal = (
    {
        title = "Confirm Deletion",
        description = "This action cannot be undone.",
        recordName,
    }: DeleteConfirmModalProps) => {
    
    return (
        <div className="flex flex-col items-center text-center py-4 px-4">
            <svg
                className="w-12 h-12 text-red-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>

            <h2 className="text-lg font-semibold text-red-600 mb-2">
                {title}
            </h2>

            {recordName && (
                <p className="text-md font-semibold text-red-600 mb-1">
                    {recordName}?
                </p>
            )}

            <p className="text-sm text-gray-500">{description}</p>
        </div>
    )
}