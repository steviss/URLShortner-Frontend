import { useState, useCallback } from 'react';
import localforage from 'localforage';
import { localForageConfig } from './localForage.config';
import { ClaimType } from 'stores/ClaimStore';
import { NotificationType } from 'stores/NotificationStore';

interface ForageStatus {
    status: NotificationType;
    message: string;
}

interface LocalForageHook {
    loading: boolean;
    message: ForageStatus | null;
    getAll: () => Promise<string[]>;
    setItem: (item: ClaimType) => Promise<ClaimType>;
    deleteItem: (id: string) => Promise<boolean>;
}

export const useLocalForage = (): LocalForageHook => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<ForageStatus | null>(null);
    const claimStore = localforage.createInstance(localForageConfig);
    const getAll = async () => {
        console.log('get all');
        setLoading(true);
        return claimStore
            .keys()
            .then((value) => {
                console.log('all keys', value);
                setMessage({ status: 'success', message: 'Succesfully retrieved keys.' });
                setLoading(false);
                return value;
            })
            .catch((err) => {
                setLoading(false);
                setMessage({ status: 'error', message: err });
                return [];
            });
    };
    const setItem = useCallback(
        async (item: ClaimType) => {
            setLoading(true);
            return claimStore
                .setItem(item.id, item)
                .then(async (value) => {
                    console.log('set item', value);
                    setLoading(false);
                    setMessage({ status: 'success', message: 'Succesfully retrieved item..' });
                    return (await claimStore.getItem(value.id)) as ClaimType;
                })
                .catch((err) => {
                    setLoading(false);
                    setMessage({ status: 'error', message: err });
                    return {} as ClaimType;
                });
        },
        [claimStore],
    );
    const deleteItem = useCallback(
        async (id: string) => {
            setLoading(true);
            return claimStore
                .removeItem(id)
                .then(() => {
                    console.log('delete item id:', id);
                    setLoading(false);
                    setMessage({ status: 'success', message: 'Succesfully deleted an item.' });
                    return true;
                })
                .catch((err) => {
                    setLoading(false);
                    setMessage({ status: 'error', message: err });
                    return false;
                });
        },
        [claimStore],
    );
    return { loading, message, getAll, setItem, deleteItem };
};
