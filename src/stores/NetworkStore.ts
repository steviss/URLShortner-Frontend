import BaseStore from './BaseStore';
import { RootStore } from './RootStore';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '@utility/config';
import { CreateCollectionFormType, UpdateCollectionFormType } from '../types/Collection';
import { CreateRedirectFormType, UpdateRedirectFormType } from '../types/Redirect';
import { ResponseDataType } from '../types/Response';
import { RegisterFormType, ChangePasswordFormType, LogoutFormType, UserChangePasswordFormType, LoginFormType } from '../types/User';
import { ApiCalls } from './ApiCalls';

export class NetworkStore extends BaseStore implements ApiCalls {
    activeCalls: string[] = [];
    api: AxiosInstance;
    constructor(rootStore: RootStore) {
        super(rootStore);
        this.api = axios.create({
            baseURL: `${config.__API__}`,
            timeout: 1000,
        });
    }
    response = <T>(data: AxiosResponse<unknown>) => {
        console.log(data);
        const result = data.data;
        return result as T;
    };
    //Public Calls
    register = (arg: RegisterFormType) => this.api.post('api/public/register', arg).then((response) => this.response<ResponseDataType>(response));
    login = (arg: LoginFormType) => this.api.post('api/public/login', arg).then((response) => this.response<ResponseDataType>(response));
    changePassword = (arg: ChangePasswordFormType) => this.api.post('api/public/changePassword', arg).then((response) => this.response<ResponseDataType>(response));
    //User Calls
    logout = (arg: LogoutFormType) => this.api.post('api/user/logout', arg).then((response) => this.response<ResponseDataType>(response));
    userChangePassword = (arg: UserChangePasswordFormType) => this.api.post('api/user/changePassword', arg).then((response) => this.response<ResponseDataType>(response));
    me = () => this.api.post('api/user/me').then((response) => this.response<ResponseDataType>(response));
    //Redirect Api Calls
    createRedirect = (arg: CreateRedirectFormType) => this.api.post('api/redirect/create', arg).then((response) => this.response<ResponseDataType>(response));
    readRedirect = (id: string) => this.api.get(`api/redirect/read?id=${id}`).then((response) => this.response<ResponseDataType>(response));
    updateRedirect = (arg: UpdateRedirectFormType) => this.api.put('api/redirect/update', arg).then((response) => this.response<ResponseDataType>(response));
    deleteRedirect = (id: string) => this.api.delete(`api/redirect/delete?id=${id}`).then((response) => this.response<ResponseDataType>(response));
    //Collection Api Calls
    createCollection = (arg: CreateCollectionFormType) => this.api.post('api/collection/create', arg).then((response) => this.response<ResponseDataType>(response));
    readCollection = (id: string) => this.api.get(`api/collection/read?id=${id}`).then((response) => this.response<ResponseDataType>(response));
    updateCollection = (arg: UpdateCollectionFormType) => this.api.put('api/collection/update', arg).then((response) => this.response<ResponseDataType>(response));
    deleteCollection = (id: string) => this.api.delete(`api/collection/delete?id=${id}`).then((response) => this.response<ResponseDataType>(response));
}
