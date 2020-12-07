import { config } from '@utility/config';
import { ApiCalls } from './ApiCalls';
import { LayoutStore } from './LayoutStore';
import { MockStore } from './MockStore';
import { NetworkStore } from './NetworkStore';
import { NotificationStore } from './NotificationStore';
import { RedirectStore } from './RedirectStore';
import { UserStore } from './UserStore';

export class RootStore {
    layoutStore: LayoutStore;
    apiStore: ApiCalls;
    userStore: UserStore;
    redirectStore: RedirectStore;
    notificationStore: NotificationStore;
    constructor() {
        this.layoutStore = new LayoutStore(this);
        this.userStore = new UserStore(this);
        this.redirectStore = new RedirectStore(this);
        this.notificationStore = new NotificationStore(this);
        if (config.__PROD__) {
            this.apiStore = new NetworkStore(this);
        } else {
            this.apiStore = new MockStore(this);
        }
    }
}

export const rootStore = new RootStore();
