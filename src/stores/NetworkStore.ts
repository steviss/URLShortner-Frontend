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
    //Authentication
    register = (arg: RegisterFormType) => this.api.post('auth/register', arg).then((response) => this.response<UserType>(response));
    login = (arg: LoginFormType) => this.api.post('auth/login', arg).then((response) => this.response<UserType>(response));
    forgotPassword = (arg: ForgotPasswordFormType) => this.api.post('auth/forgot-password', arg).then((response) => this.response<ForgotPasswordResponse>(response));
    changePassword = (arg: ChangePasswordFormType) => this.api.patch('auth/change-password', arg).then((response) => this.response<UserType>(response));
    logout = (arg: LogoutFormType) => this.api.post('auth/logout', arg).then((response) => this.response<LogoutResponse>(response));
    me = () =>
        this.api
            .get('auth/me')
            .then((response) => this.response<UserType>(response))
            .catch((e) => {
                return e;
            });
    //Redirect Api Calls
    claimRedirect = (arg: ClaimRedirectFormType) => this.api.patch('redirects/claim', arg).then((response) => this.response<RedirectType>(response));
    createRedirect = (arg: CreateRedirectFormType) => this.api.post('redirects', arg).then((response) => this.response<RedirectType>(response));
    readRedirect = (id: string) =>
        this.api
            .get(`redirects`, {
                params: {
                    id: id,
                },
            })
            .then((response) => this.response<RedirectType>(response));
    updateRedirect = (arg: UpdateRedirectFormType) => this.api.put('redirects', arg).then((response) => this.response<RedirectType>(response));
    deleteRedirect = (id: string) =>
        this.api
            .delete(`redirects`, {
                params: {
                    id: id,
                },
            })
            .then((response) => this.response<DeleteResponse>(response));
    //Collection Api Calls
    createCollection = (arg: CreateCollectionFormType) => this.api.post('collections', arg).then((response) => this.response<CollectionType>(response));
    readCollection = (id: string) =>
        this.api
            .get(`collections`, {
                params: {
                    id: id,
                },
            })
            .then((response) => this.response<CollectionType>(response));
    updateCollection = (arg: UpdateCollectionFormType) => this.api.put('collections', arg).then((response) => this.response<CollectionType>(response));
    deleteCollection = (id: string) =>
        this.api
            .delete(`collections`, {
                params: {
                    id: id,
                },
            })
            .then((response) => this.response<DeleteResponse>(response));
    //User Api Calls
    readUserRedirects = (cursor: number, limit: number) =>
        this.api
            .get(`user/redirects`, {
                params: {
                    cursor: cursor > 0 ? cursor : null,
                    limit: limit > 0 ? limit : null,
                },
            })
            .then((response) => this.response<PaginatedResponse<RedirectType[]>>(response));
    readUserCollections = (cursor: number, limit: number) =>
        this.api
            .get(`user/collections`, {
                params: {
                    cursor: cursor > 0 ? cursor : null,
                    limit: limit > 0 ? limit : null,
                },
            })
            .then((response) => this.response<PaginatedResponse<CollectionType[]>>(response));
}
