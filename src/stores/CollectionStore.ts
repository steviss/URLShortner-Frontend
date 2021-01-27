import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import BaseStore from './BaseStore';
import { CreateCollectionFormType, DeleteCollectionMessageType, CollectionType } from '../types/Collection';
import { TableCollectionType } from '../types';

export class CollectionStore extends BaseStore {
    items: CollectionType[] = [];
    totalCollections: number = 0;
    loadedCollections: number = 0;
    tableItems: TableCollectionType[] = [];
    loadingCollections: boolean = false;
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            items: observable,
            tableItems: observable,
            totalCollections: observable,
            loadedCollections: observable,
            loadingCollections: observable,
            setCollections: action,
            getCollections: action,
            createCollection: action,
            deleteCollection: action,
            deleteMultipleCollections: action,
            toggleLoadingMore: action,
        });
    }
    toggleLoadingMore = () => {
        this.loadingCollections = !this.loadingCollections;
    };
    setCollections = (items: CollectionType[], totalRedirects: number) => {
        if (this.loadedCollections !== 0) {
            let itemIds = new Set(this.items.map((item) => item.id)),
                tableItemIds = new Set(this.tableItems.map((item) => item.id));
            this.loadedCollections = this.loadedCollections + items.length;
            this.items = [...this.items, ...items.filter((item) => !itemIds.has(item.id))];
            this.tableItems = [
                ...this.tableItems,
                ...items
                    .filter((item) => !tableItemIds.has(item.id))
                    .map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            createdAt: item.createdAt,
                            totalClicks: item.clicks,
                            totalRedirects: item.redirects.length || 0,
                        } as TableCollectionType;
                    }),
            ];
        } else {
            this.totalCollections = totalRedirects;
            this.items = items;
            this.loadedCollections = items.length;
            this.tableItems = items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    createdAt: item.createdAt,
                    totalClicks: item.clicks,
                    totalRedirects: item.redirects.length || 0,
                } as TableCollectionType;
            });
        }
        this.toggleLoadingMore();
    };
    getCollections = async (cursor: number = 0, limit: number = 0) => {
        try {
            this.toggleLoadingMore();
            let getCollections = await this.rootStore.apiStore.readUserCollections(cursor, limit);
            if (getCollections.data?.items) {
                runInAction(() => {
                    this.setCollections((getCollections.data?.items as CollectionType[]) || ([] as CollectionType[]), getCollections.data?.total!);
                });
            } else {
                this.toggleLoadingMore();
                this.rootStore.notificationStore.createNotification('success', getCollections.message!);
            }
        } catch (e) {
            this.toggleLoadingMore();
            this.rootStore.notificationStore.createNotification('error', e.message);
        }
    };
    createCollection = async (arg: CreateCollectionFormType) => {
        try {
            let createCollection = await this.rootStore.apiStore.createCollection(arg);
            if (createCollection.status === 'success') {
                this.rootStore.notificationStore.createNotification('success', createCollection.message!);
                this.getCollections();
            } else {
                this.rootStore.notificationStore.createNotification('error', createCollection.message!);
            }
        } catch (e) {
            this.rootStore.notificationStore.createNotification('error', e.message);
        }
    };
    deleteCollection = async (id: string) => {
        try {
            let deleteCollection = await this.rootStore.apiStore.deleteCollection(id);
            this.rootStore.notificationStore.createNotification('success', deleteCollection.message!);
            this.items = this.items.filter((item) => item.id !== id);
        } catch (e) {
            this.rootStore.notificationStore.createNotification('error', e.message);
        }
    };
    deleteMultipleCollections = async (ids: string[]): Promise<[deleting: boolean, deleteMessages: DeleteCollectionMessageType[]]> => {
        let deleteMessages: DeleteCollectionMessageType[] = [];
        let deleting: boolean = true;
        ids.forEach(async (id) => {
            try {
                let deleteCollection = await this.rootStore.apiStore.deleteCollection(id);
                deleteMessages.push({ id: id, status: 'success', message: deleteCollection.message! });
                this.rootStore.notificationStore.createNotification('success', deleteCollection.message!);
                this.items = this.items.filter((item) => item.id !== id);
            } catch (e) {
                deleteMessages.push({ id: id, status: 'error', message: e.message });
                this.rootStore.notificationStore.createNotification('error', e.message);
            }
        });
        deleting = false;
        return [deleting, deleteMessages];
    };
}
