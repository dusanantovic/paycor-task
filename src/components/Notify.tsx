import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Id, ToastContainer, toast } from "react-toastify";

interface NotifyProps {
    message: string;
    isError: boolean;
    loading: boolean;
}

export const Notify = ({ message, loading, isError }: NotifyProps) => {
    const [toastId, setToastId] = useState<Id | null>(null);

    React.useEffect(() => {
        if (!loading && toastId) {
            toast.done(toastId);
            setToastId(null);
        }
        if (message) {
            if (loading && !toastId) {
                setToastId(toast.loading(message));
            } else {
                toast(message, {
                    type: isError ? "error" : "success"
                });
            }
        }
    }, [message, loading, isError]);

    return (
        <ToastContainer
            autoClose={2000}
            position="top-right"
        />
    );
};