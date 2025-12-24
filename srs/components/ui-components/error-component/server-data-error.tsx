"use client";

import React, { useEffect, useState } from "react";
import { ModalHeader } from "@/srs/components/common/ModalHeader";
import { ModalBody } from "@/srs/components/common/ModalBody";
import { ModalFooter } from "@/srs/components/common/ModalFooter";

interface WarningModalProps {
    open: boolean;
    title?: string;
    message: string;
    retryInterval?: number;
    onRetry: () => Promise<boolean>;
}

export const ServerDataWarningModal = ({
                                           open,
                                           title = "Warning",
                                           message,
                                           retryInterval = 5,
                                           onRetry,
                                       }: WarningModalProps) => {
    const [countdown, setCountdown] = useState(retryInterval);
    const [isRetrying, setIsRetrying] = useState(false);

    useEffect(() => {
        if (!open) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) return retryInterval;
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [open, retryInterval]);

    useEffect(() => {
        if (countdown !== retryInterval) return;

        const attemptRetry = async () => {
            setIsRetrying(true);
            const success = await onRetry();
            setIsRetrying(false);
        };
        attemptRetry();
    }, [countdown, retryInterval, onRetry]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="bg-white w-sm max-w-sm rounded-lg shadow-lg p-6 text-center">
                <ModalHeader>{title}</ModalHeader>

                <ModalBody>
                    <p className="text-gray-700">Failed to load</p>
                    <p className="font-semibold text-red-700">
                        <strong>{message}</strong>
                    </p>
                    <p className="text-gray-700">Please try again.</p>

                    
                </ModalBody>

                <ModalFooter>
                    {isRetrying ? (
                        <div className="mt-4 flex justify-center">
                            <div className="animate-spin h-6 w-6 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mt-3">
                            Retrying in {countdown} seconds…
                        </p>
                    )}
                </ModalFooter>
            </div>
        </div>
    );
};
















// "use client";
//
// import React from "react";
// import {ModalHeader} from "@/srs/components/common/ModalHeader";
// import {ModalBody} from "@/srs/components/common/ModalBody";
// import {ModalFooter} from "@/srs/components/common/ModalFooter";
// import {Button} from "@/srs/components/common/Button";
//
// interface WarningModalProps {
//     open: boolean;
//     title?: string; 
//     message: string
// }
//
// export const ServerDataWarningModal = ({open, title = "Warning", message}: WarningModalProps) => {
//     if (!open) return null;
//
//     return (
//         <>
//             <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
//                 <div className="bg-white w-sm max-w-sm rounded-lg shadow-lg p-6 text-center">
//                     <ModalHeader>
//                         {title}
//                     </ModalHeader>
//                     <ModalBody>
//                         <p className="text-gray-700">Failed to load</p>
//                         <p className="font-semibold text-red-700"><strong>{message}</strong></p>
//                         <p className="text-gray-700">Please try again.</p>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button
//                             size="sm"
//                             variant="ghost"
//                             className="text-gray-700"
//                             onClick={() => window.location.reload()}
//                         >
//                             Reload
//                         </Button>
//                     </ModalFooter>
//                 </div>
//             </div>
//         </>
//     );
// }
