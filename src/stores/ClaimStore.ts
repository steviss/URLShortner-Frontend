import BaseStore from './BaseStore';
import { RootStore } from './RootStore';
import { makeObservable, observable, action, runInAction } from 'mobx';
import { ClaimRedirectType, RedirectType } from 'types/Redirect';
import localforage from 'localforage';
import { localForageConfig } from '@utility/localForage.config';

export interface ClaimType {
    id: string;
    url: string;
    claimKey: string;
    slug: string;
    createdAt: Date;
}

export class ClaimStore extends BaseStore {
    items: ClaimType[] = [];
    storage: LocalForage;
    constructor(rootStore: RootStore) {
        super(rootStore);
        this.storage = localforage.createInstance(localForageConfig);
        makeObservable(this, {
            items: observable,
            storage: observable,
            addClaimableRedirect: action,
            claimRedirect: action,
            getAll: action,
            getStoredItem: action,
            addItemToStore: action,
            addItemsToStore: action,
            addStoredItem: action,
            deleteStoredItem: action,
            deleteItemFromStore: action,
            clearItemStore: action,
        });
    }
    getAll = async () => {
        runInAction(() => {
            this.clearItemStore();
        });
        try {
            let storedItems = await this.storage.keys();
            let claimItems = storedItems.map(async (item) => {
                return this.getStoredItem(item)
                    .then((response) => response as ClaimType)
                    .catch((e) => {
                        console.log('error in get all', e);
                        return {} as ClaimType;
                    });
            });
            runInAction(() => {
                Promise.all(claimItems)
                    .then((items) => this.addItemsToStore(items))
                    .catch((e) => {
                        console.log('error in get all, run action promise', e);
                        return [] as ClaimType[];
                    });
            });
        } catch (e) {
            console.log('get all error', e);
        }
    };
    addItemsToStore = (items: ClaimType[]) => {
        this.items = items;
    };
    addItemToStore = (item: ClaimType) => {
        this.items = [...this.items, item];
    };
    deleteItemFromStore = (id: string) => {
        this.items = this.items.filter((item) => item.id !== id);
    };
    clearItemStore = () => {
        this.items = [] as ClaimType[];
    };
    getStoredItem = async (id: string) => {
        try {
            let storedItem = await this.storage.getItem(id);
            console.log('item', storedItem);
            return storedItem as ClaimType;
        } catch (e) {
            console.log('get all error', e);
        }
    };
    addStoredItem = async (item: ClaimType) => {
        try {
            await this.storage.setItem(item.id, item);
            console.log('before storega', item);
            let storedItem = await this.storage.getItem(item.id);
            console.log('added item', storedItem);
            return storedItem;
        } catch (e) {
            console.log('get all error', e);
        }
    };
    deleteStoredItem = async (id: string) => {
        try {
            await this.storage.removeItem(id);
            console.log('deleted item', id);
        } catch (e) {
            console.log('get all error', e);
        }
    };
    addClaimableRedirect = (item: RedirectType) => {
        let claimObject = Object.assign(item) as ClaimType;
        this.addStoredItem(claimObject);
        this.addItemToStore(claimObject);
    };
    claimRedirect = async (arg: ClaimRedirectType) => {
        try {
            let claimRedirect = await this.rootStore.apiStore.claimRedirect(arg);
            if (claimRedirect.status === 'success') {
                this.rootStore.notificationStore.createNotification('success', claimRedirect.message!);
                this.deleteStoredItem(arg.id);
                this.deleteItemFromStore(arg.id);
            } else {
                this.rootStore.notificationStore.createNotification('error', claimRedirect.message!);
            }
        } catch (e) {
            console.log('claim redirect error', e);
        }
    };
}
