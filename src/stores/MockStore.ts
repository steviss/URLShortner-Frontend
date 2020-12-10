import { DeleteResponse, ForgotPasswordResponse, LogoutResponse, PaginatedResponse, ResponseDataType } from '../types/Response';
import { UserType, UserPermissions } from '../types/User';
import { ApiCalls } from './ApiCalls';
import BaseStore from './BaseStore';
import userRedirects from '../mockData/redirects.json';
import { ClaimRedirectFormType, CreateRedirectFormType, RedirectType, UpdateRedirectFormType } from '../types/Redirect';
import { ClickType } from '../types/Click';
import { v4 } from 'uuid';
import { CollectionType } from 'types/Collection';

export class MockStore extends BaseStore implements ApiCalls {
    mockUser: UserType = { id: '2e8e9194-ae43-41c4-b05b-bace482ae8da', email: 'test@test.com' };
    mockRedirects: RedirectType[] = (userRedirects as any[]).map((redirect) => {
        let temp = Object.assign({}, redirect);
        temp.createdAt = new Date(parseInt(redirect.createdAt, 10)).toLocaleString();
        temp.clicks = temp.clicks.map((click: any) => {
            let temp = Object.assign({}, click);
            temp.createdAt = new Date(parseInt(click.createdAt, 10)).toLocaleString();
            return temp as ClickType;
        });
        return temp as RedirectType;
    });
    register = () => {
        return Promise.resolve<ResponseDataType<UserType>>({ status: 'success', message: 'Succesfully created an account!', data: this.mockUser });
    };
    login = () => {
        return Promise.resolve<ResponseDataType<UserType>>({ status: 'success', message: 'Succesfully logged in account!', data: this.mockUser });
    };
    forgotPassword = () => {
        return Promise.resolve<ResponseDataType<ForgotPasswordResponse>>({ status: 'success', message: 'Succesfully sent an forgot password!' });
    };
    changePassword = () => {
        return Promise.resolve<ResponseDataType<UserType>>({ status: 'success', message: 'Succesfully created an account!' });
    };
    //User Calls
    logout = () => {
        this.rootStore.userStore.setLoggedIn(UserPermissions.Guest);
        return Promise.resolve<ResponseDataType<LogoutResponse>>({ status: 'success', message: 'Succesfully logged out!', data: { loggedOut: true } });
    };
    me = () => {
        if (this.rootStore.userStore.userPermissions > UserPermissions.Guest) {
            return Promise.resolve<ResponseDataType<UserType>>({ status: 'success', message: 'User authed!', data: this.mockUser });
        } else {
            return Promise.resolve<ResponseDataType<UserType>>({ status: 'error', message: 'User not authed!', data: {} as UserType });
        }
    };
    //Redirect Api Calls
    claimRedirect = (arg: ClaimRedirectFormType) => {
        return Promise.resolve<ResponseDataType<RedirectType>>({
            status: 'success',
            message: 'Succesfully claimed a Redirect!',
            data: { id: arg.id, slug: '', url: '', clicks: [] as ClickType[], ownerId: this.mockUser.id, createdAt: new Date() },
        });
    };
    createRedirect = (arg: CreateRedirectFormType) => {
        return Promise.resolve<ResponseDataType<RedirectType>>({
            status: 'success',
            message: 'Succesfully created a Redirect!',
            data: { id: v4(), slug: arg.slug, url: arg.url, clicks: [] as ClickType[], ownerId: this.mockUser.id, createdAt: new Date() },
        });
    };
    readRedirect = () => {
        return Promise.resolve<ResponseDataType<RedirectType>>({ status: 'success', message: 'Succesfully read a Redirect!' });
    };
    readUserRedirects = () => {
        this.rootStore.notificationStore.createNotification('success', 'Succesfully retrieved all user redirects.');
        return Promise.resolve<ResponseDataType<PaginatedResponse<RedirectType[]>>>({
            status: 'success',
            message: 'Succesfully retrieved all user redirects.',
            data: { items: this.mockRedirects, hasMore: false, total: this.mockRedirects.length },
        });
    };
    updateRedirect = (arg: UpdateRedirectFormType) => {
        return Promise.resolve<ResponseDataType<RedirectType>>({
            status: 'success',
            message: 'Succesfully updated a Redirect!',
            data: { id: arg.id, slug: arg.slug, url: '', clicks: [] as ClickType[], ownerId: this.mockUser.id, createdAt: new Date() },
        });
    };
    deleteRedirect = () => {
        this.rootStore.notificationStore.createNotification('success', 'Succesfully deleted a redirect.');
        return Promise.resolve<ResponseDataType<DeleteResponse>>({ status: 'success', message: 'Succesfully deleted a Redirect!', data: { deleted: true } });
    };
    //Collection Api Calls
    createCollection = () => {
        return Promise.resolve<ResponseDataType<CollectionType>>({ status: 'success', message: 'Succesfully created a Collection!' });
    };
    readCollection = () => {
        return Promise.resolve<ResponseDataType<CollectionType>>({ status: 'success', message: 'Succesfully read a Collection!' });
    };
    updateCollection = () => {
        return Promise.resolve<ResponseDataType<CollectionType>>({ status: 'success', message: 'Succesfully updated a Collection!' });
    };
    deleteCollection = () => {
        return Promise.resolve<ResponseDataType<DeleteResponse>>({ status: 'success', message: 'Succesfully deleted a Collection!' });
    };
}
