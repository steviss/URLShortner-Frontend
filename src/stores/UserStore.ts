import BaseStore from './BaseStore';
import { RootStore } from './RootStore';
import { makeObservable, observable, runInAction, action } from 'mobx';

interface UserType {
    id: string;
    email: string;
}

export class UserStore extends BaseStore {
    user: UserType = {} as UserType;
    userLoggedIn: boolean = false;
    cookieConsent: boolean = false;
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            user: observable,
            userLoggedIn: observable,
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
                    this.setLoggedIn(true);
                });
            } else {
                runInAction(() => {
                    this.setUser({} as UserType);
                    this.setLoggedIn(false);
                });
            }
        } catch (e) {
            throw e;
        }
    };
    setUser = (user: UserType) => {
        this.user = user;
    };
    setLoggedIn = (status: boolean) => {
        this.userLoggedIn = status;
    };
    setCookieConsent = (status: boolean) => {
        this.cookieConsent = status;
    };
}
