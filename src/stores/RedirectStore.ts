import { makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import BaseStore from './BaseStore';
import { CreateRedirectFormType, RedirectType } from 'types/Redirect';
import { ResponseDataType } from '../types/Response';

export class RedirectStore extends BaseStore {
    items: RedirectType[] = [];
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            items: observable,
        });
    }
    getRedirects = async () => {
        try {
            let loadItems = await this.rootStore.apiStore.readUserRedirects();
            runInAction(() => {
                this.items = loadItems;
            });
        } catch (e) {
            console.log(e);
        }
    };
    createRedirect = async (arg: CreateRedirectFormType) => {
        try {
            let createRedirect = (await this.rootStore.apiStore.createRedirect(arg)) as ResponseDataType;
            console.log(createRedirect);
            this.rootStore.notificationStore.createNotification('success', createRedirect.message!);
            this.items = [...this.items, createRedirect.data as RedirectType];
        } catch (e) {
            this.rootStore.notificationStore.createNotification('error', e.message);
        }
    };
    deleteRedirect = async (id: string) => {
        try {
            let deleteRedirect = (await this.rootStore.apiStore.deleteRedirect(id)) as ResponseDataType;
            console.log(deleteRedirect);
            this.rootStore.notificationStore.createNotification('success', deleteRedirect.message!);
            this.items = this.items.filter((item) => item.id !== id);
        } catch (e) {
            this.rootStore.notificationStore.createNotification('error', e.message);
        }
    };
}
