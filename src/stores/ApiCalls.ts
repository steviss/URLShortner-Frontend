export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export interface ResponseErrorType {
    field: string;
    message: string;
}

export interface ResponseDataType {
    status: string;
    errors?: ResponseErrorType | ResponseErrorType[];
    message?: string;
    data?: {} | [];
}

export interface RedirectType {
    id: string;
    slug: string;
    url: string;
    ownerId: string;
    //These are just visible by the database
    //owner: User;
    //createdAt: string;
    //updatedAt: string;
}

export interface CollectionType {
    id: string;
    name: string;
    ownerdId: string;
    //These are just visible by the database
    //owner: User;
    //createdAt: string;
    //updatedAt: string;
}

export interface UserType {
    id: string;
    email: string;
    //These are just visible by the database
    //redirects: RedirectType[];
    //collections: CollectionType[];
    //password: string;
    //createdAt: string;
    //updatedAt: string;
}

export interface RegisterForm {
    email: string;
    password: string;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface LogoutForm {
    logout: boolean;
}

export interface ForgotPasswordForm {
    email: string;
}

export interface ChangePasswordForm {
    token: string;
    password: string;
}

export interface UserChangePasswordForm {
    token: string;
    password: string;
}

export interface MeResponseDataType {
    id: string;
    email: string;
}

export interface CreateRedirectForm {
    url: string;
    slug: string;
}

export interface UpdateRedirectForm {
    id: string;
    slug: string;
}

export interface CreateCollectionForm {
    url: string;
    slug: string;
}

export interface UpdateCollectionForm {
    id: string;
    slug: string;
}

export interface ApiCalls {
    //Public Calls
    register: (arg: RegisterForm) => Promise<ResponseDataType>;
    login: (arg: LoginForm) => Promise<ResponseDataType>;
    changePassword: (arg: ChangePasswordForm) => Promise<ResponseDataType>;
    //User Calls
    logout: (arg: LogoutForm) => Promise<ResponseDataType>;
    userChangePassword: (arg: UserChangePasswordForm) => Promise<ResponseDataType>;
    me: () => Promise<MeResponseDataType>;
    //Redirect Api Calls
    createRedirect: (arg: CreateRedirectForm) => Promise<ResponseDataType>;
    readRedirect: (id: string) => Promise<ResponseDataType>;
    updateRedirect: (arg: UpdateRedirectForm) => Promise<ResponseDataType>;
    deleteRedirect: (id: string) => Promise<ResponseDataType>;
    //Collection Api Calls
    createCollection: (arg: CreateCollectionForm) => Promise<ResponseDataType>;
    readCollection: (id: string) => Promise<ResponseDataType>;
    updateCollection: (arg: UpdateCollectionForm) => Promise<ResponseDataType>;
    deleteCollection: (id: string) => Promise<ResponseDataType>;
}
