import { makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import BaseStore from './BaseStore';
import { CreateRedirectFormType, RedirectType } from '../types/Redirect';
import { UserPermissions } from '../types/User';

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
            let getRedirects = await this.rootStore.apiStore.readUserRedirects();
            if (getRedirects.data?.items) {
                runInAction(() => {
                    this.items = getRedirects.data?.items || ([] as RedirectType[]);
                });
            } else {
                this.rootStore.notificationStore.createNotification('success', getRedirects.message!);
            }
        } catch (e) {
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
}
