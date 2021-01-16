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
    forgotPassword = (arg: ForgotPasswordFormType) => this.api.post('auth/forgotPassword', arg).then((response) => this.response<ForgotPasswordResponse>(response));
    changePassword = (arg: ChangePasswordFormType) => this.api.patch('auth/changePassword', arg).then((response) => this.response<UserType>(response));
    logout = (arg: LogoutFormType) => this.api.post('auth/logout', arg).then((response) => this.response<LogoutResponse>(response));
    me = () =>
        this.api
            .get('auth/me')
            .then((response) => this.response<UserType>(response))
            .catch((e) => {
                return e;
            });
    //Redirect Api Calls
    claimRedirect = (arg: ClaimRedirectFormType) => this.api.patch('redirect/claim', arg).then((response) => this.response<RedirectType>(response));
    createRedirect = (arg: CreateRedirectFormType) => this.api.post('redirect/create', arg).then((response) => this.response<RedirectType>(response));
    readRedirect = (id: string) =>
        this.api
            .get(`redirect/read`, {
                params: {
                    id: id,
                },
            })
            .then((response) => this.response<RedirectType>(response));
    updateRedirect = (arg: UpdateRedirectFormType) => this.api.put('redirect/update', arg).then((response) => this.response<RedirectType>(response));
    deleteRedirect = (id: string) =>
        this.api
            .delete(`redirect/delete`, {
                params: {
                    id: id,
                },
            })
            .then((response) => this.response<DeleteResponse>(response));
    //Collection Api Calls
    createCollection = (arg: CreateCollectionFormType) => this.api.post('collection/create', arg).then((response) => this.response<CollectionType>(response));
    readCollection = (id: string) =>
        this.api
            .get(`collection/read`, {
                params: {
                    id: id,
                },
            })
            .then((response) => this.response<CollectionType>(response));
    updateCollection = (arg: UpdateCollectionFormType) => this.api.put('collection/update', arg).then((response) => this.response<CollectionType>(response));
    deleteCollection = (id: string) =>
        this.api
            .delete(`collection/delete`, {
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
