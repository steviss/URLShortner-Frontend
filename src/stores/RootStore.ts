import { LayoutStore } from './LayoutStore';

export class RootStore {
    layoutStore: LayoutStore;
    constructor() {
        this.layoutStore = new LayoutStore(this);
    }
}

export const rootStore = new RootStore();
