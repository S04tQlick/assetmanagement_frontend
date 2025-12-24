'use client'

interface ErrorFormProps {
    message: any
}

export const ErrorForm = ({ message }: ErrorFormProps) => {
    if (!message) return null

    const text =
        typeof message === "string"
            ? message
            : typeof message === "object"
                ? JSON.stringify(message, null, 2)
                : String(message)

    return (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            <pre className="break-words whitespace-pre-wrap text-sm">
                <strong className="font-bold">Error: </strong> 
                {text}
            </pre>
        </div>
    )
}