import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import BaseStore from './BaseStore';
import { CreateRedirectFormType, DeleteRedirectMessageType, RedirectType } from '../types/Redirect';
import { UserPermissions } from '../types/User';
import { TableRedirectType } from '../types';

export class RedirectStore extends BaseStore {
    items: RedirectType[] = [];
    totalRedirects: number = 0;
    loadedRedirects: number = 0;
    tableItems: TableRedirectType[] = [];
    loadingRedirects: boolean = false;
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            items: observable,
            tableItems: observable,
            totalRedirects: observable,
            loadedRedirects: observable,
            loadingRedirects: observable,
            setRedirects: action,
            getRedirects: action,
            createRedirect: action,
            deleteRedirect: action,
            deleteMultipleRedirects: action,
            toggleLoadingMore: action,
        });
    }
    toggleLoadingMore = () => {
        this.loadingRedirects = !this.loadingRedirects;
    };
    setRedirects = (items: RedirectType[], totalRedirects: number) => {
        if (this.loadedRedirects !== 0) {
            this.items = [...this.items, ...items];
            this.loadedRedirects = this.loadedRedirects + items.length;
            this.tableItems = [
                ...this.tableItems,
                ...items.map((item) => {
                    return {
                        id: item.id,
                        url: item.url,
                        alias: item.url,
                        slug: item.slug,
                        collections: item.collections,
                        createdAt: item.createdAt,
                        lastClickedAt: item.clicks.length > 0 ? item.clicks[0].createdAt : null,
                        totalClicks: item.clicks.length,
                    } as TableRedirectType;
                }),
            ];
        } else {
            this.totalRedirects = totalRedirects;
            this.items = items;
            this.loadedRedirects = items.length;
            this.tableItems = items.map((item) => {
                return {
                    id: item.id,
                    url: item.url,
                    alias: item.url,
                    slug: item.slug,
                    collections: item.collections,
                    createdAt: item.createdAt,
                    lastClickedAt: item.clicks.length > 0 ? item.clicks[0].createdAt : null,
                    totalClicks: item.clicks.length,
                } as TableRedirectType;
            });
        }
        this.toggleLoadingMore();
    };
    getRedirects = async (cursor: number = 0, limit: number = 0) => {
        try {
            this.toggleLoadingMore();
            let getRedirects = await this.rootStore.apiStore.readUserRedirects(cursor, limit);
            if (getRedirects.data?.items) {
                runInAction(() => {
                    this.setRedirects((getRedirects.data?.items as RedirectType[]) || ([] as RedirectType[]), getRedirects.data?.total!);
                });
            } else {
                this.toggleLoadingMore();
                this.rootStore.notificationStore.createNotification('success', getRedirects.message!);
            }
        } catch (e) {
            this.toggleLoadingMore();
            this.rootStore.notificationStore.createNotification('error', e.message);
        }
    };
    createRedirect = async (arg: CreateRedirectFormType) => {
        try {
            let createRedirect = await this.rootStore.apiStore.createRedirect(arg);
            if (createRedirect.status === 'success') {
                this.rootStore.notificationStore.createNotification('success', createRedirect.message!);
                if (this.rootStore.userStore.userPermissions === UserPermissions.Guest) {
                    this.rootStore.claimStore.addClaimableRedirect(createRedirect.data!);
                } else {
                    this.getRedirects();
                }
            } else {
                this.rootStore.notificationStore.createNotification('error', createRedirect.message!);
            }
        } catch (e) {
            this.rootStore.notificationStore.createNotification('error', e.message);
        }
    };
    deleteRedirect = async (id: string) => {
        try {
            let deleteRedirect = await this.rootStore.apiStore.deleteRedirect(id);
            this.rootStore.notificationStore.createNotification('success', deleteRedirect.message!);
            this.items = this.items.filter((item) => item.id !== id);
        } catch (e) {
            this.rootStore.notificationStore.createNotification('error', e.message);
        }
    };
    deleteMultipleRedirects = async (ids: string[]): Promise<[deleting: boolean, deleteMessages: DeleteRedirectMessageType[]]> => {
        let deleteMessages: DeleteRedirectMessageType[] = [];
        let deleting: boolean = true;
        ids.forEach(async (id) => {
            try {
                let deleteRedirect = await this.rootStore.apiStore.deleteRedirect(id);
                deleteMessages.push({ id: id, status: 'success', message: deleteRedirect.message! });
                this.rootStore.notificationStore.createNotification('success', deleteRedirect.message!);
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
