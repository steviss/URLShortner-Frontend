import BaseStore from './BaseStore';
import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export class NotificationStore extends BaseStore {
    open: boolean = false;
    type: NotificationType = 'info';
    duration: number = 3000;
    message: string = '';
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            duration: observable,
            type: observable,
            message: observable,
            open: observable,
            closeNotification: action,
            createNotification: action,
        });
    }
    closeNotification = () => {
        this.open = false;
    };
    createNotification = (type: NotificationType, message: string) => {
        this.type = type;
        this.message = message;
        this.open = true;
    };
}
