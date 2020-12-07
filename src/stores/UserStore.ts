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
    userPermissions: UserPermissions = 0;
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
            throw e;
        }
    };
    setUser = (user: UserType) => {
        this.user = user;
    };
    setLoggedIn = (status: UserPermissions) => {
        this.userPermissions = status;
    };
    setCookieConsent = (status: boolean) => {
        this.cookieConsent = status;
    };
}
