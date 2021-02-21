import BaseStore from './BaseStore';
import { RootStore } from './RootStore';
import { makeObservable, observable, runInAction, action } from 'mobx';
import { UserPermissions } from '../types/User';

interface UserType {
    id: string;
    email: string;
}

export class UserStore extends BaseStore {
    user: UserType = {} as UserType;
    userPermissions: UserPermissions = 1;
    cookieConsent: boolean = false;
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            user: observable,
            userPermissions: observable,
            cookieConsent: observable,
            checkAuth: action,
            setUser: action,
            setLoggedIn: action,
            setCookieConsent: action,
        });
    }
    checkAuth = async () => {
        try {
            const me = await this.rootStore.apiStore.me();
            console.log('me response', me);
            if (me.status === 'success') {
                runInAction(() => {
                    this.setUser(me.data as UserType);
                    this.setLoggedIn(UserPermissions.User);
                });
            } else {
                runInAction(() => {
                    this.setUser({} as UserType);
                    this.setLoggedIn(UserPermissions.Guest);
                });
            }
        } catch (e) {
            this.rootStore.notificationStore.createNotification('error', e);
        }
    };
    setUser = (user: UserType) => {
        this.user = user;
        this.setLoggedIn(UserPermissions.User);
    };
    logoutUser = async () => {
        try {
            await this.rootStore.apiStore.logout({ logout: true });
            this.user = {} as UserType;
            this.setLoggedIn(UserPermissions.User);
        } catch (e) {
            this.rootStore.notificationStore.createNotification('error', e);
        }
    };
    setLoggedIn = (status: UserPermissions) => {
        this.userPermissions = status;
    };
    setCookieConsent = (status: boolean) => {
        this.cookieConsent = status;
    };
}
