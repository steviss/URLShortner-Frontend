import { CreateCollectionFormType, UpdateCollectionFormType } from '../types/Collection';
import { CreateRedirectFormType, RedirectType, UpdateRedirectFormType } from '../types/Redirect';
import { ResponseDataType } from '../types/Response';
import { RegisterFormType, LoginFormType, ChangePasswordFormType, LogoutFormType, UserChangePasswordFormType, ForgotPasswordFormType } from '../types/User';

export interface ApiCalls {
    //Public Calls
    register: (arg: RegisterFormType) => Promise<ResponseDataType>;
    login: (arg: LoginFormType) => Promise<ResponseDataType>;
    forgotPassword: (arg: ForgotPasswordFormType) => Promise<ResponseDataType>;
    changePassword: (arg: ChangePasswordFormType) => Promise<ResponseDataType>;
    readUserRedirects: () => Promise<RedirectType[]>;
    //User Calls
    logout: (arg: LogoutFormType) => Promise<ResponseDataType>;
    userChangePassword: (arg: UserChangePasswordFormType) => Promise<ResponseDataType>;
    me: () => Promise<ResponseDataType>;
    //Redirect Api Calls
    createRedirect: (arg: CreateRedirectFormType) => Promise<ResponseDataType>;
    readRedirect: (id: string) => Promise<ResponseDataType>;
    updateRedirect: (arg: UpdateRedirectFormType) => Promise<ResponseDataType>;
    deleteRedirect: (id: string) => Promise<ResponseDataType>;
    //Collection Api Calls
    createCollection: (arg: CreateCollectionFormType) => Promise<ResponseDataType>;
    readCollection: (id: string) => Promise<ResponseDataType>;
    updateCollection: (arg: UpdateCollectionFormType) => Promise<ResponseDataType>;
    deleteCollection: (id: string) => Promise<ResponseDataType>;
}
