import { useState, useEffect, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import { NotificationType } from 'stores/NotificationStore';

interface CopyStatus {
    status: NotificationType;
    message: string;
}

export const useCopyToClipboard = (resetInterval: number | null = null): [isCopied: boolean, handleCopy: (text: string | number) => void, message: CopyStatus | null] => {
    const [isCopied, setCopied] = useState<boolean>(false);
    const [message, setMessage] = useState<CopyStatus | null>(null);
    const handleCopy = useCallback((text) => {
        if (typeof text === 'string' || typeof text == 'number') {
            copy(text.toString());
            setCopied(true);
            setMessage({ status: 'success', message: 'Copied to clipboard.' });
        } else {
            setCopied(false);
            setMessage({ status: 'error', message: 'Copying to clipboard failed.' });
        }
    }, []);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (isCopied && resetInterval) {
            timeout = setTimeout(() => setCopied(false), resetInterval);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [isCopied, resetInterval]);

    return [isCopied, handleCopy, message];
};
