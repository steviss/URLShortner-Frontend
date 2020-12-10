import { CollectionType, CreateCollectionFormType, UpdateCollectionFormType } from '../types/Collection';
import { ClaimRedirectFormType, CreateRedirectFormType, RedirectType, UpdateRedirectFormType } from '../types/Redirect';
import { DeleteResponse, ForgotPasswordResponse, LogoutResponse, PaginatedResponse, ResponseDataType } from '../types/Response';
import { RegisterFormType, LoginFormType, ChangePasswordFormType, LogoutFormType, ForgotPasswordFormType, UserType } from '../types/User';

export interface ApiCalls {
    //Public Calls
    register: (arg: RegisterFormType) => Promise<ResponseDataType<UserType>>;
    login: (arg: LoginFormType) => Promise<ResponseDataType<UserType>>;
    forgotPassword: (arg: ForgotPasswordFormType) => Promise<ResponseDataType<ForgotPasswordResponse>>;
    changePassword: (arg: ChangePasswordFormType) => Promise<ResponseDataType<UserType>>;
    //User Calls
    logout: (arg: LogoutFormType) => Promise<ResponseDataType<LogoutResponse>>;
    me: () => Promise<ResponseDataType<UserType>>;
    //Redirect Api Calls
    createRedirect: (arg: CreateRedirectFormType) => Promise<ResponseDataType<RedirectType>>;
    claimRedirect: (arg: ClaimRedirectFormType) => Promise<ResponseDataType<RedirectType>>;
    readRedirect: (id: string) => Promise<ResponseDataType<RedirectType>>;
    readUserRedirects: () => Promise<ResponseDataType<PaginatedResponse<RedirectType[]>>>;
    updateRedirect: (arg: UpdateRedirectFormType) => Promise<ResponseDataType<RedirectType>>;
    deleteRedirect: (id: string) => Promise<ResponseDataType<DeleteResponse>>;
    //Collection Api Calls
    createCollection: (arg: CreateCollectionFormType) => Promise<ResponseDataType<CollectionType>>;
    readCollection: (id: string) => Promise<ResponseDataType<CollectionType>>;
    updateCollection: (arg: UpdateCollectionFormType) => Promise<ResponseDataType<CollectionType>>;
    deleteCollection: (id: string) => Promise<ResponseDataType<DeleteResponse>>;
}
