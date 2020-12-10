import BaseStore from './BaseStore';
import { RootStore } from './RootStore';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '@utility/config';
import { CollectionType, CreateCollectionFormType, UpdateCollectionFormType } from '../types/Collection';
import { ClaimRedirectFormType, CreateRedirectFormType, RedirectType, UpdateRedirectFormType } from '../types/Redirect';
import { DeleteResponse, ForgotPasswordResponse, LogoutResponse, PaginatedResponse, ResponseDataType } from '../types/Response';
import { RegisterFormType, ChangePasswordFormType, LogoutFormType, LoginFormType, ForgotPasswordFormType, UserType } from '../types/User';
import { ApiCalls } from './ApiCalls';

export class NetworkStore extends BaseStore implements ApiCalls {
    api: AxiosInstance;
    constructor(rootStore: RootStore) {
        super(rootStore);
        this.api = axios.create({
            withCredentials: true,
            baseURL: `${config.__API__}`,
            responseType: 'json',
        });
    }
    response = <T>(data: AxiosResponse<unknown>) => {
        const responseData = data.data as ResponseDataType<T>;
        return responseData;
    };
    //Public Calls
    register = (arg: RegisterFormType) => this.api.post('api/public/register', arg).then((response) => this.response<UserType>(response));
    login = (arg: LoginFormType) => this.api.post('api/public/login', arg).then((response) => this.response<UserType>(response));
    forgotPassword = (arg: ForgotPasswordFormType) => this.api.post('api/public/forgotPassword', arg).then((response) => this.response<ForgotPasswordResponse>(response));
    changePassword = (arg: ChangePasswordFormType) => this.api.post('api/public/changePassword', arg).then((response) => this.response<UserType>(response));
    //User Calls
    logout = (arg: LogoutFormType) => this.api.post('api/user/logout', arg).then((response) => this.response<LogoutResponse>(response));
    me = () =>
        this.api
            .get('api/user/me')
            .then((response) => this.response<UserType>(response))
            .catch((e) => {
                return e;
            });
    //Redirect Api Calls
    claimRedirect = (arg: ClaimRedirectFormType) => this.api.put('api/redirect/claim', arg).then((response) => this.response<RedirectType>(response));
    createRedirect = (arg: CreateRedirectFormType) => this.api.post('api/redirect/create', arg).then((response) => this.response<RedirectType>(response));
    readRedirect = (id: string) => this.api.get(`api/redirect/read?id=${id}`).then((response) => this.response<RedirectType>(response));
    readUserRedirects = () => this.api.get('api/redirect/readUserRedirects').then((response) => this.response<PaginatedResponse<RedirectType[]>>(response));
    updateRedirect = (arg: UpdateRedirectFormType) => this.api.put('api/redirect/update', arg).then((response) => this.response<RedirectType>(response));
    deleteRedirect = (id: string) => this.api.delete(`api/redirect/delete?id=${id}`).then((response) => this.response<DeleteResponse>(response));
    //Collection Api Calls
    createCollection = (arg: CreateCollectionFormType) => this.api.post('api/collection/create', arg).then((response) => this.response<CollectionType>(response));
    readCollection = (id: string) => this.api.get(`api/collection/read?id=${id}`).then((response) => this.response<CollectionType>(response));
    updateCollection = (arg: UpdateCollectionFormType) => this.api.put('api/collection/update', arg).then((response) => this.response<CollectionType>(response));
    deleteCollection = (id: string) => this.api.delete(`api/collection/delete?id=${id}`).then((response) => this.response<DeleteResponse>(response));
}
