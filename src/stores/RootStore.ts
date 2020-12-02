import { config } from '@utility/config';
import { ApiCalls } from './ApiCalls';
import { LayoutStore } from './LayoutStore';
import { MockStore } from './MockStore';
import { NetworkStore } from './NetworkStore';
import { UserStore } from './UserStore';

export class RootStore {
    layoutStore: LayoutStore;
    apiStore: ApiCalls;
    userStore: UserStore;
    constructor() {
        this.layoutStore = new LayoutStore(this);
        this.userStore = new UserStore(this);
        if (config.__PROD__) {
            this.apiStore = new NetworkStore(this);
        } else {
            this.apiStore = new MockStore(this);
        }
    }
}

export const rootStore = new RootStore();
