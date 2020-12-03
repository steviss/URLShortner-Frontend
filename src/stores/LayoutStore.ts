import { action, makeObservable, observable } from 'mobx';
import { RootStore } from './RootStore';
import BaseStore from './BaseStore';

export class LayoutStore extends BaseStore {
    userDrawerState: boolean = false;
    menuDrawerState: boolean = false;
    pageWrapperClass: string = '';
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            pageWrapperClass: observable,
            menuDrawerState: observable,
            userDrawerState: observable,
            toggleMenuDrawerState: action,
            toggleUserDrawerState: action,
            setPageWrapperClass: action,
            clearPageWrapperClass: action,
        });
    }
    toggleMenuDrawerState = () => {
        this.menuDrawerState = !this.menuDrawerState;
    };
    toggleUserDrawerState = () => {
        this.userDrawerState = !this.userDrawerState;
    };
    setPageWrapperClass = (className: string) => {
        this.pageWrapperClass = className;
    };
    clearPageWrapperClass = () => {
        this.pageWrapperClass = '';
    };
}
