import BaseStore from './BaseStore';
import { RootStore } from './RootStore';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
    ApiCalls,
    RegisterForm,
    ResponseDataType,
    LoginForm,
    UpdateCollectionForm,
    ChangePasswordForm,
    LogoutForm,
    CreateRedirectForm,
    UserChangePasswordForm,
    UpdateRedirectForm,
    CreateCollectionForm,
} from './ApiCalls';
import { config } from '@utility/config';

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
    register = (arg: RegisterForm) => this.api.post('api/public/register', arg).then((response) => this.response<ResponseDataType>(response));
    login = (arg: LoginForm) => this.api.post('api/public/login', arg).then((response) => this.response<ResponseDataType>(response));
    changePassword = (arg: ChangePasswordForm) => this.api.post('api/public/changePassword', arg).then((response) => this.response<ResponseDataType>(response));
    //User Calls
    logout = (arg: LogoutForm) => this.api.post('api/user/logout', arg).then((response) => this.response<ResponseDataType>(response));
    userChangePassword = (arg: UserChangePasswordForm) => this.api.post('api/user/changePassword', arg).then((response) => this.response<ResponseDataType>(response));
    me = () => this.api.post('api/user/me').then((response) => this.response<ResponseDataType>(response));
    //Redirect Api Calls
    createRedirect = (arg: CreateRedirectForm) => this.api.post('api/redirect/create', arg).then((response) => this.response<ResponseDataType>(response));
    readRedirect = (id: string) => this.api.get(`api/redirect/read?id=${id}`).then((response) => this.response<ResponseDataType>(response));
    updateRedirect = (arg: UpdateRedirectForm) => this.api.put('api/redirect/update', arg).then((response) => this.response<ResponseDataType>(response));
    deleteRedirect = (id: string) => this.api.delete(`api/redirect/delete?id=${id}`).then((response) => this.response<ResponseDataType>(response));
    //Collection Api Calls
    createCollection = (arg: CreateCollectionForm) => this.api.post('api/collection/create', arg).then((response) => this.response<ResponseDataType>(response));
    readCollection = (id: string) => this.api.get(`api/collection/read?id=${id}`).then((response) => this.response<ResponseDataType>(response));
    updateCollection = (arg: UpdateCollectionForm) => this.api.put('api/collection/update', arg).then((response) => this.response<ResponseDataType>(response));
    deleteCollection = (id: string) => this.api.delete(`api/collection/delete?id=${id}`).then((response) => this.response<ResponseDataType>(response));
}
