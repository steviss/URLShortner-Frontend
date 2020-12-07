import { makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import BaseStore from './BaseStore';
import { RedirectType } from 'types/Redirect';

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
}
