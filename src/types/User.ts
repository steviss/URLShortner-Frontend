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

export enum UserPermissions {
    Guest = 0,
    User = 1,
}

export interface RegisterFormType {
    email: string;
    password: string;
}

export interface LoginFormType {
    email: string;
    password: string;
}

export interface LogoutFormType {
    logout: boolean;
}

export interface ForgotPasswordFormType {
    email: string;
}

export interface ChangePasswordFormType {
    token: string;
    password: string;
}

export interface UserChangePasswordFormType {
    token: string;
    password: string;
}

export interface MeResponseDataType {
    id: string;
    email: string;
}
