import { config } from '@utility/config';
import { ApiCalls } from './ApiCalls';
import { LayoutStore } from './LayoutStore';
import { MockStore } from './MockStore';
import { NetworkStore } from './NetworkStore';

export class RootStore {
    layoutStore: LayoutStore;
    apiStore: ApiCalls;
    constructor() {
        this.layoutStore = new LayoutStore(this);
        if (config.__PROD__) {
            this.apiStore = new NetworkStore(this);
        } else {
            this.apiStore = new MockStore(this);
        }
    }
}

export const rootStore = new RootStore();
